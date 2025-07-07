const apiBaseUrl = "http://127.0.0.1:8000";
export const getProductsEndpoint = `${apiBaseUrl}/products`
export function getSpecificProductEndpoint(productId:string) : string {
    return `${getProductsEndpoint}/${productId}`
}
export const getLoginEndpoint = `${apiBaseUrl}/login`
export const getCategoriesEndpoint = `${apiBaseUrl}/categories`
