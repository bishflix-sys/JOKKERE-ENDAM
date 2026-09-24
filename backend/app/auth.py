import os
from pathlib import Path
from typing import Annotated

from fastapi import Header, HTTPException, status

def load_token() -> str:
    configured = os.getenv("ULTRA_API_TOKEN")
    if configured:
        return configured
    token_file = Path(__file__).resolve().parents[1] / ".dev-token"
    if token_file.is_file():
        return token_file.read_text(encoding="utf-8").strip()
    return ""


def require_token(authorization: Annotated[str | None, Header()] = None) -> str:
    expected = f"Bearer {load_token()}"
    if authorization != expected:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalide ou absent",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return API_TOKEN
