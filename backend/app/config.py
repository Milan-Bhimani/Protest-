from pydantic_settings import BaseSettings
from functools import lru_cache
import secrets


class Settings(BaseSettings):
    database_url: str
    redis_url: str = "redis://localhost:6379"
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 15
    admin_email: str = "admin@example.com"
    admin_password: str
    cors_origins: list[str] = ["http://localhost:3000"]
    nextjs_url: str = "http://localhost:3000"
    nextjs_revalidation_url: str = "http://localhost:3000/api/revalidate"
    revalidation_secret: str = ""
    ingestion_api_key: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    @property
    def resolved_secret_key(self) -> str:
        return self.secret_key or secrets.token_urlsafe(32)

    @property
    def resolved_revalidation_secret(self) -> str:
        return self.revalidation_secret or secrets.token_urlsafe(16)

    @property
    def resolved_ingestion_api_key(self) -> str:
        return self.ingestion_api_key or secrets.token_urlsafe(24)


@lru_cache
def get_settings() -> Settings:
    return Settings()
