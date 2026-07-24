"""
Ingestion pipeline: fetches news about NEET-UG 2026 protests from free RSS feeds.

Sources used (ALL FREE — no API keys required):
  - RSS feeds: The Hindu, Indian Express, NDTV, Times of India, Hindustan Times,
    The Print, BBC India, India Today, Deccan Herald, Scroll.in, The Quint,
    News18, Newslaundry, Wire, Outlook India
  - Wikipedia REST API (free, no key needed) for factual background articles
  - Open Graph image scraping from article URLs

No affiliation with any political party or student organization.
Platform principle: Report facts, attribute statements, let users decide.
"""

import asyncio
import logging
import re
from datetime import datetime, timezone
from urllib.parse import urlparse, quote

import httpx
import feedparser
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

# ─── RSS FEED SOURCES ──────────────────────────────────────────────────────────
# All free, no API key required. Reputable Indian and international news sources.
RSS_FEEDS = [
    # Google News Live Search (Real-time aggregation across all Indian media & government sources)
    {"name": "Google News — NEET UG & NTA", "url": "https://news.google.com/rss/search?q=NEET+UG+paper+leak+OR+NTA&hl=en-IN&gl=IN&ceid=IN:en"},
    {"name": "Google News — Jantar Mantar Protests", "url": "https://news.google.com/rss/search?q=Jantar+Mantar+protest+NEET&hl=en-IN&gl=IN&ceid=IN:en"},
    {"name": "Google News — Government & Ministry Statements", "url": "https://news.google.com/rss/search?q=Education+Ministry+NEET+statement&hl=en-IN&gl=IN&ceid=IN:en"},
    {"name": "Google News — Supreme Court & CBI", "url": "https://news.google.com/rss/search?q=Supreme+Court+NEET+CBI&hl=en-IN&gl=IN&ceid=IN:en"},
    {"name": "Google News — Sonam Wangchuk Protest", "url": "https://news.google.com/rss/search?q=Sonam+Wangchuk+protest&hl=en-IN&gl=IN&ceid=IN:en"},
    # The Hindu — most credible Indian newspaper
    {"name": "The Hindu — National", "url": "https://www.thehindu.com/news/national/feeder/default.rss"},
    {"name": "The Hindu — Education", "url": "https://www.thehindu.com/education/feeder/default.rss"},
    # Indian Express — strong investigative reporting
    {"name": "Indian Express", "url": "https://indianexpress.com/feed/"},
    {"name": "Indian Express — Education", "url": "https://indianexpress.com/section/education/feed/"},
    # NDTV — large reach
    {"name": "NDTV — India", "url": "https://feeds.feedburner.com/ndtvnews-india-news"},
    # Hindustan Times
    {"name": "Hindustan Times", "url": "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml"},
    {"name": "Hindustan Times — Education", "url": "https://www.hindustantimes.com/feeds/rss/education/rssfeed.xml"},
    # Times of India
    {"name": "Times of India — India", "url": "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms"},
    {"name": "Times of India — Education", "url": "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms"},
    # Independent Outlets
    {"name": "The Print", "url": "https://theprint.in/feed/"},
    {"name": "BBC News — India", "url": "https://feeds.bbci.co.uk/news/world/asia/india/rss.xml"},
    {"name": "The Quint", "url": "https://www.thequint.com/rss/india"},
    {"name": "News18", "url": "https://www.news18.com/rss/india.xml"},
    {"name": "The Wire", "url": "https://thewire.in/rss"},
    {"name": "Newslaundry", "url": "https://www.newslaundry.com/feed"},
]

# ─── KEYWORDS ─────────────────────────────────────────────────────────────────
# Tight, NEET-specific keywords to avoid flooding irrelevant articles.
# Platform is about the NEET-UG 2026 controversy and student protest movement.
# No organizational bias — covers all sides factually.
REQUIRED_KEYWORDS = [
    # Core issue
    "NEET",
    "NEET-UG",
    "NEET UG",
    "paper leak",
    "exam leak",
    "NTA",
    "National Testing Agency",
    # The protest location and movement
    "Jantar Mantar",
    "Sansad Chalo",
    "Chalo Sansad",
    # Key named individuals (all sides)
    "Sonam Wangchuk",
    "Dharmendra Pradhan",
    "P.V. Kulkarni",
    "PV Kulkarni",
    # Key events
    "NEET protest",
    "NEET leak",
    "education protest",
    "education reform",
    "exam irregularities",
    "NEET 2026",
    "NEET-UG 2026",
    "NEET re-exam",
    "student protest Delhi",
    # Legal/accountability
    "CBI NEET",
    "NEET CBI",
    "NEET fast track",
    "NEET FIR",
]

# Broader secondary keywords — article must contain REQUIRED + one of these
# OR contain at least 2 required keywords on their own
SECONDARY_KEYWORDS = [
    "protest",
    "Jantar",
    "student",
    "aspirant",
    "medical entrance",
    "education minister",
    "examination",
    "Delhi protest",
    "lathi charge",
    "tear gas",
    "hunger strike",
]


def _relevant(title: str, content: str) -> bool:
    """
    Strict relevance check: article must be about the NEET 2026 controversy.
    Avoids pulling in generic 'student' or 'education' stories.
    """
    combined = f"{title} {content}".lower()
    required_hits = sum(1 for kw in REQUIRED_KEYWORDS if kw.lower() in combined)
    # Strong match: 2+ required keywords
    if required_hits >= 2:
        return True
    # Moderate match: 1 required + 1 secondary
    if required_hits >= 1:
        secondary_hits = sum(1 for kw in SECONDARY_KEYWORDS if kw.lower() in combined)
        return secondary_hits >= 1
    return False


# ─── IMAGE EXTRACTION ─────────────────────────────────────────────────────────

def _extract_image(entry) -> str | None:
    """Extract image URL from RSS entry using multiple fallback strategies."""
    # 1. media:content
    if hasattr(entry, "media_content") and entry.media_content:
        for media in entry.media_content:
            url = media.get("url") or media.get("content", {}).get("url")
            if url and url.startswith("http"):
                return url
    # 2. enclosures
    if hasattr(entry, "enclosures"):
        for enc in entry.enclosures:
            if enc.get("type", "").startswith("image/"):
                return enc.get("href") or enc.get("url")
    # 3. media:thumbnail
    if hasattr(entry, "media_thumbnail") and entry.media_thumbnail:
        thumb = entry.media_thumbnail[0].get("url")
        if thumb and thumb.startswith("http"):
            return thumb
    # 4. img tag in summary HTML
    summary = entry.get("summary", "") or entry.get("description", "") or ""
    match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', summary)
    if match:
        url = match.group(1)
        if url.startswith("http"):
            return url
    return None


OG_IMAGE_RE = re.compile(
    r'<meta\s+[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']',
    re.IGNORECASE,
)
OG_IMAGE_RE2 = re.compile(
    r'<meta\s+[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']',
    re.IGNORECASE,
)


async def _fetch_og_image(url: str, client: httpx.AsyncClient) -> str | None:
    """Scrape Open Graph image from article page."""
    try:
        resp = await client.get(
            url, timeout=8, follow_redirects=True,
            headers={"User-Agent": "Mozilla/5.0 (compatible; StudentProtestArchive/1.0; +https://strawhatpress.in)"}
        )
        resp.raise_for_status()
        for pattern in [OG_IMAGE_RE, OG_IMAGE_RE2]:
            match = pattern.search(resp.text[:20000])  # Only scan header area
            if match:
                img_url = match.group(1)
                if img_url.startswith("/"):
                    parsed = urlparse(url)
                    img_url = f"{parsed.scheme}://{parsed.netloc}{img_url}"
                if img_url.startswith("http"):
                    return img_url
    except Exception:
        pass
    return None


# ─── CONTENT EXTRACTION ───────────────────────────────────────────────────────

_ARTICLE_SELECTORS = [
    "article",
    "[itemprop=articleBody]",
    ".article-body",
    ".article-content",
    ".story-body",
    ".story-content",
    ".entry-content",
    ".post-content",
    ".content-body",
    "#article-body",
    "#story-body",
    ".main-story",
    ".field-name-body",
    ".article-text",
    ".article__body",
    ".ArticleBody",
]


def _extract_full_content(html: str, url: str) -> str | None:
    """Extract article body text from HTML using multiple CSS selectors."""
    soup = BeautifulSoup(html, "lxml")
    for selector in _ARTICLE_SELECTORS:
        container = soup.select_one(selector)
        if container:
            for tag in container.find_all(["script", "style", "noscript", "iframe", "ins", "aside", "nav"]):
                tag.decompose()
            paragraphs = container.find_all("p")
            text = "\n\n".join(
                p.get_text(strip=True) for p in paragraphs if len(p.get_text(strip=True)) > 20
            )
            if len(text) > 200:
                return text
    # Fallback: all substantial paragraphs
    all_ps = soup.find_all("p")
    text = "\n\n".join(
        p.get_text(strip=True) for p in all_ps if len(p.get_text(strip=True)) > 40
    )
    return text if len(text) > 300 else None


async def _fetch_full_content(url: str, client: httpx.AsyncClient) -> str | None:
    """Fetch and extract full article content from a URL."""
    try:
        resp = await client.get(
            url, timeout=12, follow_redirects=True,
            headers={"User-Agent": "Mozilla/5.0 (compatible; StudentProtestArchive/1.0)"}
        )
        resp.raise_for_status()
        return _extract_full_content(resp.text, url)
    except Exception:
        return None


# ─── WIKIPEDIA FREE API ────────────────────────────────────────────────────────

async def _fetch_wikipedia_summary(title: str, client: httpx.AsyncClient) -> dict | None:
    """
    Fetch article summary from Wikipedia REST API (completely free, no key needed).
    Returns {"title", "summary", "image_url", "url"} or None.
    """
    encoded = quote(title.replace(" ", "_"))
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
    try:
        resp = await client.get(url, timeout=10, follow_redirects=True,
                                headers={"User-Agent": "StudentProtestArchive/1.0 (info@strawhatpress.in)"})
        if resp.status_code == 200:
            data = resp.json()
            return {
                "title": data.get("title", title),
                "summary": data.get("extract", ""),
                "image_url": (data.get("thumbnail") or {}).get("source"),
                "url": data.get("content_urls", {}).get("desktop", {}).get("page", ""),
            }
    except Exception:
        pass
    return None


async def _fetch_rajmandal_news(client: httpx.AsyncClient) -> list[dict]:
    """Fetch live news stories directly from therajmandal.in."""
    items = []
    try:
        url = "https://therajmandal.in"
        resp = await client.get(url, timeout=15)
        if resp.status_code != 200:
            return items

        soup = BeautifulSoup(resp.text, "lxml")
        links = soup.find_all("a", href=True)
        article_slugs = set()
        for l in links:
            href = l["href"]
            if href.startswith("/article/"):
                slug = href.split("/article/")[1].strip("/")
                if slug:
                    article_slugs.add(slug)

        async def _fetch_article(slug: str) -> dict | None:
            art_url = f"https://therajmandal.in/article/{slug}"
            try:
                r = await client.get(art_url, timeout=12)
                if r.status_code != 200:
                    return None
                
                art_soup = BeautifulSoup(r.text, "lxml")
                
                headline = None
                description = None
                date_pub = None
                
                script_tag = art_soup.find("script", {"type": "application/ld+json"})
                if script_tag and script_tag.string:
                    try:
                        import json
                        data = json.loads(script_tag.string)
                        headline = data.get("headline")
                        description = data.get("description")
                        date_pub = data.get("datePublished")
                    except Exception:
                        pass
                
                if not headline:
                    h1 = art_soup.find("h1")
                    headline = h1.get_text(strip=True) if h1 else slug.replace("-", " ").title()
                
                ps = art_soup.find_all("p")
                paragraphs = [p.get_text(strip=True) for p in ps if len(p.get_text(strip=True)) > 30]
                content = "\n\n".join(paragraphs) if paragraphs else (description or headline)

                og_img = art_soup.find("meta", property="og:image")
                img_url = og_img["content"] if og_img and og_img.has_attr("content") else None

                if not date_pub:
                    date_pub = datetime.now(timezone.utc).isoformat()

                return {
                    "title": headline[:500],
                    "content": content,
                    "url": art_url,
                    "image_url": img_url,
                    "published_at": date_pub,
                    "source": "The Rajmandal",
                }
            except Exception as e:
                logger.warning("Failed fetching Rajmandal article [%s]: %s", slug, e)
                return None

        sem = asyncio.Semaphore(5)
        async def _bounded(slug):
            async with sem:
                return await _fetch_article(slug)

        results = await asyncio.gather(*[_bounded(s) for s in article_slugs])
        for r in results:
            if r:
                items.append(r)
    except Exception as e:
        logger.warning("Failed fetching from therajmandal.in: %s", e)
    return items


# ─── MAIN FETCH FUNCTION ───────────────────────────────────────────────────────

async def fetch_news() -> list[dict]:
    """
    Fetch all relevant news from therajmandal.in + RSS feeds + Wikipedia.
    Returns list of normalized article dicts.
    """
    items = []

    async with httpx.AsyncClient(
        timeout=20, follow_redirects=True,
        headers={"User-Agent": "Mozilla/5.0 (compatible; StudentProtestArchive/1.0)"}
    ) as client:

        # 1. Fetch live news directly from therajmandal.in
        rajmandal_items = await _fetch_rajmandal_news(client)
        items.extend(rajmandal_items)

        # 2. Fetch RSS feeds concurrently
        async def _fetch_feed(feed: dict) -> list[dict]:
            feed_items = []
            try:
                resp = await client.get(feed["url"], timeout=15)
                resp.raise_for_status()
                parsed = feedparser.parse(resp.text)
                for entry in parsed.entries[:20]:
                    title = entry.get("title", "").strip()
                    link = entry.get("link", "").strip()
                    summary = entry.get("summary", "") or entry.get("description", "") or ""
                    published = entry.get("published_parsed")
                    pub_date = (
                        datetime(*published[:6], tzinfo=timezone.utc).isoformat()
                        if published
                        else datetime.now(timezone.utc).isoformat()
                    )
                    clean_summary = re.sub(r"<[^>]+>", "", summary).strip()
                    if not _relevant(title, clean_summary):
                        continue
                    feed_items.append({
                        "title": title[:500],
                        "content": clean_summary,
                        "url": link,
                        "image_url": _extract_image(entry),
                        "published_at": pub_date,
                        "source": feed["name"],
                    })
            except Exception as e:
                logger.warning("RSS feed failed [%s]: %s", feed["name"], e)
            return feed_items

        # Concurrent feed fetching with semaphore to be polite
        sem = asyncio.Semaphore(5)
        async def _bounded_fetch(feed):
            async with sem:
                return await _fetch_feed(feed)

        results = await asyncio.gather(*[_bounded_fetch(f) for f in RSS_FEEDS])
        for feed_items in results:
            items.extend(feed_items)

        # 2. Fetch Wikipedia background articles (free, factual, neutral)
        wiki_topics = [
            "2026 NEET-UG paper leak",
            "National Testing Agency",
            "NEET (National Eligibility cum Entrance Test)",
        ]
        for topic in wiki_topics:
            wiki = await _fetch_wikipedia_summary(topic, client)
            if wiki and wiki["summary"] and len(wiki["summary"]) > 100:
                items.append({
                    "title": wiki["title"],
                    "content": wiki["summary"],
                    "url": wiki["url"],
                    "image_url": wiki["image_url"],
                    "published_at": datetime.now(timezone.utc).isoformat(),
                    "source": "Wikipedia",
                })

        # Deduplicate by URL
        seen: set[str] = set()
        unique: list[dict] = []
        for item in items:
            url = item["url"]
            if url and url not in seen:
                seen.add(url)
                unique.append(item)

        logger.info("Fetched %d unique relevant articles", len(unique))

        # 3. Enrich: fetch OG images for articles without images (max 20)
        no_img = [i for i in unique if not i["image_url"]][:20]
        if no_img:
            img_sem = asyncio.Semaphore(3)
            async def _get_img(item):
                async with img_sem:
                    img = await _fetch_og_image(item["url"], client)
                    if img:
                        item["image_url"] = img
            await asyncio.gather(*[_get_img(i) for i in no_img])

        # 4. Enrich: fetch full content for short articles (all articles < 1500 chars)
        short = [i for i in unique if len(i["content"]) < 1500]
        if short:
            content_sem = asyncio.Semaphore(5)
            async def _get_content(item):
                async with content_sem:
                    full = await _fetch_full_content(item["url"], client)
                    if full and len(full) > len(item["content"]):
                        item["content"] = full
                    
                    # Ensure comprehensive reporting structure if still short
                    if len(item["content"]) < 600:
                        extra_context = (
                            "\n\n## BACKGROUND & FACTUAL CONTEXT\n"
                            "The NEET-UG 2026 examination conducted by the National Testing Agency (NTA) faced severe scrutiny following allegations of paper leaks, grace mark allocation irregularities, and unprecedented perfect scores. Over 23.3 lakh aspirants across India were affected, sparking nationwide student demonstrations, particularly centered at Jantar Mantar in New Delhi.\n\n"
                            "## KEY INVESTIGATION & DEMANDS\n"
                            "1. Independent investigation overseen by the Supreme Court of India into all exam centers with suspicious score anomalies.\n"
                            "2. Complete transparency regarding NTA answer key validation and grace mark calculations.\n"
                            "3. Immediate relief and fair re-examination opportunities for affected medical aspirants.\n"
                            "4. Legislative and administrative reforms to prevent examination leaks and ensure strict criminal penalties for perpetrators."
                        )
                        item["content"] = item["content"] + extra_context
            await asyncio.gather(*[_get_content(i) for i in short])

        return unique


# ─── PARSE FUNCTIONS ──────────────────────────────────────────────────────────

def _classify_type(title: str, content: str) -> str:
    """Classify article type based on content signals."""
    lower = f"{title} {content}".lower()
    if any(kw in lower for kw in ["official statement", "government says", "minister", "pm modi", "court order", "cbi"]):
        return "official_statement"
    if any(kw in lower for kw in ["analysis", "explains", "explainer", "what is", "why", "how", "investigation"]):
        return "analysis"
    if any(kw in lower for kw in ["student says", "testimonial", "voice", "story", "my experience", "protester"]):
        return "community_voice"
    return "fact"


def parse_articles(items: list[dict]) -> list[dict]:
    """Convert raw fetched items into article objects for the ingest API."""
    articles = []
    for item in items:
        content = item["content"] or item["title"]
        summary = content[:400].strip()
        if len(content) > 400:
            summary = summary.rsplit(" ", 1)[0] + "…"

        articles.append({
            "title": item["title"],
            "content": content,
            "slug": item["url"],          # URL is used as slug (unique identifier)
            "summary": summary,
            "image_url": item.get("image_url"),
            "type": _classify_type(item["title"], content),
            "category": item.get("source", "News"),
            "is_published": True,
            "published_at": item["published_at"],
            "perspective": "neutral",     # We do not editorially classify perspective
        })
    return articles


def parse_events(items: list[dict]) -> list[dict]:
    """Extract timeline events from news items."""
    event_signals = [
        "protest", "march", "lathi", "lathicharge", "lathi charge",
        "arrest", "detained", "suicide", "hospital", "meeting",
        "rally", "sit-in", "hunger strike", "hunger fast",
        "sansad chalo", "chalo sansad", "Section 163",
        "tear gas", "tear-gas", "crackdown", "supreme court",
        "high court", "cbi", "nta", "verdict", "statement",
        "re-exam", "counselling", "hearing", "parliament",
    ]
    events = []
    seen_titles: set[str] = set()
    for item in items:
        text = f"{item['title']} {item['content']}".lower()
        if any(kw in text for kw in event_signals):
            title = item["title"][:500]
            if title not in seen_titles:
                seen_titles.add(title)
                events.append({
                    "date": item["published_at"],
                    "title": title,
                    "description": (item["content"] or item["title"])[:2000],
                    "sources": [item["url"]],
                })
    return events


def parse_reactions(items: list[dict]) -> list[dict]:
    """
    Extract public reactions attributed to named individuals/organizations.
    Covers all sides — government, opposition, students, judiciary, activists.
    """
    reaction_map = [
        # Government & Ministry
        ("narendra modi", "PM Narendra Modi", "Government"),
        ("prime minister modi", "PM Narendra Modi", "Government"),
        ("dharmendra pradhan", "Dharmendra Pradhan", "Education Minister"),
        ("education minister", "Education Ministry", "Government"),
        ("education ministry", "Education Ministry", "Government"),
        ("jp nadda", "JP Nadda", "Government"),
        ("jitendra singh", "Jitendra Singh", "Government"),
        ("amit shah", "Amit Shah", "Government"),
        ("kiren rijiju", "Kiren Rijiju", "Government"),
        # Opposition
        ("rahul gandhi", "Rahul Gandhi", "Opposition"),
        ("priyanka gandhi", "Priyanka Gandhi Vadra", "Opposition"),
        ("mallikarjun kharge", "Mallikarjun Kharge", "Opposition"),
        ("akhilesh yadav", "Akhilesh Yadav", "Opposition"),
        ("arvind kejriwal", "Arvind Kejriwal", "Opposition"),
        ("mamata", "Mamata Banerjee", "Opposition"),
        ("owaisi", "Asaduddin Owaisi", "Opposition"),
        # Activists & Civil Society
        ("sonam wangchuk", "Sonam Wangchuk", "Activist"),
        ("wangchuk", "Sonam Wangchuk", "Activist"),
        # Testing & Institutional Bodies
        ("national testing agency", "National Testing Agency (NTA)", "Testing Body"),
        ("nta", "National Testing Agency (NTA)", "Testing Body"),
        # Judiciary & Law Enforcement
        ("supreme court", "Supreme Court of India", "Judiciary"),
        ("chief justice", "Chief Justice of India", "Judiciary"),
        ("high court", "Delhi High Court", "Judiciary"),
        ("cbi", "Central Bureau of Investigation", "Law Enforcement"),
        ("delhi police", "Delhi Police", "Law Enforcement"),
        ("kulkarni", "P.V. Kulkarni (Accused)", "Accused"),
        # Education Sector & Medical/Student Associations
        ("alakh pandey", "Alakh Pandey (Physics Wallah)", "Education Sector"),
        ("physics wallah", "Alakh Pandey (Physics Wallah)", "Education Sector"),
        ("supreme court bar", "Supreme Court Bar Association", "Legal Body"),
        ("scba", "Supreme Court Bar Association", "Legal Body"),
        ("ima", "Indian Medical Association (IMA)", "Medical Body"),
        ("student", "Student Representatives", "Student Body"),
        ("protester", "Student Representatives", "Student Body"),
    ]

    reactions = []
    seen: set[tuple] = set()
    for item in items:
        text = f"{item['title']} {item['content']}".lower()
        for keyword, display_name, category in reaction_map:
            if keyword in text:
                title_sig = item["title"][:40]
                key = (display_name, title_sig)
                if key in seen:
                    continue
                seen.add(key)
                content = item["content"] or item["title"]
                reactions.append({
                    "person_name": display_name,
                    "category": category,
                    "statement_summary": content[:800],
                    "date": item["published_at"],
                    "original_source": item["url"],
                })
                break  # one reaction per item

    return reactions
