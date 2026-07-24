from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from app.database import get_db
from app.models import Article, Event, PublicReaction
from app.config import get_settings

router = APIRouter(prefix="/api", tags=["ingest"])


async def verify_ingest_key(x_api_key: str = Header(...)):
    settings = get_settings()
    expected = settings.resolved_ingestion_api_key
    if x_api_key != expected:
        raise HTTPException(status_code=403, detail="Invalid API key")


class IngestArticle(BaseModel):
    title: str
    content: str
    slug: str
    summary: str
    image_url: str | None = None
    type: str = "fact"
    category: str | None = None
    is_published: bool = True
    published_at: str | None = None
    perspective: str | None = "neutral"


class IngestEvent(BaseModel):
    date: str
    title: str
    description: str
    sources: list[str] = []


class IngestReaction(BaseModel):
    person_name: str
    category: str | None = None
    statement_summary: str
    date: str
    original_source: str | None = None


class IngestRequest(BaseModel):
    articles: list[IngestArticle] = []
    events: list[IngestEvent] = []
    reactions: list[IngestReaction] = []


class IngestResponse(BaseModel):
    articles_created: int
    events_created: int
    reactions_created: int


@router.post("/ingest", response_model=IngestResponse)
async def ingest_data(
    payload: IngestRequest,
    db: AsyncSession = Depends(get_db),
    _=Depends(verify_ingest_key),
):
    from datetime import datetime, timezone
    from sqlalchemy import select

    articles_created = 0
    events_created = 0
    reactions_created = 0

    for a in payload.articles:
        slug_key = a.slug[:500]
        existing = await db.execute(select(Article).where(Article.slug == slug_key))
        if existing.scalar_one_or_none():
            continue

        pub = (
            datetime.fromisoformat(a.published_at)
            if a.published_at
            else datetime.now(timezone.utc)
        )
        article = Article(
            title=a.title[:500],
            slug=slug_key,
            summary=a.summary[:500],
            content=a.content,
            image_url=a.image_url,
            type=a.type,
            category=a.category,
            is_published=a.is_published,
            published_at=pub,
            perspective=a.perspective,
        )
        db.add(article)
        articles_created += 1

    for e in payload.events:
        existing = await db.execute(select(Event).where(Event.title == e.title))
        if existing.scalar_one_or_none():
            continue

        try:
            event_date = (
                datetime.fromisoformat(e.date) if e.date else datetime.now(timezone.utc)
            )
        except (ValueError, TypeError):
            event_date = datetime.now(timezone.utc)
        event = Event(
            date=event_date,
            title=e.title[:500],
            description=e.description,
            sources=e.sources,
        )
        db.add(event)
        events_created += 1

    for r in payload.reactions:
        existing = await db.execute(
            select(PublicReaction).where(
                PublicReaction.person_name == r.person_name,
                PublicReaction.statement_summary == r.statement_summary[:200],
            )
        )
        if existing.scalar_one_or_none():
            continue

        try:
            reaction_date = (
                datetime.fromisoformat(r.date) if r.date else datetime.now(timezone.utc)
            )
        except (ValueError, TypeError):
            reaction_date = datetime.now(timezone.utc)
        reaction = PublicReaction(
            person_name=r.person_name,
            category=r.category,
            statement_summary=r.statement_summary,
            date=reaction_date,
            original_source=r.original_source,
        )
        db.add(reaction)
        reactions_created += 1

    from sqlalchemy.exc import IntegrityError

    try:
        await db.commit()
    except IntegrityError as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=f"Database constraint error: {e}")

    return IngestResponse(
        articles_created=articles_created,
        events_created=events_created,
        reactions_created=reactions_created,
    )
