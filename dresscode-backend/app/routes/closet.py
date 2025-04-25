from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional, Dict, List
from datetime import datetime
import os
from app.dataclass import ClothingItem, Weather
from app.services.user_service import get_user

router = APIRouter()

# In-memory storage
clothing_items: Dict[int, ClothingItem] = {}
next_id = 1

@router.post("/api/closet/upload")
async def upload_clothing_item(
    image: UploadFile = File(...),
    tags: Optional[str] = Form(None),
    season: Optional[Weather] = Form(None),
    user_id: int = Form(...)
):
    global next_id

    # Verify user exists
    user = get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Save image to storage
    image_url = f"uploads/{user_id}/{datetime.now().isoformat()}_{image.filename}"
    os.makedirs(os.path.dirname(image_url), exist_ok=True)
    with open(image_url, "wb") as f:
        f.write(await image.read())

    # Parse tags
    tag_list = [tag.strip() for tag in (tags or "").split(",") if tag.strip()]

    # Create clothing item
    clothing_item = ClothingItem(
        id=next_id,
        image_url=image_url,
        tags=tag_list,
        season=season
    )
    
    # Store in memory
    clothing_items[next_id] = clothing_item
    # Add to user's wardrobe
    user.wardrobe[next_id] = clothing_item
    next_id += 1

    return clothing_item 