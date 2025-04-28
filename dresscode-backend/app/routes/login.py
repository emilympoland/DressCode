from fastapi import APIRouter, HTTPException, Request, Depends
from app.dataclass import UserCreate, UserData
from app.services.user_service import user_create, get_all_users, verify_user  # Removed get_current_user alias
from app.core.auth import create_access_token, get_current_user_from_token
from typing import Dict, List

router = APIRouter()

@router.post("/api/register")
async def create_user(user: UserCreate) -> Dict:
    try:
        user_data = user_create(user)
        return await login(user)
    
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
async def login(data: UserCreate) -> Dict:
    try:
        if not data.username or not data.password:
            raise HTTPException(status_code=400, detail="Username and password are required")
        
        user = verify_user(data.username, data.password)
        print(user)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid username or password")
        # Create a token with the username as subject
        token = create_access_token({"sub": user.username})
        return {
            "access_token": token,
            "token_type": "bearer"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail="Login failed")

@router.get("/api/user/me")
async def get_current_user(user: UserData = Depends(get_current_user_from_token)) -> Dict:
    return {
        "username": user.username,
        "closet": user.wardrobe
    }