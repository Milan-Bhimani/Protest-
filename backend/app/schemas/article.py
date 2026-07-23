from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class SourceRead(BaseModel):
    id: int
    article_id: int
    title: str
    url: Optional[str] = None
    citation: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SourceCreate(BaseModel):
    article_id: int
    title: str
    url: Optional[str] = None
    citation: Optional[str] = None


class ArticleBase(BaseModel):
    title: str
    slug: Optional[str] = None
    summary: str
    content: str
    image_url: Optional[str] = None
    category: Optional[str] = None
    type: str
    is_published: bool = False
    published_at: Optional[datetime] = None
    last_updated: Optional[datetime] = None
    perspective: Optional[str] = "neutral"
    correction_history: Optional[dict] = None


class ArticleCreate(ArticleBase):
    pass


class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    type: Optional[str] = None
    is_published: Optional[bool] = None
    published_at: Optional[datetime] = None
    last_updated: Optional[datetime] = None
    correction_history: Optional[dict] = None


class ArticleRead(ArticleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class WithSources(BaseModel):
    article: ArticleRead
    sources: list[SourceRead] = []
