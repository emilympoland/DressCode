import requests
import json
import os


# Test server URL
BASE_URL = "http://localhost:8000"

def create_test_image():
    # Create a test image file
    test_image_path = "test_image.jpg"
    with open(test_image_path, "wb") as f:
        f.write(b"fake image data")
    return test_image_path

def test_outfit_generation():
    # 1. Register user
    user_data = {
        "username": "testuser2",
        "password": "testpass456"
    }
    response = requests.post(f"{BASE_URL}/api/register", json=user_data)
    assert response.status_code == 200
    print("\n1. Registered user:", response.json())
    login_data = response.json()
    token = login_data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Login as the user
    # response = requests.post(f"{BASE_URL}/api/login", json=user_data)
    # assert response.status_code == 200
    # print("\n2. Logged in as user:", response.json())

    # 3. Upload clothing items
    try:
        for i in range(4):  # Upload multiple clothing items
            files = {
                'image': (f'test_image_{i}.jpg', open(f'test_image_{i}.jpg', 'rb'), 'image/jpeg')
            }
            data = {
                'tags': ['casual', 'trendy'],
                'season': 'warm',
                'user_id': 1
            }
            response = requests.post(
                f"{BASE_URL}/api/closet/upload",
                files=files,
                data=data,
                headers=headers
            )
            assert response.status_code == 200
            print(f"\n3.{i+1} Uploaded clothing item {i+1}:", response.json())

        # 4. Generate outfit
        response = requests.get(f"{BASE_URL}/api/outfit/generate", headers=headers)
        assert response.status_code == 200
        outfit = response.json()
        assert len(outfit) > 0
        print("\n4. Generated outfit:", json.dumps(outfit, indent=2))

    except:
        raise

if __name__ == "__main__":
    test_outfit_generation()
    print("\nAll tests passed!")