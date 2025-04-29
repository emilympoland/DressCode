from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Request, Depends
from typing import Optional, Dict, List
from datetime import datetime
import os
from app.dataclass import BorrowRequest, UserData
from app.core.auth import get_current_user_from_token
from app.services.user_service import get_user_by_username
from app.services.borrow_service import add_borrow_request, del_borrow_request, get_borrow_requests, accept_request
from app.services.closet_service import get_closet_item

from dataclasses import asdict

router = APIRouter()

@router.post("/api/borrow/request")
async def upload_clothing_item(borrow_request: BorrowRequest, user: UserData = Depends(get_current_user_from_token)):
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    borrowee = get_user_by_username(borrow_request.borrowee_username)
    if not borrowee:
        raise HTTPException(status_code=500, detail="Borrowee does not exist")
    if borrow_request.item_id not in borrowee.wardrobe:
        raise HTTPException(status_code=500, detail="Item does not exist")
    
    add_borrow_request(borrow_request, borrowee)


@router.get("/api/borrow/incoming")
async def get_incoming_requests(user: UserData = Depends(get_current_user_from_token)):
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    request_list = get_borrow_requests(user)
    return [asdict(request) for request in request_list]


@router.post("/api/borrow/respond")
async def respond_to_request(request_id: int, response: bool, user: UserData = Depends(get_current_user_from_token)):
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    if response:
        accept_request(request_id)
    
    else:
        del_borrow_request(request_id, user)