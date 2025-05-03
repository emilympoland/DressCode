import requests
import json
import os

# Test server URL
BASE_URL = "http://localhost:8000"

def create_test_image():
    # Create a test image file
    test_image_path = "test_image.jpeg"
    with open(test_image_path, "wb") as f:
        f.write(b"fake image data")
    return test_image_path

def test_user_flow():
    # 1. Register user
    print("start test")
    user1_data = {
        "username": "testuser1",
        "password": "testpass123"
    }
    response = requests.post(f"{BASE_URL}/api/register", json=user1_data)
    assert response.status_code == 200
    print("\n1. Registered first user:", response.json())

    # 2. Login as first user and extract token
    response = requests.post(f"{BASE_URL}/api/login", json=user1_data)
    assert response.status_code == 200
    login_data = response.json()
    token = login_data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("\n2. Logged in as first user:", login_data)

    # 3. Check current user using token
    response = requests.get(f"{BASE_URL}/api/user/me", headers=headers)
    assert response.status_code == 200
    current_user = response.json()
    assert current_user["username"] == "testuser1"
    print("\n3. Current user:", json.dumps(current_user, indent=2))

    # 4. Upload clothing item
    test_image_path = "Formal-shirt.jpg"
    try:
        files = {
            'image': ('Formal-shirt.jpg', open(test_image_path, 'rb'), 'image/jpeg')
        }
        data = {
            'tags': 'casual,summer',
            'season': 'warm',
            'user_id': 1
        }
        print("hi")
        response = requests.post(
            f"{BASE_URL}/api/closet/upload",
            files=files,
            data=data,
            headers=headers
        )
        assert response.status_code == 200
        print("\n4. Uploaded clothing item:", response.json())

        # # 5. Check current user again to see the new item
        # response = requests.get(f"{BASE_URL}/api/user/me", headers=headers)
        # assert response.status_code == 200
        # current_user = response.json()
        # assert len(current_user["closet"]) > 0
        # print("\n5. Current user with new item:", json.dumps(current_user, indent=2))

    except Exception as e:
        raise

if __name__ == "__main__":
    print("start")
    test_user_flow()
    print("\nAll tests passed!")