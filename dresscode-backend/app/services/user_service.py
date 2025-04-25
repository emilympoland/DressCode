from app.dataclass import UserCreate, UserData
from passlib.context import CryptContext
from typing import Dict, Optional, List

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory storage
users: Dict[int, UserData] = {}
next_user_id = 1

# Track current user
current_user: Optional[UserData] = None

def get_user(user_id: int) -> Optional[UserData]:
    return users.get(user_id)

def get_user_by_username(username: str) -> Optional[UserData]:
    return next((user for user in users.values() if user.username == username), None)

def get_all_users() -> List[UserData]:
    return list(users.values())

def verify_user(username: str, password: str) -> Optional[UserData]:
    user = get_user_by_username(username)
    if user and pwd_context.verify(password, user.password):
        global current_user
        current_user = user
        return user
    return None

def get_current_user() -> Optional[UserData]:
    return current_user

def user_create(user: UserCreate) -> UserData:
    global next_user_id
    
    # Check if username already exists
    if get_user_by_username(user.username):
        raise ValueError(f"Username {user.username} already exists")
    
    # Create new user
    db_user = UserData(
        username=user.username,
        password=pwd_context.hash(user.password),
        profile_pic_url="",
        wardrobe={}
    )
    
    users[next_user_id] = db_user
    next_user_id += 1
    
    return db_user