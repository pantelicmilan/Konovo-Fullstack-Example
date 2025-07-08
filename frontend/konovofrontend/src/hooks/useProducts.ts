import { useQuery } from "@tanstack/react-query";
import { getProductsEndpoint } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToastProvider } from "../ToastProvider";

export function useProducts(searchTerm, categoryId, pageNumber) {
    const navigator = useNavigate();
    const {publishError} = useToastProvider();

    return useQuery({
        queryKey: ["products", { searchTerm, categoryId, pageNumber }],
        queryFn:async () => {
            try{
              let res = await axios.get(
                getProductsEndpoint,
                {
                  headers:{
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                  },
                  params: {
                    page_number: pageNumber,
                    ...(searchTerm ? { search_term: searchTerm } : {}),
                    ...(categoryId ? { category_id: categoryId } : {}),
                  },
                }
              )
              console.log("ovo je"+res)
              console.log(res)
              return res.data;
        
            }catch(error){
              if(error.response.status == 401 || error.response.status == 403){
                  localStorage.removeItem("accessToken");
                  navigator("/login")
              }

              if(error.response.status == 404){
                  publishError("Greska 404 za dohvatanje proizvoda, pokusajte kasnije");
                  return []
              }
              
            }
          },
        staleTime: 1000 * 60 * 5
      });
}
