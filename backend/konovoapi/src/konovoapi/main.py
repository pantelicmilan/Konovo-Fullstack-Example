from typing import Union
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from konovoapi.middlewares import global_exception_handler
from konovoapi.schemas.login_input import LoginInput
from konovoapi.services.product_service import process_product
from konovoapi.usecases.get_all_categories_usecase import get_all_categories_usecase
from konovoapi.usecases.get_all_products_usecase import get_all_products_usecase
from konovoapi.usecases.login_usecase import login
from konovoapi.usecases.get_product_by_id_usecase import get_product_by_id_usecase
from fastapi.middleware.cors import CORSMiddleware

async def lifespan(app: FastAPI):
    try:
        categories = await get_all_categories_usecase()
        app.state.cached_categories = categories
    except Exception as e:
        app.state.cached_categories = []
    yield

app = FastAPI(lifespan = lifespan)

origins = [
    "http://localhost:5173", 
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ili ["*"] da dozvoliš sve
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.middleware("http")(global_exception_handler)
bearer_scheme = HTTPBearer()

@app.post("/login")
async def read_root(input: LoginInput):
    token = await login(input.username, input.password)
    return {"access_token": token}

@app.get("/products")
async def get_products(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme), 
    category_id: Union[str, None] = None, 
    search_term: Union[str, None] = None, 
    page_number = Union[str, None]
):
    token = credentials.credentials
    return await get_all_products_usecase(token, category_id, search_term, page_number)

@app.get("/products/{product_id}")
async def get_product_by_id(
    product_id: str, 
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
):
    token = credentials.credentials
    product = await get_product_by_id_usecase(product_id, token)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    modified_product = process_product(product)    
    return modified_product

@app.get("/categories")
async def get_categories():
    if not app.state.cached_categories:
        raise HTTPException(status_code=404, detail="No categories found")
    return app.state.cached_categories