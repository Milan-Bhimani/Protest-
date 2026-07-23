from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel

from app.database import get_db
from app.models import User, Role
from app.config import get_settings

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer(auto_error=False)


class CurrentUser(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    role_id: int
    is_active: bool


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.access_token_expire_minutes)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)


async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    result = await db.execute(select(User).where(User.email == email.lower()))
    return result.scalar_one_or_none()


async def authenticate_user(
    db: AsyncSession, email: str, password: str
) -> Optional[User]:
    user = await get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> Optional[CurrentUser]:
    if not credentials:
        return None
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.secret_key,
            algorithms=[settings.algorithm],
        )
        email: str = payload.get("sub")
        if not email:
            return None
    except JWTError:
        return None
    user = await get_user_by_email(db, email)
    if not user:
        return None
    return CurrentUser(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        role_id=user.role_id,
        is_active=user.is_active,
    )


async def ensure_admin_exists(db: AsyncSession):
    admin = await get_user_by_email(db, settings.admin_email.lower())
    if not admin:
        role_result = await db.execute(select(Role).where(Role.name == "admin"))
        role = role_result.scalar_one_or_none()
        if not role:
            role = Role(name="admin", permissions={"all": True})
            db.add(role)
            await db.commit()
            await db.refresh(role)
        admin = User(
            email=settings.admin_email.lower(),
            hashed_password=hash_password(settings.admin_password),
            full_name="Admin",
            role_id=role.id,
            is_active=True,
        )
        db.add(admin)
        await db.commit()
        await db.refresh(admin)
