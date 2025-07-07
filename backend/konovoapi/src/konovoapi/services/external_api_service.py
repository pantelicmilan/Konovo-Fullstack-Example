from fastapi import HTTPException
import httpx

from konovoapi.schemas.product import Product

LOGIN_URL = "https://zadatak.konovo.rs/login"
PRODUCTS_URL = "https://zadatak.konovo.rs/products"

async def get_jwt_token(username: str, password: str) -> str:
    async with httpx.AsyncClient() as client:
        response = await client.post(LOGIN_URL, json={
            "username": username,
            "password": password
        })

    if response.status_code != 200:
        raise Exception(f"Login failed: {response.status_code} - {response.text}")

    data = response.json()
    token = data.get("token")

    if not token:
        raise Exception("JWT token not found in response.")

    return token

async def fetch_products(token: str) -> list[Product]:
    headers = {
        "Authorization": f"Bearer {token}"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(PRODUCTS_URL, headers=headers)

    if response.status_code == 401:
        raise HTTPException(status_code=401, detail="Invalid or expired token.")
    elif response.status_code != 200:
        raise Exception(f"Failed to fetch products: {response.status_code} - {response.text}")

    products_data = response.json()
    products = [Product.model_validate(item) for item in products_data]
    return products