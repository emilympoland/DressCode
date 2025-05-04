from app.dataclass import UserData, ClothingItem, Weather, ClothingType
from app.core.config import openai_api_key
from app.services.user_service import get_all_users
from typing import Dict, List, Optional
from dataclasses import asdict

import json
import base64
import openai

# In-memory storage for next item ID
next_item_id = 0
items: dict[int, ClothingItem] = {}

def encode_image(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def get_closet_items(user: UserData) -> List[ClothingItem]:
    """Get all items in a user's closet."""
    return [items[id] for id in user.wardrobe]

def get_all_closet_items() -> dict[int, ClothingItem]:
    return items

def get_item_type(clothing_type: ClothingType) -> List[ClothingItem]:
    return list(filter(lambda item: item.clothing_type == clothing_type, items.values()))

def get_closet_item(item_id: int) -> ClothingItem:
    return items[item_id]

def add_closet_item(user: UserData, image_url: str, clothing_type: ClothingType, season: Optional[Weather]) -> ClothingItem | None:
    """Add a new item to the user's closet."""
    global next_item_id
    
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
                            "url": image_url,
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
        clothing_type=clothing_type,
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


def serialize():
    serialized = {}
    for key, item in items.items():
        # Ensure the item is converted to a dict
        i = asdict(item)
        i["clothing_type"] = i["clothing_type"].value
        i["season"] = i["season"].value
        serialized[key] = i
        
    # Write the serialized items to a JSON file
    with open("closet_items.json", "w") as f:
        json.dump(serialized, f, indent=4)


def load_items():
    global items, next_item_id
    users = get_all_users()
    try:
        with open("closet_items.json", "r") as f:
            loaded = json.load(f)
        # Clear existing items
        items.clear()
        next_item_id = 0

        i = 0
        n = len(users)
        for key, data in loaded.items():
            key_int = int(key)
            # Reconstruct enum values from the string
            clothing_type = ClothingType(data["clothing_type"])
            season = Weather(data["season"])
            # Create the ClothingItem; adjust the field names based on your dataclass.
            item = ClothingItem(
                id=data["id"],
                image_url=data["image_url"],
                clothing_type=clothing_type,
                season=season,
                status=data["status"],
                description=data["description"]
            )
            items[key_int] = item
            users[i % n].wardrobe.append(key_int)
            i += 1
            if key_int >= next_item_id:
                next_item_id = key_int + 1

    except FileNotFoundError:
        # If the file doesn't exist, simply pass.
        pass

    except Exception as e:
        print(e)
        raise ValueError