import { calculateTimeDifference, removeZeros } from "@/utils/string";
import { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";

const NFTCurrentPrice: React.FC<{ nftData: any }> = ({ nftData }) => {
  const [count, setCount] = useState(0);
  console.log(nftData);
  return (
    <div className="w-full bg-[#24C3BC]/10 px-7 border border-[#24C3BC]  pb-6 pt-4 rounded-xl">
      <div className="flex justify-between items-end">
        <div>
          <p>Current Price</p>
          <div className="flex gap-2 items-center my-1">
            <p className="text-2xl font-bold text-[#24C3BC]">
              {removeZeros(nftData?.price)} ETH
            </p>
          </div>
          <p>Sale ends: {calculateTimeDifference(nftData?.time_end)}</p>
        </div>
        {/* <div className="flex border border-[#24C3BC] rounded-md">
          <button className="cursor-pointer px-3 py-3 bg-[#353243] rounded-s-md">
            <AiOutlineMinus className="text-white text-sm" />
          </button>
          <p className="px-5 py-3 bg-[#353243]">{count}</p>
          <button className="cursor-pointer px-3 py-3 bg-[#353243] rounded-e-md">
            <AiOutlineMinus className="text-white text-sm" />
          </button>
        </div> */}
      </div>
    </div>
  );
};
export default NFTCurrentPrice;
