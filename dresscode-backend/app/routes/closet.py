from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Request, Depends, Body
from pydantic import BaseModel
from typing import Optional, Dict, List
from dataclasses import asdict
from datetime import datetime
import os
from app.dataclass import ClothingItem, Weather, UserData, ClothingType
from app.core.auth import get_current_user_from_token
from app.services.closet_service import get_closet_items, update_closet_item, delete_closet_item, add_closet_item, get_closet_item

router = APIRouter()

class UploadItem(BaseModel):
    image_url: str
    clothing_type: str
    season: str

@router.post("/api/closet/upload")
async def upload_clothing_item(
    item: UploadItem = Body(...),
    user: UserData = Depends(get_current_user_from_token)
):
    type = ClothingType[item.clothing_type]
    s = Weather[item.season]

    clothing_item = add_closet_item(user, item.image_url, type, s)
    if not clothing_item:
        return
    
    return asdict(clothing_item)

@router.get("/api/closet")
async def get_closet(user: UserData = Depends(get_current_user_from_token)) -> List[Dict]:
    print("Received get_closet request")
    items = get_closet_items(user)
    return [asdict(item)for item in items]

@router.get("api/closet/item/{item_id}")
async def get_item(item_id: int, user: UserData = Depends(get_current_user_from_token)):
    if item_id not in user.wardrobe:
        raise HTTPException(status_code=500, detail="Item not in wardrobe")
    
    return asdict(get_closet_item(item_id))

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