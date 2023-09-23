//** Libs */
import http from "@/utils/https";
import { UseQueryOptions, useQuery } from "react-query";
import { QUERY_KEY, SC_URL } from "./key";

export const useGetNFT = (
  contract_address: string,
  id: string,
  options?: UseQueryOptions<any>
) => {
  return useQuery<any>(
    QUERY_KEY.SCNFT(contract_address, id),
    async () => {
      const response = await http.get<any>(
        `${SC_URL}/nft/${contract_address}/${id}`,
        {
          headers: { "x-api-key": import.meta.env.VITE_STARKSCAN_API },
        }
      );

      return response.data;
    },
    {
      ...options,
    }
  );
};
