//** Libs */
import http from "@/utils/https";
import { useMutation, useQuery } from "react-query";

//** Constants */
import { BASE_API_V1, QUERY_KEY } from "./key";

export const usePostOfferRecord = () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json", // Replace with your desired content type
  };

  return useMutation(async (dataPost: any) => {
    const response = await http.post(
      `${BASE_API_V1}/nft/offer`,
      dataPost,
      {
        headers,
      }
    );

    return response.data;
  });
};

export default usePostOfferRecord;