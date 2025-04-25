import requests
import json

# Test server URL
BASE_URL = "http://localhost:8000"

def test_user_flow():
    # 1. Register first user
    user1_data = {
        "username": "testuser1",
        "password": "testpass123"
    }
    response = requests.post(f"{BASE_URL}/api/register", json=user1_data)
    assert response.status_code == 200
    print("\n1. Registered first user:", response.json())

    # 2. Register second user
    user2_data = {
        "username": "testuser2",
        "password": "testpass456"
    }
    response = requests.post(f"{BASE_URL}/api/register", json=user2_data)
    assert response.status_code == 200
    print("\n2. Registered second user:", response.json())

    # 3. Check all users
    response = requests.get(f"{BASE_URL}/api/users")
    assert response.status_code == 200
    users = response.json()
    assert len(users) == 2
    print("\n3. All users:", json.dumps(users, indent=2))

    # 4. Login as first user
    response = requests.post(f"{BASE_URL}/api/login", json=user1_data)
    assert response.status_code == 200
    print("\n4. Logged in as first user:", response.json())

    # 5. Check current user
    response = requests.get(f"{BASE_URL}/api/user/me")
    assert response.status_code == 200
    current_user = response.json()
    assert current_user["username"] == "testuser1"
    print("\n5. Current user:", json.dumps(current_user, indent=2))

if __name__ == "__main__":
    test_user_flow()
    print("\nAll tests passed!") 