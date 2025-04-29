from app.dataclass import UserData, ClothingItem, Weather
from app.core.config import openai_api_key
from typing import Dict, List, Optional

import base64
import openai

# In-memory storage for next item ID
next_item_id = 0
items = {}

def encode_image(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def get_closet_items(user: UserData) -> List[ClothingItem]:
    """Get all items in a user's closet."""
    return [items[id] for id in user.wardrobe]

def get_closet_item(item_id: int) -> ClothingItem:
    return items[item_id]

def add_closet_item(user: UserData, image_url: str, tags: List[str], season: Optional[Weather]) -> ClothingItem | None:
    """Add a new item to the user's closet."""
    global next_item_id
    
    base64_image = encode_image(image_url)
    client = openai.OpenAI(api_key=openai_api_key)

    completion = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {
                "role": "user",
                "content": [
                    { "type": "text", "text": "Describe this piece of clothing in less than 100 words. Focus on the type of clothing as well as clothing style and what kind of vibe the item gives. Also, mention what kind of weather this clothing would be good in." },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                ],
            }
        ],
    )

    response = completion.choices[0].message.content

    if not season or not response:
        return None
    
    # Create new item
    item = ClothingItem(
        id=next_item_id,
        image_url=image_url,
        tags=tags,
        season=season,
        status="active",
        description=response
    )
    
    # Add to user's wardrobe
    items[next_item_id] = item
    user.wardrobe.append(next_item_id)
    next_item_id += 1
    
    return item

def add_borrowed_item(user: UserData, item_id: int):
    if item_id not in items:
        return
    
    user.wardrobe.append(item_id)

def update_closet_item(user: UserData, item_id: int, updates: Dict) -> ClothingItem:
    """Update a clothing item's metadata."""
    if item_id not in user.wardrobe:
        raise ValueError(f"Item {item_id} not found in closet")
    
    item = items[item_id]
    
    # Update tags if provided
    if "updated_tags" in updates:
        item.tags = [tag.strip() for tag in updates["updated_tags"].split(",") if tag.strip()]
    
    # Update status if provided
    if "status" in updates:
        item.status = updates["status"]
    
    return item

def delete_closet_item(user: UserData, item_id: int) -> None:
    """Delete a clothing item from the closet."""
    if item_id not in user.wardrobe:
        raise ValueError(f"Item {item_id} not found in closet")
    
    # Remove item from user's wardrobe
    user.wardrobe.remove(item_id)
    del items[item_id]