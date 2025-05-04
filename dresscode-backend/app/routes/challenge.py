import random

from fastapi import APIRouter, HTTPException, Depends
from app.dataclass import UserData, Challenge, ClothingType
from app.core.auth import get_current_user_from_token
from app.services.challenge_service import submit
from app.services.closet_service import get_item_type

from dataclasses import asdict

router = APIRouter()

@router.get("/api/challenge/refresh/{clothingType}")
async def get_challenge(clothingType: str, user: UserData = Depends(get_current_user_from_token)):
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    try:
        clothing_type = ClothingType(clothingType)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid clothing type provided")
    
    items = get_item_type(clothing_type)
    items_sample = random.sample(items, 3)

    challenge = Challenge(items_sample)
    return asdict(challenge)

@router.post("/api/challenge/submit")
async def submit_outfit(top_id: int, bottom_id: int, shoe_id: int, user: UserData = Depends(get_current_user_from_token)):
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    return {"summary": submit(top_id, bottom_id, shoe_id)}