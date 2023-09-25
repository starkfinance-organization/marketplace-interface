//** Libs */
import http from "@/utils/https";
import { UseQueryOptions, useQuery } from "react-query";
import { QUERY_KEY, SC_URL } from "./key";

//** Constants */

export const useGetActionNFT = (
  address: string,
  id?: string,
  options?: UseQueryOptions<any>
) => {
  let params = {
    nft_contract_address: address,
    nft_token_id: id,
  };
  return useQuery<any>(
    QUERY_KEY.SCActivity(address, id || ""),
    async () => {
      // const response = await http.get<any>(`${SC_API_BASE_URL_V0}/nft-events`, {
      //   params,
      // });

      const response = await http.get<any>(`${SC_URL}/nft-events`,
      {
        headers: { "x-api-key": import.meta.env.VITE_STARKSCAN_API },
        params
      })

      return response.data;
    },
    {
      ...options,
    }
  );
};
