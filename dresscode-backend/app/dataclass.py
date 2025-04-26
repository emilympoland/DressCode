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


@dataclass
class UserData:
    username: str
    password: str
    profile_pic_url: str
    wardrobe: dict[int, ClothingItem]


