import http from "@/utils/https";
import { useQuery } from "react-query";
import { BASE_API_V1 } from "./key";

export const useGetAllOffersBySigner = (signer: any) => {
    return useQuery(['nftOffersBySigner', signer], async () => {
        let url = `${BASE_API_V1}/nft/offers/signer?signer=${signer}`;

        const response = await http.get<any>(url, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data;
    });
};
