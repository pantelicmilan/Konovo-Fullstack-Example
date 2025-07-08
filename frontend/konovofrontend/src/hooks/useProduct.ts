import { useQuery } from "@tanstack/react-query";
import { getSpecificProductEndpoint } from "../config";
import axios from "axios";
import { useToastProvider } from "../ToastProvider";
import { useNavigate } from "react-router-dom";

export function useProduct(id){
    const {publishError} = useToastProvider();
    const navigate = useNavigate();
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
          try{
            const res = await axios.get(getSpecificProductEndpoint(id), {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            });
            return res.data;
          }catch(e){
            if(e.response.status == 401 || e.response.status == 403){
              localStorage.removeItem("accessToken");
              navigate("/login")
            }
    
            if(e.response.status == 404){
              publishError("Proizvod nije pronadjen pa smo te preusmerili na stranicu svih proizvoda");
              navigate("/products")
            }

            throw e;
          }
        },  
        staleTime: 1000 * 60 * 60,

    })
}