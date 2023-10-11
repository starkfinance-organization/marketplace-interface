import http from "@/utils/https";
import { useMutation } from "react-query";
import { BASE_API_V1 } from "./key";

export const usePutAcceptOffer = () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json", // Replace with your desired content type
  };

  return useMutation(async (bodyData: any) => {
    const response = await http.put<any>(`${BASE_API_V1}/nft/accept-offer`, bodyData, {
      headers,
    });

    return response.data;
  });
};

export default usePutAcceptOffer;
