//** Libs */
import http from "@/utils/https";
import { useInfiniteQuery } from "react-query";

//** Constants */
import { filterEmptyQueryParams } from "@/utils/helper";
import { BASE_API_FINANCE, QUERY_KEY } from "./key";
import { ItemResponse, ListingResponse } from "./activity/type";

export const useGetFilterListingOwner = (
  limit: number,
  signer?: string
  // options?: UseQueryOptions<NFTResponse>
) => {
  return useInfiniteQuery<ListingResponse<ItemResponse[]>>({
    queryKey: QUERY_KEY.ACTIVITY(signer || ""),
    queryFn: async ({ pageParam = 1 }) => {
      let paramsValue: any = filterEmptyQueryParams({
        page: pageParam,
        signer,
      });

      const response = await http.get<ListingResponse<ItemResponse[]>>(
        `${BASE_API_FINANCE}/nft/filter`,
        {
          // headers: { "x-api-key": import.meta.env.VITE_STARKSCAN_API },
          params: paramsValue,
        }
      );

      return response.data;
    },
    enabled: !!signer && !!limit,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages < lastPage.nextPage) {
        return undefined;
      }

      return lastPage.nextPage;
    },
  });
};
