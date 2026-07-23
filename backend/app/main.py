from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import get_settings
from app.database import engine, Base, AsyncSessionLocal
from app.routers import public_router, admin_router
from app.routers.revalidate import router as revalidate_router
from app.routers.ingest import router as ingest_router
from app.auth import ensure_admin_exists
from app.seed.seed import seed

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with AsyncSessionLocal() as db:
        await ensure_admin_exists(db)
        await seed()
    yield


app = FastAPI(title="Student Awareness Platform", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(public_router)
app.include_router(admin_router)
app.include_router(revalidate_router)
app.include_router(ingest_router)
