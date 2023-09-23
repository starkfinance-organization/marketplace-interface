//** Libs */
import http from "@/utils/https";
import { useInfiniteQuery } from "react-query";

//** Constants */
import { isStrNullOrEmpty } from "@/utils/string";
import { QUERY_KEY, SC_URL } from "./key";

export const useGetCollectionNFTs = (
  contract_address: string,
  limit: number,
  cursor?: string
  // options?: UseQueryOptions<NFTResponse>
) => {
  return useInfiniteQuery<any>({
    queryKey: QUERY_KEY.SCAccountNFTs(contract_address),
    queryFn: async ({ pageParam }) => {
      let paramsValue: any = {
        limit: limit,
        cursor: pageParam || cursor,
      };

      if (!isStrNullOrEmpty(contract_address)) {
        paramsValue["contract_address"] = contract_address;
      }

      const response = await http.get<any>(`${SC_URL}/nfts`, {
        headers: { "x-api-key": import.meta.env.VITE_STARKSCAN_API },
        params: paramsValue,
      });

      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const searchParams = new URLSearchParams(lastPage.next_url);
      const cursor = searchParams.get("cursor");
      if (isStrNullOrEmpty(cursor)) {
        return false;
      }
      return cursor;
    },
  });
};
