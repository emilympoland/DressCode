from fastapi import APIRouter, HTTPException, Depends
from app.dataclass import UserData, Challenge
from app.core.auth import get_current_user_from_token
from app.services.challenge_service import submit
from app.services.closet_service import add_closet_item

from dataclasses import asdict

router = APIRouter()

@router.get("/api/challenge/today")
async def get_challenge(user: UserData = Depends(get_current_user_from_token)):
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    top1 = add_closet_item(user, "https://photos6.spartoo.co.uk/photos/254/25485684/25485684_1200_A.jpg", [], None)
    top2 = add_closet_item(user, "https://m.media-amazon.com/images/I/616yfSY7LvL._AC_UY1000_.jpg", [], None)
    bottom1 = add_closet_item(user, "https://www.trekitt.co.uk/images/products/1/10/1022-02010-7494_main.jpg", [], None)
    bottom2 = add_closet_item(user, "https://www.komodo.co.uk/cdn/shop/products/I1-CS-60FLIPSHORTTEALGREEN_2000x.jpg", [], None)
    shoe1 = add_closet_item(user, "https://www.samuel-windsor.co.uk/cdn/shop/files/69C0ACF0-9F29-44A7-A4CB-FBD502884603.jpg", [], None)
    shoe2 = add_closet_item(user, "https://i5.walmartimages.com/seo/NECHOLOGY-Mens-Fashion-Casual-Shoes-Men-Sneakers-Retro-All-Match-Casual-Shoes-Small-White-Casual-Office-Shoes-for-Men-White-10-5_3438e87e-756d-4dfc-a8f8-fc196b0e32d3.f8d750683c3dfba1a7847cb187d8a29b.jpeg", [], None)

    if top1 == None or top2 == None or bottom1 == None or bottom2 == None or shoe1 == None or shoe2 == None:
        return

    challenge = Challenge([top1, top2], [bottom1, bottom2], [shoe1, shoe2], "Try monochrome outfits today!")
    return asdict(challenge)

@router.post("/api/challenge/submit")
async def submit_outfit(top_id: int, bottom_id: int, shoe_id: int, user: UserData = Depends(get_current_user_from_token)):
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    return {"summary": submit(top_id, bottom_id, shoe_id)}