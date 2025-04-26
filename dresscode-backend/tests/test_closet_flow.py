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

def test_closet_flow():
    # 1. Register a user
    user_data = {
        "username": "testuser",
        "password": "testpass123"
    }
    response = requests.post(f"{BASE_URL}/api/register", json=user_data)
    assert response.status_code == 200
    print("\n1. Registered user:", response.json())

    # 2. Login
    response = requests.post(f"{BASE_URL}/api/login", json=user_data)
    assert response.status_code == 200
    print("\n2. Logged in:", response.json())

    # 3. Upload a clothing item
    test_image_path = create_test_image()
    try:
        files = {
            'image': ('test_image.jpg', open(test_image_path, 'rb'), 'image/jpeg')
        }
        data = {
            'tags': 'casual,summer',
            'season': 'warm',
            'user_id': 1
        }
        response = requests.post(
            f"{BASE_URL}/api/closet/upload",
            files=files,
            data=data
        )
        assert response.status_code == 200
        item_id = response.json()["id"]
        print("\n3. Uploaded clothing item:", response.json())

        # 4. Get closet items
        response = requests.get(f"{BASE_URL}/api/closet")
        assert response.status_code == 200
        items = response.json()
        assert len(items) > 0
        print("\n4. Closet items:", json.dumps(items, indent=2))

        # 5. Update the item
        update_data = {
            "updated_tags": "casual,summer,new",
            "status": "favorite"
        }
        response = requests.put(
            f"{BASE_URL}/api/closet/item/{item_id}",
            json=update_data
        )
        assert response.status_code == 200
        print("\n5. Updated item:", response.json())

        # 6. Check updated closet
        response = requests.get(f"{BASE_URL}/api/closet")
        assert response.status_code == 200
        updated_items = response.json()
        assert len(updated_items) > 0
        print("\n6. Updated closet items:", json.dumps(updated_items, indent=2))

        # 7. Delete the item
        response = requests.delete(f"{BASE_URL}/api/closet/item/{item_id}")
        assert response.status_code == 204
        print("\n7. Deleted item")

        # 8. Verify item is gone
        response = requests.get(f"{BASE_URL}/api/closet")
        assert response.status_code == 200
        final_items = response.json()
        assert len(final_items) == 0
        print("\n8. Final closet items:", json.dumps(final_items, indent=2))

    finally:
        # Clean up test image
        os.remove(test_image_path)

if __name__ == "__main__":
    test_closet_flow()
    print("\nAll tests passed!") 