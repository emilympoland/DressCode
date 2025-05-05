from app.dataclass import UserData, Collection
from typing import List


def add_collection(user: UserData, name: str, item_ids: List[int]):
    collection = Collection(name, item_ids)
    user.collections.append(collection)


def get_collections(user: UserData) -> List[Collection]:
    return user.collections