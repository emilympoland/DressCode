import sys
sys.path.insert(0, '/Users/jeffreykim/DressCode/dresscode-backend')

import requests
import json
import dataclasses

BASE_URL = "http://localhost:8000"
tops_links = [
    "https://i.pinimg.com/736x/fc/64/51/fc64518d5c694c622c954ce7ebc10041.jpg",
    "https://i.pinimg.com/736x/24/66/c4/2466c40674e3c78f84cd24b8bc94fa96.jpg",
    "https://i.pinimg.com/736x/c0/8d/a1/c08da1a5afa7813d074897f41422058b.jpg",
    "https://i.pinimg.com/736x/1e/c0/0a/1ec00a8e89ef5354207c076c16c34962.jpg",
    "https://i.pinimg.com/736x/d5/07/98/d507980cfd387bbb6accb4572c0b9134.jpg",
    "https://i.pinimg.com/736x/6b/b0/bf/6bb0bfb4f75b319dbb0e12ae0234d3cd.jpg",
    "https://i.pinimg.com/736x/8e/d3/0a/8ed30ad2c7c9304a04cb0593c0ffbb1e.jpg"
]

pants_links = [
    "https://i.pinimg.com/736x/ad/a0/fc/ada0fc22c27a41899dced5f94b23976c.jpg",
    "https://i.pinimg.com/736x/3c/14/32/3c1432118fdb49a23877b7bf68dbf7a7.jpg",
    "https://i.pinimg.com/736x/81/91/c2/8191c2f8e36683d09d6afec2b3faaffa.jpg",
    "https://i.pinimg.com/736x/97/ac/b6/97acb6eec84a4b91d6b187632bca87d5.jpg",
    "https://i.pinimg.com/736x/8c/5b/f7/8c5bf7a5e1d7678e92d35e9b06e4ff43.jpg",
    "https://i.pinimg.com/736x/94/4b/e9/944be92c46a59ed38a268f7a70263845.jpg"
]

shoes_links = [
    "https://i.pinimg.com/736x/9a/23/32/9a2332d73b79d71d43fae4305e9329b5.jpg",
    "https://i.pinimg.com/736x/65/24/5c/65245c53879f93aaee4983d4f88403c0.jpg",
    "https://i.pinimg.com/736x/6c/25/0e/6c250ec77fd3e2c695cb19a0c99a6853.jpg",
    "https://i.pinimg.com/736x/67/c6/a3/67c6a32ea1e0aae61d6b0b6d9b6f4a30.jpg",
    "https://i.pinimg.com/736x/29/a0/a1/29a0a1061ad7cf6bc6eae6ddfc9a3e6c.jpg",
    "https://i.pinimg.com/736x/d4/40/4d/d4404d759a1291c1ca54a14b786445cd.jpg"
]

shirts_links = [
    "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/480780s2.jpg",
    "https://sugarloafclothingco.co.uk/cdn/shop/files/BrumbyAustralianWorkShirt_Unisex_-Cobalt.png",
    "https://www.plain-t-shirts.co.uk/image/cache/data/polo%20shirts/black-polo-600x800.jpg",
]


# def write_items():
#     items = get_all_closet_items()
#     # If items is a dictionary mapping IDs to ClothingItem instances,
#     # convert each clothing item to a dictionary.
#     serialized = {}
#     for key, item in items.items():
#         # Ensure the item is converted to a dict
#         serialized[key] = dataclasses.asdict(item)
        
#     # Write the serialized items to a JSON file
#     with open("closet_items.json", "w") as f:
#         json.dump(serialized, f, indent=4)


def test_create_items():
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


    # item_data = {"image_url": "https://i.pinimg.com/736x/fc/64/51/fc64518d5c694c622c954ce7ebc10041.jpg", "clothing_type": "tops", "season": "warm"}
    # response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers1, json=item_data)
    # assert response.status_code == 200
    # print("Uploaded top 1!")

    # item_data = {"image_url": "https://i.pinimg.com/736x/24/66/c4/2466c40674e3c78f84cd24b8bc94fa96.jpg", "clothing_type": "tops", "season": "warm"}
    # response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers1, json=item_data)
    # assert response.status_code == 200
    # print("Uploaded top 2!")

    # item_data = {"image_url": "https://i.pinimg.com/736x/ad/a0/fc/ada0fc22c27a41899dced5f94b23976c.jpg", "clothing_type": "tops", "season": "warm"}
    # response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers1, json=item_data)
    # assert response.status_code == 200
    # print("Uploaded bottom 1!")

    # item_data = {"image_url": "https://i.pinimg.com/736x/d5/07/98/d507980cfd387bbb6accb4572c0b9134.jpg", "clothing_type": "tops", "season": "warm"}
    # response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers2, json=item_data)
    # assert response.status_code == 200
    # print("Uploaded top1 for user 2!")


    for i in range(len(tops_links)):
        curr = tops_links[i]
        headers = headers1 if i % 2 == 0 else headers2

        item_data = {"image_url": curr, "clothing_type": "tops", "season": "warm"}
        response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers, json=item_data)
        assert response.status_code == 200
        print(f"Uploaded top {i+1}!")


    for i in range(len(pants_links)):
        curr = pants_links[i]
        headers = headers1 if i % 2 == 0 else headers2

        item_data = {"image_url": curr, "clothing_type": "pants", "season": "warm"}
        response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers, json=item_data)
        assert response.status_code == 200
        print(f"Uploaded bottom {i+1}!")


    for i in range(len(shoes_links)):
        curr = shoes_links[i]
        headers = headers1 if i % 2 == 0 else headers2

        item_data = {"image_url": curr, "clothing_type": "shoes", "season": "warm"}
        response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers, json=item_data)
        assert response.status_code == 200
        print(f"Uploaded shoe {i+1}!")


    for i in range(len(shirts_links)):
        curr = shirts_links[i]
        headers = headers1 if i % 2 == 0 else headers2

        item_data = {"image_url": curr, "clothing_type": "shirts", "season": "warm"}
        response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers, json=item_data)
        assert response.status_code == 200
        print(f"Uploaded shirt {i+1}!")

    response = requests.get(f"{BASE_URL}/api/closet/serialize")
    assert response.status_code == 200
    print("serialized items")


def test_outfit_generation_small():
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
    response = requests.post(f"{BASE_URL}/api/closet/upload", headers=headers2, json=item_data)
    assert response.status_code == 200
    print("Uploaded top 2!")

    response = requests.get(f"{BASE_URL}/api/closet/serialize")
    assert response.status_code == 200
    print("serialized items")


def test_load():
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

    response = requests.get(f"{BASE_URL}/api/closet/load")
    assert response.status_code == 200
    print("loaded items")


test_load()