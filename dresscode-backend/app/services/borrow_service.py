from app.dataclass import BorrowRequest, UserData
from app.services.closet_service import add_borrowed_item
from app.services.user_service import get_user_by_username
from typing import Dict, List



requests: Dict[int, BorrowRequest] = {}
curr_id = 0

def add_borrow_request(request: BorrowRequest, user: UserData) -> int:
    global curr_id
    requests[curr_id] = request
    request.id = curr_id
    user.requests.append(curr_id)
    curr_id += 1

    return curr_id - 1

def del_borrow_request(request_id: int, user: UserData):
    if request_id not in requests:
        return
    del requests[request_id]
    user.requests.remove(request_id)

def get_borrow_requests(user: UserData) -> List[BorrowRequest]:
    return [requests[id] for id in user.requests]

def accept_request(request_id: int):
    request = requests[request_id]
    user = get_user_by_username(request.borrower_username)
    if not user:
        return
    add_borrowed_item(user, request.item_id)

