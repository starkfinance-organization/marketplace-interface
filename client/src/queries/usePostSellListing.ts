import http from "@/utils/https";
import { useMutation } from "react-query";
import { BASE_API_V1 } from "./key";

export const usePostSellListing = () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json", // Replace with your desired content type
  };

  return useMutation(async (dataPost: any) => {
    const response = await http.post(`${BASE_API_V1}/nft/list`, dataPost, {
      headers,
    });

    return response.data;
  });
};

export default usePostSellListing;
