from typing import Deque, List
from dataclasses import asdict
from app.dataclass import Post, UserData
from app.services.closet_service import get_closet_item
from app.services.user_service import get_user_by_username
from collections import deque


feed: Deque[Post] = deque()

def add_post(post: Post):
    feed.appendleft(post)

def get_feed() -> List[Post]:
    return list(feed)