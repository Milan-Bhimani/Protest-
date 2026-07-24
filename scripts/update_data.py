"""
Standalone script: fetches news from RSS feeds and pushes into the backend API.

Usage:
    python scripts/update_data.py

Environment variables:
    BACKEND_URL           (default: http://localhost:8000)
    INGESTION_KEY         (default: dev-ingest-key)
    NEXTJS_URL            (default: http://localhost:3000)
    REVALIDATION_SECRET   (default: dev-revalidation-secret)
"""

import asyncio
import os
import sys

import httpx

BACKEND_URL = os.getenv("BACKEND_URL") or "http://localhost:8000"
INGESTION_KEY = os.getenv("INGESTION_KEY") or "dev-ingest-key"
NEXTJS_URL = os.getenv("NEXTJS_URL") or "http://localhost:3000"
REVALIDATION_SECRET = os.getenv("REVALIDATION_SECRET") or "dev-revalidation-secret"

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.tasks.ingestion import (
    fetch_news,
    parse_articles,
    parse_events,
    parse_reactions,
)

STEP = 0


def log_step(msg: str):
    global STEP
    STEP += 1
    print(f"\n[{STEP}/5] {msg}")


def log_ok(msg: str):
    print(f"       OK — {msg}")


def log_fail(msg: str):
    print(f"       FAIL — {msg}")


async def main():
    print("=" * 55)
    print("  STRAW HAT PRESS — Data Update Script")
    print(f"  BACKEND_URL={BACKEND_URL}")
    print(f"  NEXTJS_URL={NEXTJS_URL}")
    print("=" * 55)

    # ── 1. FETCH ──────────────────────────────────────────────────────────────
    log_step("Fetching news from RSS feeds...")
    items = await fetch_news()
    print(f"       Raw relevant articles found: {len(items)}")
    if not items:
        log_fail("No articles fetched from any feed — nothing to ingest.")
        sys.exit(1)
    log_ok(f"{len(items)} articles fetched")

    # ── 2. PARSE ──────────────────────────────────────────────────────────────
    log_step("Parsing articles, events, reactions...")
    articles = parse_articles(items)
    events = parse_events(items)
    reactions = parse_reactions(items)
    print(f"       Articles:  {len(articles)}")
    print(f"       Events:    {len(events)}")
    print(f"       Reactions: {len(reactions)}")
    if not articles and not events and not reactions:
        log_fail("Parsing produced zero output — nothing to ingest.")
        sys.exit(1)
    log_ok(
        f"Parsed {len(articles)} articles, {len(events)} events, {len(reactions)} reactions"
    )

    payload = {
        "articles": articles,
        "events": events,
        "reactions": reactions,
    }

    # ── 3. SEND TO BACKEND ────────────────────────────────────────────────────
    log_step(f"Sending to backend at {BACKEND_URL}/api/ingest ...")
    try:
        async with httpx.AsyncClient(timeout=120) as client:
            resp = await client.post(
                f"{BACKEND_URL}/api/ingest",
                json=payload,
                headers={"X-API-Key": INGESTION_KEY},
            )
            print(f"       HTTP {resp.status_code}")
            print(f"       Response body: {resp.text[:2000]}")

            if resp.status_code != 200:
                log_fail(
                    f"Backend rejected ingest — {resp.status_code} {resp.text[:500]}"
                )
                sys.exit(1)

            result = resp.json()
            log_ok(
                f"Articles created: {result.get('articles_created', '?')}  "
                f"Events created: {result.get('events_created', '?')}  "
                f"Reactions created: {result.get('reactions_created', '?')}"
            )
    except httpx.ConnectError:
        log_fail(f"Cannot connect to backend at {BACKEND_URL}")
        print("       Is the backend running? Check Render dashboard.")
        sys.exit(1)
    except httpx.TimeoutException:
        log_fail(f"Backend at {BACKEND_URL} timed out after 120s")
        sys.exit(1)

    # ── 4. VERIFY DATA PERSISTED ──────────────────────────────────────────────
    log_step("Verifying data via GET /api/articles ...")
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            verify_resp = await client.get(
                f"{BACKEND_URL}/api/articles",
                params={"limit": 5},
            )
            print(f"       HTTP {verify_resp.status_code}")
            if verify_resp.status_code == 200:
                verify_data = verify_resp.json()
                count = len(verify_data) if isinstance(verify_data, list) else "unknown"
                print(f"       Articles returned by GET: {count}")
                if isinstance(verify_data, list) and verify_data:
                    print(
                        f"       Latest title: {verify_data[0].get('title', 'N/A')[:80]}"
                    )
                log_ok("Backend returns data — ingestion confirmed")
            else:
                log_fail(f"GET /api/articles returned {verify_resp.status_code}")
    except Exception as e:
        print(f"       Warning — verify step failed (non-fatal): {e}")

    # ── 5. REVALIDATE NEXT.JS CACHE ───────────────────────────────────────────
    log_step(f"Triggering Next.js revalidation at {NEXTJS_URL}/api/revalidate ...")
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            revalidate_body = {
                "tags": ["articles", "timeline", "reactions"],
                "secret": REVALIDATION_SECRET,
            }
            print(f"       POST body: {revalidate_body}")
            resp = await client.post(
                f"{NEXTJS_URL}/api/revalidate",
                json=revalidate_body,
            )
            print(f"       HTTP {resp.status_code}")
            print(f"       Response body: {resp.text[:1000]}")

            if resp.status_code != 200:
                log_fail(f"Revalidation failed — {resp.status_code} {resp.text[:300]}")
                print("       This means Vercel is still serving stale cached pages.")
                print(
                    "       Fix: set REVALIDATION_SECRET environment variable on Vercel"
                )
                print("       to match the GitHub Actions secret, then redeploy.")
                sys.exit(1)

            log_ok(f"Revalidation triggered — tags: {revalidate_body['tags']}")
    except httpx.ConnectError:
        log_fail(f"Cannot connect to frontend at {NEXTJS_URL}")
        print("       Is the frontend deployed on Vercel?")
        sys.exit(1)
    except httpx.TimeoutException:
        log_fail(f"Frontend at {NEXTJS_URL} timed out after 30s")
        sys.exit(1)

    # ── DONE ──────────────────────────────────────────────────────────────────
    print("\n" + "=" * 55)
    print("  ✅ UPDATE SUCCESSFUL")
    print(
        f"     {len(articles)} articles, {len(events)} events, {len(reactions)} reactions"
    )
    print("     Revalidation OK — refresh your browser to see fresh data.")
    print("=" * 55)


if __name__ == "__main__":
    asyncio.run(main())
