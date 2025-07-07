from typing import Union
from konovoapi.schemas.product import Product
from konovoapi.services.external_api_service import fetch_products

async def get_product_by_id_usecase(product_id:str, token:str) -> Union[Product]:
    all_products = await fetch_products(token)
    for product in all_products:
        if product.sif_product == product_id:
            return product
    return None
