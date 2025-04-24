from main import app
from dataclass import UserCreate
from services.user_service import user_create
from core.database import SessionLocal


@app.post("/api/register")
def create_user(user: UserCreate) -> None:
    db = SessionLocal()
    try:
        user_create(db, user)
    finally:
        db.close