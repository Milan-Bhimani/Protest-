from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, Union


class DocumentRead(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    file_url: Optional[str] = None
    file_type: Optional[str] = None
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class EventRead(BaseModel):
    id: int
    date: datetime
    title: str
    description: str
    sources: Optional[Union[list, dict]] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class Stats(BaseModel):
    total_events: int
    total_documents: int
    total_articles: int
    total_verified_claims: int
    days_of_protest: int = 0
    total_stories: int = 0


class StudentStoryCreate(BaseModel):
    title: str
    content: str
    author_name: Optional[str] = None
    author_email: Optional[str] = None


class StudentStoryRead(BaseModel):
    id: int
    title: str
    content: str
    author_name: Optional[str] = None
    author_email: Optional[str] = None
    status: str
    reviewed_at: Optional[datetime] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PublicReactionRead(BaseModel):
    id: int
    person_name: str
    category: Optional[str] = None
    statement_summary: str
    date: datetime
    original_source: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class PublicReactionCreate(BaseModel):
    person_name: str
    category: Optional[str] = None
    statement_summary: str
    date: datetime
    original_source: Optional[str] = None


class NewsletterSubscribe(BaseModel):
    email: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
