from typing import Union
from pydantic import BaseModel, Field, field_validator


class Product(BaseModel):
    product_name:Union[str, None] = Field(alias = "naziv")
    sku: Union[str, None]
    ean: Union[str, None]
    price: Union[float, None]
    vat: Union[str, None]
    stock: Union[str, None]
    description: Union[str, None]
    imgsrc: Union[str, None]
    sif_productcategory: Union[str, None]
    sif_productbrand: Union[str, None]
    sif_product: Union[str, None]
    category_name: Union[str, None] = Field(alias = "categoryName")
    brand_name: Union[str, None] = Field(alias = "brandName")
    
    @field_validator('price')
    @classmethod
    def round_price(cls, v):
        if v is None:
            return v
        return round(v, 2)