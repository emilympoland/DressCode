from pydantic import BaseModel
from dataclasses import dataclass
from typing import List
from enum import Enum


class Weather(Enum):
    WARM = "warm"
    COLD = "cold"
    RAIN = "rain"
    WIND = "wind"
    SNOW = "snow"


class UserCreate(BaseModel):
    username: str
    password: str


@dataclass
class ClothingItem:
    id: int
    image_url: str
    tags: List[str]
    season: Weather
    status: str = "active"  # Default status
    description: str = ""

    def __init__(self, id: int, image_url: str, tags: List[str], season: Weather, status: str = "active", description: str = ""):
        self.id = id
        self.image_url = image_url
        self.tags = tags
        self.season = season
        self.status = status
        self.description = description


@dataclass
class UserData:
    username: str
    password: str
    profile_pic_url: str
    wardrobe: dict[int, ClothingItem]

    def __init__(self, username: str, password: str, profile_pic_url: str = "", wardrobe: dict[int, ClothingItem] = {}):
        self.username = username
        self.password = password
        self.profile_pic_url = profile_pic_url
        self.wardrobe = wardrobe if wardrobe is not None else {}
