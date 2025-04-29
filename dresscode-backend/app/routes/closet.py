from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Request, Depends
from typing import Optional, Dict, List
from dataclasses import asdict
from datetime import datetime
import os
from app.dataclass import ClothingItem, Weather, UserData
from app.core.auth import get_current_user_from_token
from app.services.closet_service import get_closet_items, update_closet_item, delete_closet_item, add_closet_item

router = APIRouter()

@router.post("/api/closet/upload")
async def upload_clothing_item(
    image: UploadFile = File(...),
    tags: Optional[str] = Form(None),
    season: Optional[Weather] = Form(None),
    user: UserData = Depends(get_current_user_from_token)
):
    # Save image to storage
    image_url = f"uploads/{user.username}/{datetime.now().isoformat()}_{image.filename}"
    os.makedirs(os.path.dirname(image_url), exist_ok=True)
    with open(image_url, "wb") as f:
        f.write(await image.read())

    # Parse tags
    tag_list = [tag.strip() for tag in (tags or "").split(",") if tag.strip()]

    # Create and add clothing item
    clothing_item = add_closet_item(user, image_url, tag_list, season)
    if not clothing_item:
        return
    
    return asdict(clothing_item)

@router.get("/api/closet")
async def get_closet(user: UserData = Depends(get_current_user_from_token)) -> List[Dict]:
    items = get_closet_items(user)
    return [asdict(item)for item in items]

@router.put("/api/closet/item/{item_id}")
async def update_item(item_id: int, request: Request, user: UserData = Depends(get_current_user_from_token)) -> Dict:
    try:
        data = await request.json()
        updated_item = update_closet_item(user, item_id, data)
        return {"message": "Item updated successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to update item")

@router.delete("/api/closet/item/{item_id}", status_code=204)
async def delete_item(item_id: int, user: UserData = Depends(get_current_user_from_token)) -> None:
    try:
        delete_closet_item(user, item_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to delete item")