import http from "@/utils/https";
import { useQuery } from "react-query";
import { BASE_API_V1 } from "./key";

export const useGetAllOffersForNFT = (contract_address: any, token_id: any) => {
    return useQuery(['nftOffers', contract_address, token_id], async () => {
        let url = `${BASE_API_V1}/nft/offers?contract_address=${contract_address}&token_id=${token_id}`;

        const response = await http.get<any>(url, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data;
    });
};
