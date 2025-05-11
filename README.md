# DressCode

Our Final Project for CS160 at UC Berkeley.

To setup frontend, cd into the frontend directory and create a .env.local file with the following environment variable.

```
NEXT_PUBLIC_SERVER_URL="http://localhost:8000"
```

Then run:

```
npm install
npm run dev
```

To setup backend, cd into the dresscode-backend directory and create a .env.local file with the following contents:

```
CLIENT_URL="http://localhost:3000"
OPENAI_API_KEY=<Your OpenAI API Key>
```

Then setup a Python virtual environment and run:

```
pip install -r requirements.txt
fastapi dev app/main.py
```

After starting the backend server, cd into dresscode-backend/tests and run the following script to register two users and load items into memory.
```
python3 -m test_presentation
```
The two registered users are jeffrey (pw: 123) and william (pw: 456).
