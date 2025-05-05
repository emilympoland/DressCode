import random

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.dataclass import UserData, Challenge, ClothingType
from app.core.auth import get_current_user_from_token
from app.services.challenge_service import submit
from app.services.closet_service import get_item_type, get_closet_item

from dataclasses import asdict

class OutfitSubmission(BaseModel):
    top_id: int
    bottom_id: int
    shoe_id: int

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
async def submit_outfit(
    outfit: OutfitSubmission,  # Accept the JSON body as a Pydantic model
    user: UserData = Depends(get_current_user_from_token)
):
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    # Extract the IDs from the Pydantic model
    top_id = outfit.top_id
    bottom_id = outfit.bottom_id
    shoe_id = outfit.shoe_id

    # Generate the summary
    outfit_summary = submit(top_id, bottom_id, shoe_id)
    
    top_item = get_closet_item(top_id)
    bottom_item = get_closet_item(bottom_id)
    shoe_item = get_closet_item(shoe_id)
    
    if not top_item or not bottom_item or not shoe_item:
        raise HTTPException(status_code=404, detail="One or more clothing items not found")
    
    # Return the summary and image URLs
    return {
        "summary": outfit_summary,
        "image_urls": [
            top_item.image_url,
            bottom_item.image_url,
            shoe_item.image_url
        ]
    }