import uuid
from pathlib import Path


def slugify(text: str) -> str:
    return "-".join(text.lower().split())[:200]


def storage_path(filename: str) -> Path:
    uploads = Path("uploads")
    uploads.mkdir(exist_ok=True)
    return uploads / f"{uuid.uuid4().hex}_{filename}"
