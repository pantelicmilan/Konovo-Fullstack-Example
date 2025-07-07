from konovoapi.services.external_api_service import get_jwt_token

async def login(username: str, password: str) -> str:
    token = await get_jwt_token(username, password)
    return token