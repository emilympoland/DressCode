from app.dataclass import UserData, Collection, ClothingItem
from app.services.closet_service import get_closet_item
from typing import List


def add_collection(user: UserData, name: str, item_ids: List[int]):
    collection = Collection(name, item_ids)
    user.collections.append(collection)


def get_collections(user: UserData) -> List[List[ClothingItem]]:
    r = []
    for collection in user.collections:
        r.append([get_closet_item(item_id) for item_id in collection.item_ids])

    return r