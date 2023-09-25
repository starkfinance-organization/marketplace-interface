import ChainIcon from "@/assets/svg/ic_chain.svg";
import { getShortAddress, isSameAddress } from "@/utils/string";
import React from "react";

const NFTInfo: React.FC<{ nftData: any; owner: any }> = ({
  nftData,
  owner,
}) => {
  return (
    <div >
      <p className="text-[32px] font-extrabold text-[#24C3BC] break-words">
        {nftData?.name} #{nftData?.token_id}
      </p>
      <p className="text-[20px] my-3 font-bold">Starksport</p>
      <div className="flex md:gap-[30px] gap-3 md:flex-row flex-col">
        <div className="flex gap-1 ">
          <p className="">Owner by</p>
          <p className=" text-[#24C3BC]">
            {owner ? "You" : getShortAddress(nftData?.balance?.owner_address)}
          </p>
        </div>
        {/* <div className="flex gap-3 items-center ">
                <img src={ChainIcon} alt="" />
                <p className="text-2xl text-[#24C3BC]">
                    {getShortAddress(nftData?.balance?.owner_address)}
                </p>
            </div> */}
      </div>
    </div>
  );
};

export default NFTInfo;
