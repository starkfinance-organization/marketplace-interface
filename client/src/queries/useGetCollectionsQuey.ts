//** Libs */
import http from "@/utils/https";
import { UseQueryOptions, useQuery } from "react-query";
import { BASE_API_FINANCE, QUERY_KEY } from "./key";

export const useGetCollections = (options?: UseQueryOptions<any>) => {
  return useQuery<any>(
    QUERY_KEY.COLLECTION,
    async () => {
      const response = await http.get<any>(`${BASE_API_FINANCE}/collection`);

      return response.data;
    },
    {
      ...options,
    }
  );
};
