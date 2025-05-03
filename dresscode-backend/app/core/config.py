import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
load_dotenv(dotenv_path=os.path.join(basedir, ".env.local"))

d = os.getenv("OPENAI_API_KEY")
if not d:
    raise ValueError("OPENAI_API_KEY environment variable is not set")

openai_api_key = d

url = os.getenv("CLIENT_URL")
if not url:
    raise ValueError("CLIENT_URL environment variable is not set")

client_url = url