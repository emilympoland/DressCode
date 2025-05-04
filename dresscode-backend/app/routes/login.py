from fastapi import APIRouter, HTTPException, Request, Depends, Response
from app.dataclass import UserCreate, UserData
from app.services.user_service import user_create, get_all_users, verify_user  # Removed get_current_user alias
from app.core.auth import create_access_token, get_current_user_from_token, ACCESS_TOKEN_EXPIRE_MINUTES
from typing import Dict, List

router = APIRouter()

@router.post("/api/register")
async def create_user(user: UserCreate, response: Response) -> Dict:
    try:
        user_data = user_create(user)
        return await login_helper(user, response)
    
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
async def login(data: UserCreate, response: Response) -> Dict:
    try:
        return await login_helper(data, response)

    except Exception as e:
        raise HTTPException(status_code=500, detail="Login failed")
    

async def login_helper(data: UserCreate, response: Response) -> Dict:
    if not data.username or not data.password:
        raise HTTPException(status_code=400, detail="Username and password are required")
    
    user = verify_user(data.username, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    
    
    # Create a token with the username as subject
    # ok something is wrong in here
    token = create_access_token({"sub": user.username})
    
    # Set the token in a cookie so the client doesn't have to attach it manually
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60  # Cookie expires in same duration as the token
    )
    
    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/api/user/me")
async def get_current_user(user: UserData = Depends(get_current_user_from_token)) -> Dict:
    return {
        "username": user.username
    }