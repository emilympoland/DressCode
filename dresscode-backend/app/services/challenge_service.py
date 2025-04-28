import openai

from app.core.config import openai_api_key
from app.services.closet_service import get_closet_item

client = openai.OpenAI(api_key=openai_api_key)

def submit(top_id: int, bottom_id: int, shoe_id: int) -> str | None:
    top = get_closet_item(top_id)
    bottom = get_closet_item(bottom_id)
    shoe = get_closet_item(shoe_id)
    prompt = f"""
The current prompt for choosing an outfit is Monochrome Outfits. Given the following three clothing item descriptions, give a short description of the outfit selection, as well as 
how well the outfit fits into the theme of Monochrome Outfits.
Top: {top.description}
Bottom: {bottom.description}
Shoe: {shoe.description}
"""
    
    completion = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return completion.choices[0].message.content