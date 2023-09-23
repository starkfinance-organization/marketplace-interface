//** Libs */
import http from "@/utils/https";
import { useMutation } from "react-query";
import { BASE_API_V1 } from "./key";

//** Constants */

export const useGetSellListingMutation = () => {
  return useMutation(async (params: { signer: string }) => {
    let url = `${BASE_API_V1}/nft/listing-owner?owner_address=${params.signer}`;

    const response = await http.get<any>(url, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  });
};
