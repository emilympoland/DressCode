from fastapi import APIRouter, HTTPException, Request
from app.dataclass import UserCreate, UserData
from app.services.user_service import user_create, get_all_users, verify_user, get_current_user as get_logged_in_user
from typing import Dict, List
import json

router = APIRouter()

@router.post("/api/register")
async def create_user(request: Request) -> Dict:
    try:
        data = json.loads(await request.body())
        user = UserCreate(**data)
        user_data = user_create(user)
        
        return {
            "username": user_data.username,
            "profile_pic_url": user_data.profile_pic_url,
            "wardrobe": {}
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create user")

@router.get("/api/users")
def list_users() -> List[Dict]:
    users = get_all_users()
    return [
        {
            "username": user.username,
            "profile_pic_url": user.profile_pic_url,
            "wardrobe_size": len(user.wardrobe)
        }
        for user in users
    ]

@router.post("/api/login")
async def login(request: Request) -> Dict:
    try:
        data = json.loads(await request.body())
        
        if "username" not in data or "password" not in data:
            raise HTTPException(status_code=400, detail="Username and password are required")
        
        user = verify_user(data["username"], data["password"])
        if not user:
            raise HTTPException(status_code=401, detail="Invalid username or password")
        
        return {
            "username": user.username,
            "profile_pic_url": user.profile_pic_url,
            "wardrobe_size": len(user.wardrobe)
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Login failed")

@router.get("/api/user/me")
async def get_current_user() -> Dict:
    try:
        user = get_logged_in_user()
        if not user:
            raise HTTPException(status_code=401, detail="Not logged in")
        
        return {
            "username": user.username,
            "closet": user.wardrobe
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to get user info")