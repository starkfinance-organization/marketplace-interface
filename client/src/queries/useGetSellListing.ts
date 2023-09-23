//** Libs */
import http from "@/utils/https";
import { useQuery } from "react-query";
import { BASE_API_V1, QUERY_KEY } from "./key";

export const useGetSellListing = (
  contract_address?: string,
  token_id?: string,
  signer?: string
) => {
  return useQuery<any>(
    [QUERY_KEY.GET_SELL_LISTING(contract_address, token_id, signer)],
    async () => {
      let url = `${BASE_API_V1}/nft/list`;

      if (contract_address && token_id) {
        url += `?contract_address=${encodeURIComponent(
          contract_address
        )}&token_id=${encodeURIComponent(token_id)}`;
      } else if (signer) {
        url += `?signer=${encodeURIComponent(signer)}`;
      } else if (contract_address) {
        url += `?contract_address=${encodeURIComponent(contract_address)}`;
      } else {
        throw new Error("Invalid request parameters");
      }
      const response = await http.get<any>(url, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    }
  );
};
