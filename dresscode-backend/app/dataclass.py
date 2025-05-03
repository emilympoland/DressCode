from pydantic import BaseModel
from dataclasses import dataclass, field
from typing import List, Optional
from enum import Enum


class Weather(Enum):
    warm = "warm"
    cold = "cold"
    rain = "rain"
    wind = "wind"
    snow = "snow"


class ClothingType(Enum):
    shirts = "shirts"
    pants = "pants"
    shoes = "shoes"
    tops = "tops"


class UserCreate(BaseModel):
    username: str
    password: str


@dataclass
class ClothingItem:
    id: int
    image_url: str
    clothing_type: ClothingType
    season: Weather
    status: str = "active"  # Default status
    description: str = ""
    borrowed: bool = False

    def __init__(self, id: int, image_url: str, clothing_type: ClothingType, season: Weather, status: str = "active", description: str = "", borrowed: bool = False):
        self.id = id
        self.image_url = image_url
        self.clothing_type = clothing_type
        self.season = season
        self.status = status
        self.description = description
        self.borrowed = borrowed


@dataclass
class BorrowRequest:
    item_id: int
    borrowee_username: str
    borrower_username: str
    duration: int
    id: int = 0
    item_image_url = ""

    def __init__(self, item_id: int, borrowee_username: str, borrower_username: str, duration: int, id: int = 0, item_image_url = ""):
        self.item_id = item_id
        self.borrowee_username = borrowee_username
        self.borrower_username = borrower_username
        self.duration = duration
        self.id = id
        self.item_image_url = item_image_url


@dataclass
class UserData:
    username: str
    password: str
    profile_pic_url: str
    wardrobe: List[int] = field(default_factory=list)
    requests: List[int] = field(default_factory=list)


    def __init__(self, username: str, password: str, wardrobe: List[int], requests: List[int], profile_pic_url: str = ""):
        self.username = username
        self.password = password
        self.profile_pic_url = profile_pic_url
        self.wardrobe = wardrobe
        self.requests = requests



@dataclass
class Post:
    poster_username: str
    caption: str
    outfit_item_ids: List[int]
    profile_pic_url: str = ""
    

    def __init__(self, poster_username: str, caption: str, outfit_item_ids: List[int], profile_pic_url: str = ""):
        self.poster_username = poster_username
        self.caption = caption
        self.outfit_item_ids = outfit_item_ids
        self.profile_pic_url = profile_pic_url


@dataclass
class Challenge:
    tops: List[ClothingItem]
    bottoms: List[ClothingItem]
    shoes: List[ClothingItem]
    prompt: str


    def __init__(self, tops: List[ClothingItem], bottoms: List[ClothingItem], shoes: List[ClothingItem], prompt: str):
        self.tops = tops
        self.bottoms = bottoms
        self.shoes = shoes
        self.prompt = prompt