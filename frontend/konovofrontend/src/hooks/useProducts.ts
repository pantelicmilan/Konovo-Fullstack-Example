import { useQuery } from "@tanstack/react-query";
import { getProductsEndpoint } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useProducts(searchTerm, categoryId, pageNumber) {
    const navigator = useNavigate();

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
              
            }
          },
        staleTime: 1000 * 60 * 5
      });
}
