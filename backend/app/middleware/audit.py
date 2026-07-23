from fastapi import Request
from app.database import AsyncSessionLocal
from app.models import AuditLog


async def _audit_log(request: Request, action: str, resource: str, user_id=None):
    async with AsyncSessionLocal() as db:
        log = AuditLog(
            user_id=user_id,
            action=action,
            resource=resource,
            ip_address=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent"),
            log_metadata={"method": request.method, "path": str(request.url.path)},
        )
        db.add(log)
        await db.commit()
