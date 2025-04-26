from app.dataclass import UserData, ClothingItem
from typing import Dict, List, Optional

# In-memory storage for next item ID
next_item_id = 1

def get_closet_items(user: UserData) -> List[ClothingItem]:
    """Get all items in a user's closet."""
    return list(user.wardrobe.values())

def add_closet_item(user: UserData, image_url: str, tags: List[str], season: Optional[str]) -> ClothingItem:
    """Add a new item to the user's closet."""
    global next_item_id
    
    # Create new item
    item = ClothingItem(
        id=next_item_id,
        image_url=image_url,
        tags=tags,
        season=season,
        status="active"
    )
    
    # Add to user's wardrobe
    user.wardrobe[next_item_id] = item
    next_item_id += 1
    
    return item

def update_closet_item(user: UserData, item_id: int, updates: Dict) -> ClothingItem:
    """Update a clothing item's metadata."""
    if item_id not in user.wardrobe:
        raise ValueError(f"Item {item_id} not found in closet")
    
    item = user.wardrobe[item_id]
    
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
    del user.wardrobe[item_id] 