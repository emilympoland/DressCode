from fastapi import APIRouter

from app.services.closet_service import get_closet_items
from app.services.user_service import get_current_user
from app.core.config import openai_api_key

import openai

client = openai.OpenAI(api_key=openai_api_key)
router = APIRouter()


@router.post("/api/outfit/generate")
async def generate_outfit():
    user = get_current_user()
    if not user:
        return
    
    clothes = get_closet_items(user)

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
    items = [user.wardrobe[int(id)] for id in item_ids]

    return [
        {
            "item_id": item.id,
            "image_url": item.image_url,
            "tags": item.tags,
            "status": item.status
        }
        for item in items
    ]