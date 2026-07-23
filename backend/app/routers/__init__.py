from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models import (
    Article,
    Event,
    Document,
    StudentStory,
    PublicReaction,
    FactCheck,
    User,
)
from app.schemas.article import (
    ArticleRead,
    ArticleCreate,
    ArticleUpdate,
    WithSources,
)
from app.schemas.others import (
    EventRead,
    DocumentRead,
    Stats,
    StudentStoryRead,
    StudentStoryCreate,
    PublicReactionRead,
    NewsletterSubscribe,
)
from app.schemas.user import Token
from app.auth import (
    authenticate_user,
    create_access_token,
    get_current_user,
)
from app.middleware.audit import _audit_log

public_router = APIRouter(prefix="/api", tags=["public"])
admin_router = APIRouter(prefix="/api/admin", tags=["admin"])


@public_router.get("/articles", response_model=list[ArticleRead])
async def list_articles(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Article)
        .where(Article.is_published)
        .order_by(Article.published_at.desc())
    )
    return result.scalars().all()


@public_router.get("/articles/{article_id}/sources", response_model=WithSources)
async def get_article(article_id: int, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(
            select(Article)
            .options(selectinload(Article.sources))
            .where(Article.id == article_id, Article.is_published)
        )
        article = result.scalar_one_or_none()
        if not article:
            raise HTTPException(status_code=404, detail="Article not found")
        return {"article": article, "sources": article.sources}
    except Exception as e:
        import traceback

        traceback.print_exc()
        raise e


@public_router.get("/timeline", response_model=list[EventRead])
async def get_timeline(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Event).order_by(Event.date.desc()))
    return result.scalars().all()


@public_router.get("/documents", response_model=list[DocumentRead])
async def get_documents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document).order_by(Document.published_at.desc()))
    return result.scalars().all()


@public_router.get("/statistics", response_model=Stats)
async def get_statistics(db: AsyncSession = Depends(get_db)):
    events = await db.execute(select(func.count()).select_from(Event))
    docs = await db.execute(select(func.count()).select_from(Document))
    articles = await db.execute(
        select(func.count()).select_from(Article).where(Article.is_published)
    )
    fact_checks = await db.execute(
        select(func.count()).select_from(FactCheck).where(FactCheck.status == "true")
    )
    stories = await db.execute(
        select(func.count())
        .select_from(StudentStory)
        .where(StudentStory.status == "approved")
    )

    # Protest started June 6, 2026 (first Jantar Mantar protest)
    PROTEST_START = datetime(2026, 6, 6, tzinfo=timezone.utc)

    earliest = await db.execute(select(Event.date).order_by(Event.date.asc()).limit(1))
    first_date = earliest.scalar_one_or_none()

    if first_date:
        # SQLite may return naive datetimes — make it UTC-aware
        if first_date.tzinfo is None:
            first_date = first_date.replace(tzinfo=timezone.utc)
        # Use the PROTEST_START if events table has earlier non-protest events
        effective_start = (
            max(PROTEST_START, first_date)
            if first_date < PROTEST_START
            else PROTEST_START
        )
    else:
        effective_start = PROTEST_START

    days_of_protest = (datetime.now(timezone.utc) - effective_start).days

    return Stats(
        total_events=events.scalar_one(),
        total_documents=docs.scalar_one(),
        total_articles=articles.scalar_one(),
        total_verified_claims=fact_checks.scalar_one(),
        days_of_protest=days_of_protest,
        total_stories=stories.scalar_one(),
    )


@public_router.get("/public-reactions", response_model=list[PublicReactionRead])
async def get_public_reactions(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(PublicReaction).order_by(PublicReaction.date.desc())
    )
    return result.scalars().all()


@public_router.get("/stories", response_model=list[StudentStoryRead])
async def list_stories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(StudentStory)
        .where(StudentStory.status == "approved")
        .order_by(StudentStory.created_at.desc())
    )
    return result.scalars().all()


@public_router.post("/stories", response_model=StudentStoryRead)
async def create_story(payload: StudentStoryCreate, db: AsyncSession = Depends(get_db)):
    story = StudentStory(**payload.model_dump())
    db.add(story)
    await db.commit()
    await db.refresh(story)
    return story


@public_router.post("/newsletter")
async def subscribe_newsletter(
    payload: NewsletterSubscribe, db: AsyncSession = Depends(get_db)
):
    from app.models import NewsletterSubscriber

    email = payload.email.strip().lower()
    if not email:
        raise HTTPException(status_code=400, detail="Email required")
    exists = await db.execute(
        select(NewsletterSubscriber).where(NewsletterSubscriber.email == email)
    )
    if exists.scalar_one_or_none():
        return {"status": "already_subscribed"}
    sub = NewsletterSubscriber(email=email)
    db.add(sub)
    await db.commit()
    return {"status": "subscribed"}


@admin_router.post("/login", response_model=Token)
async def admin_login(
    payload: dict, request: Request, db: AsyncSession = Depends(get_db)
):
    username = payload.get("email")
    password = payload.get("password")
    if not username or not password:
        raise HTTPException(status_code=400, detail="Email and password required")
    user = await authenticate_user(db, username, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    await _audit_log(request, "login", "auth", user.id)
    return {"access_token": token, "token_type": "bearer"}


@admin_router.get("/articles", response_model=list[ArticleRead])
async def admin_list_articles(
    db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)
):
    result = await db.execute(select(Article).order_by(Article.created_at.desc()))
    return result.scalars().all()


@admin_router.post("/articles", response_model=ArticleRead)
async def admin_create_article(
    article: ArticleCreate,
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    user = await db.get(User, current_user.id)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    obj = Article(**article.model_dump())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    await _audit_log(request, "create", "article", user.id)
    return obj


@admin_router.put("/articles/{article_id}", response_model=ArticleRead)
async def admin_update_article(
    article_id: int,
    article: ArticleUpdate,
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    obj = await db.get(Article, article_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Article not found")
    for k, v in article.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    await db.commit()
    await db.refresh(obj)
    if not current_user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    await _audit_log(request, "update", "article", current_user.id)
    return obj


@admin_router.get("/stories", response_model=list[StudentStoryRead])
async def admin_list_stories(
    db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)
):
    result = await db.execute(
        select(StudentStory).order_by(StudentStory.created_at.desc())
    )
    return result.scalars().all()


@admin_router.put("/stories/{story_id}", response_model=StudentStoryRead)
async def admin_update_story(
    story_id: int,
    payload: dict,
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    story = await db.get(StudentStory, story_id)
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    if "status" in payload:
        story.status = payload["status"]
    if "reviewed_at" in payload:
        story.reviewed_at = payload["reviewed_at"]
    await db.commit()
    await db.refresh(story)
    if not current_user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    await _audit_log(request, "update", "student_story", current_user.id)
    return story
