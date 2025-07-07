from typing import List, Union
from konovoapi.schemas.product import Product
from konovoapi.services.external_api_service import fetch_products
from konovoapi.services.product_service import process_products

items_per_page = 10

async def get_all_products_usecase(
        token:str, 
        category_id_param: Union[str, None] = None, 
        search_term_param:Union[str, None] = None, 
        page_number_param:Union[str, None] = None
    ) -> list[Product]:
    products_dict_list = await fetch_products(token)
    products: List[Product] = [Product.model_validate(item) for item in products_dict_list]
    
    if category_id_param:
        products = [
            p for p in products
            if p.sif_productcategory and p.sif_productcategory == category_id_param
        ]

    if search_term_param:
        search_lower = search_term_param.lower()
        products = [
            p for p in products
            if (p.product_name and search_lower in p.product_name.lower()) or
               (p.description and search_lower in p.description.lower())
        ]

    if page_number_param is not None and page_number_param.isdigit():
        page = int(page_number_param)
        if page > 0:
            start_index = (page - 1) * items_per_page
            end_index = start_index + items_per_page
            products = products[start_index:end_index]

    return process_products(products)

