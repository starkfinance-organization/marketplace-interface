//** Libs */
import http from "@/utils/https";
import { UseQueryOptions, useQuery } from "react-query";
import { BASE_API_FINANCE, QUERY_KEY } from "./key";

export const useGetCollectionsDetail = (
  contractAddress: string,
  options?: UseQueryOptions<any>
) => {
  return useQuery<any>(
    QUERY_KEY.COLLECTION_DETAIL(contractAddress),
    async () => {
      const response = await http.get<any>(
        `${BASE_API_FINANCE}/collection/${contractAddress}`
      );

      return response.data;
    },
    {
      ...options,
    }
  );
};
