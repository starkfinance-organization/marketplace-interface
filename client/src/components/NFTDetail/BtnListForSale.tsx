import ListingNFT from "@/sections/NFTDetailPage/ListingNFT";
import { useInforListingContext } from "@/sections/NFTDetailPage/context";
import { useAccount } from "@starknet-react/core";
import React, { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";

const BtnListForSale: React.FC<{ setIsListForSale: any; nftData: any }> = ({
  setIsListForSale,
  nftData,
}) => {
   

  return (
    <div>
      <div
        className="flex items-center mb-[30px] gap-[20px] cursor-pointer font-bold"
        onClick={() => setIsListForSale(false)}
      >
        <FaChevronLeft className="text-[24px]" />
        <p className="text-[32px] text-[#24C3BC]">List For Sale</p>
      </div>

      <ListingNFT nftData={nftData} />
    </div>
  );
};
export default BtnListForSale;
