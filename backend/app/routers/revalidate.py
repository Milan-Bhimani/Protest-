import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.config import get_settings

router = APIRouter(prefix="/api/system", tags=["system"])


class RevalidationRequest(BaseModel):
    tags: list[str]
    secret: str


class RevalidationResponse(BaseModel):
    success: bool
    revalidated: list[str]


@router.post("/revalidate", response_model=RevalidationResponse)
async def revalidate(payload: RevalidationRequest):
    settings = get_settings()
    expected = settings.resolved_revalidation_secret

    if payload.secret != expected:
        raise HTTPException(status_code=403, detail="Invalid secret")

    nextjs_url = settings.nextjs_url
    revalidation_endpoint = f"{nextjs_url}/api/revalidate"

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                revalidation_endpoint,
                json={"tags": payload.tags, "secret": payload.secret},
            )
            resp.raise_for_status()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Revalidation proxy failed: {e}")

    return RevalidationResponse(success=True, revalidated=payload.tags)
