from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class RoleRead(BaseModel):
    id: int
    name: str
    permissions: Optional[dict] = None

    model_config = ConfigDict(from_attributes=True)


class UserRead(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    role: RoleRead
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserCreate(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None
    role_id: int


class AdminLogin(BaseModel):
    email: str
    password: str


class TokenData(BaseModel):
    sub: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
