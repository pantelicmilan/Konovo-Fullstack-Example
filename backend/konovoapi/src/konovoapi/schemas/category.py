from typing import Union
from pydantic import BaseModel, Field

class Category(BaseModel):
    category_name: Union[str, None] = Field(alias = "categoryName")
    sif_productcategory: Union[str, None]
