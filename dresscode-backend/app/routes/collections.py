from fastapi import APIRouter, Depends, Body
from pydantic import BaseModel
from typing import List
from dataclasses import asdict
from app.dataclass import UserData
from app.core.auth import get_current_user_from_token
from app.services.collections_service import add_collection, get_collections

router = APIRouter()

class CreateCollection(BaseModel):
    name: str
    item_ids: List[int]


@router.post("/api/collections/create")
async def create_collection(data: CreateCollection = Body(...), user: UserData = Depends(get_current_user_from_token)):
    add_collection(user=user, name=data.name, item_ids=data.item_ids)


@router.get("/api/collections")
async def collections(user: UserData = Depends(get_current_user_from_token)):
    c = get_collections(user)
    return [asdict(collection) for collection in c]