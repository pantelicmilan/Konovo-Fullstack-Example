import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCategoriesEndpoint } from "../config";

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
          const res = await axios.get(getCategoriesEndpoint, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          return res.data;
        },
        staleTime: 1000 * 60 * 60,
      })
}