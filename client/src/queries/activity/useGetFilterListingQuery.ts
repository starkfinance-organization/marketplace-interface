//** Libs */
import http from "@/utils/https";
import { useInfiniteQuery } from "react-query";

//** Constants */
import { filterEmptyQueryParams } from "@/utils/helper";
import { ItemResponse, ListingResponse } from "./type";
import { BASE_API_FINANCE, QUERY_KEY } from "../key";

const convertStatus = (status: string): string => {
  if (status == "") return "";
  switch (status) {
    case "Sale": {
      return "SALE";
    }
    case "Offer": {
      return "OFFER";
    }
    case "Listing": {
      return "LISTING";
    }
    default: {
      return "SELL";
    }
  }
};

export const useGetFilterListingQuery = (
  limit: number,
  token_id?: string,
  type?: number,
  contract_address?: string,
  name?: string,
  status?: string
  // options?: UseQueryOptions<NFTResponse>
) => {
  return useInfiniteQuery<ListingResponse<ItemResponse[]>>({
    queryKey: QUERY_KEY.ACTIVITY(
      contract_address || "",
      status || "",
      type || 1,
      name || ""
    ),
    queryFn: async ({ pageParam = 1 }) => {
      let paramsValue: any = filterEmptyQueryParams({
        page: pageParam,
        token_id,
        type,
        limit,
        contract_address,
        name,
        status: convertStatus(status || ""),
      });

      const response = await http.get<ListingResponse<ItemResponse[]>>(
        `${BASE_API_FINANCE}/nft/filter`,
        {
          params: paramsValue,
        }
      );

      return response.data;
    },
    enabled: !!limit,
    getNextPageParam: (lastPage) => {
      if (lastPage?.totalPages < lastPage.nextPage) {
        return undefined;
      }

      return lastPage.nextPage;
    },
  });
};
