from fastapi import APIRouter, HTTPException, Request, Depends
from app.dataclass import UserCreate, UserData, Post
from app.services.user_service import user_create, get_all_users, verify_user  # Removed get_current_user alias
from app.services.feed_service import add_post, get_feed
from app.core.auth import create_access_token, get_current_user_from_token

router = APIRouter()

@router.post("/api/feed/post")
async def create_post(post: Post, user: UserData = Depends(get_current_user_from_token)):
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    add_post(post)


@router.get("/api/feed")
async def feed(user: UserData = Depends(get_current_user_from_token)):
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    return get_feed()
