import re
from typing import Optional

from fastapi import Request
from konovoapi.schemas.product import Product

price_multiplicator_for_specific_category = 1.10
category_name_for_specific_price_increase = "Monitori"

word_from_desc_to_replace = r'\bbrzina\b'
replacement_word = "performanse"

def process_products(products: list[Product]) -> list[Product] :
    return [process_product(product) for product in products]

def process_product(product: Product) -> Product:
    #Zamena reči u opisu proizvoda i povećanje cene za određenu kategoriju
    updated_description = None
    if product.description is not None:
        updated_description = re.sub(
            word_from_desc_to_replace,
            replacement_word,
            product.description,
            flags=re.IGNORECASE
        )

    updated_price = product.price
    if product.category_name is not None and product.category_name.lower() == category_name_for_specific_price_increase.lower():
        updated_price = product.price * price_multiplicator_for_specific_category

    return product.model_copy(update={
        "description": updated_description,
        "price": updated_price
    })

def get_jwt_cookie(request: Request, cookie_name: str = "Authorization") -> Optional[str]:
    auth_value = request.cookies.get(cookie_name)
    if auth_value and auth_value.startswith("Bearer "):
        return auth_value[len("Bearer "):]
    return auth_value  # vrati ceo string ako nema "Bearer ", ili None ako kolačić ne postoji