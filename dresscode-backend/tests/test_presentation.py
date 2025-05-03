import requests


BASE_URL = "http://localhost:8000"

def test_outfit_generation():
    # 1. Register user
    user_data = {
        "username": "jeffrey",
        "password": "123"
    }
    response = requests.post(f"{BASE_URL}/api/register", json=user_data)
    assert response.status_code == 200
    print("\n1. Registered user:", response.json())

    login_data = response.json()
    token = login_data["access_token"]
    headers1 = {"Authorization": f"Bearer {token}"}

    user_data = {
        "username": "william",
        "password": "456"
    }
    response = requests.post(f"{BASE_URL}/api/register", json=user_data)
    assert response.status_code == 200
    print("\n1. Registered user:", response.json())

    login_data = response.json()
    token = login_data["access_token"]
    headers2 = {"Authorization": f"Bearer {token}"}


    item_data = {"image_url": "https://i.pinimg.com/736x/fc/64/51/fc64518d5c694c622c954ce7ebc10041.jpg", "clothing_type": "tops", "season": "warm"}
    response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers1, json=item_data)
    assert response.status_code == 200
    print("Uploaded top 1!")

    item_data = {"image_url": "https://i.pinimg.com/736x/24/66/c4/2466c40674e3c78f84cd24b8bc94fa96.jpg", "clothing_type": "tops", "season": "warm"}
    response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers1, json=item_data)
    assert response.status_code == 200
    print("Uploaded top 2!")

    item_data = {"image_url": "https://i.pinimg.com/736x/ad/a0/fc/ada0fc22c27a41899dced5f94b23976c.jpg", "clothing_type": "tops", "season": "warm"}
    response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers1, json=item_data)
    assert response.status_code == 200
    print("Uploaded bottom 1!")

    item_data = {"image_url": "https://i.pinimg.com/736x/d5/07/98/d507980cfd387bbb6accb4572c0b9134.jpg", "clothing_type": "tops", "season": "warm"}
    response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers2, json=item_data)
    assert response.status_code == 200
    print("Uploaded top1 for user 2!")



test_outfit_generation()