import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
load_dotenv(dotenv_path=os.path.join(basedir, ".env.local"))

d = os.getenv("OPENAI_API_KEY")
if not d:
    raise ValueError("OPENAI_API_KEY is not set")

openai_api_key = d