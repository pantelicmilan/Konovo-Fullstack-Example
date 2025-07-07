from konovoapi.schemas.category import Category
from konovoapi.schemas.product import Product
from konovoapi.services.external_api_service import fetch_products, get_jwt_token
from konovoapi.config import settings

async def get_all_categories_usecase() -> list[Category]:
    token = await get_jwt_token(settings.auth_username, settings.auth_password)
    products : list[Product] = await fetch_products(token)
    unique_cats = {}
    for p in products:
        if not p.sif_productcategory or not p.category_name:
            continue
        key = (p.sif_productcategory, p.category_name)
        if key not in unique_cats:
            unique_cats[key] = Category(
                sif_productcategory=p.sif_productcategory,
                categoryName=p.category_name
            )
    return list(unique_cats.values())