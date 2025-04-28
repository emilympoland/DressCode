from fastapi import APIRouter, Depends

from app.services.closet_service import get_closet_items, get_closet_item
from app.core.auth import get_current_user_from_token
from app.core.config import openai_api_key
from app.dataclass import UserData

import openai

client = openai.OpenAI(api_key=openai_api_key)
router = APIRouter()


@router.get("/api/outfit/generate")
async def generate_outfit(user: UserData = Depends(get_current_user_from_token)):
    clothes = get_closet_items(user)

    if not clothes:
        return

    clothing_table = [f"{item.id}: {item.description}" for item in clothes]
    clothing = "\n".join(clothing_table)
    request = f"""
Given this table of clothing and their descriptions, pick a good, full outfit for a warm, sunny day in Berkeley, California. Consider matching style and vibe of all clothing items in the outfit,
and make sure to provide a complete outfit. Respond with a list of clothing item id's, separated by commas. Here is an example output: 4,10,12,14,20. Here is the list of clothing and their
descriptions.
{clothing}
"""


    completion = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {
                "role": "user",
                "content": request
            }
        ]
    )

    response = completion.choices[0].message.content
    if not response:
        return
    
    item_ids = response.split(",")
    items = [get_closet_item(int(id)) for id in item_ids]

    return [
        {
            "item_id": item.id,
            "image_url": item.image_url,
            "tags": item.tags,
            "status": item.status
        }
        for item in items
    ]