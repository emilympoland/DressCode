from app.dataclass import UserCreate, UserData
from typing import Optional, List


# In-memory storage
users: List[UserData] = []


def get_user_by_username(username: str) -> Optional[UserData]:
    for user in users:
        if user.username == username:
            return user
        
    return None

def get_all_users() -> List[UserData]:
    return users

def verify_user(username: str, password: str) -> Optional[UserData]:
    user = get_user_by_username(username)
    if user and password == user.password:
        return user
    return None

def user_create(user: UserCreate) -> UserData:
    # Check if username already exists
    if get_user_by_username(user.username):
        raise ValueError(f"Username {user.username} already exists")
    # Create new user
    db_user = UserData(
        username=user.username,
        password=user.password,
        profile_pic_url="",
    )
    
    users.append(db_user)
    return db_user