import { MdKeyboardArrowDown } from "react-icons/md";
import NFTDemoPNG from "@/assets/png/nftDemo.png";
import Button2 from "@/components/Button/Button2";

const NFTDetail = () => {
  return (
    <div className="flex gap-20 w-full mt-6">
      <div className="flex-1">
        <p className="text-[24px] font-bold">Choose a type of sale</p>
        <div className="mt-4 flex py-5 px-8 bg-[#1A1B1F] rounded-md">
          <div>
            <p className="font-bold text-[24px]">Fixed price</p>
            <p className="text-[20px] text-base">
              The item is listed at the price you set
            </p>
          </div>
        </div>
        <div className="mt-4 flex py-5 px-8 bg-[#1A1B1F] rounded-md">
          <div>
            <p className="font-bold text-[24px]">Timed auction</p>
            <p className="text-[20px] text-base">
              The item is listed for auction
            </p>
          </div>
        </div>

        <p className="text-[24px] mt-10 font-bold">Set a price</p>
        <div className="flex gap-5 mt-6">
          <div className="py-2 flex-1 bg-[#1A1B1F] rounded-md flex flex-col items-center">
            <p className="text-[24px] font-bold">Floor</p>
            <p className="text-[20px]">0.01 ETH</p>
          </div>
          <div className="py-2 flex-1 bg-[#1A1B1F] rounded-md flex flex-col items-center">
            <p className="text-[24px] font-bold">Top trait</p>
            <p className="text-[20px]">0,02 ETH</p>
          </div>
        </div>

        <div className="mt-4 flex py-5 px-8 bg-[#1A1B1F] rounded-md">
          <p className="font-bold flex-1 text-[24px]">Amount</p>
          <div className="flex gap-3 items-center">
            <p className="text-[20px] font-bold">ETH</p>
            <MdKeyboardArrowDown className="text-[20px]" />
          </div>
        </div>
        <p className="text-[24px] mt-10 font-bold">Duration</p>
        <div className="mt-6 flex-1 py-5 px-8 bg-[#1A1B1F] rounded-md">
          <p className="text-[24px] font-bold">1 month</p>
        </div>

        <div className="">
          <p className="text-[24px] mt-20 font-bold">Summary</p>
          <div className="flex justify-between mt-5">
            <p className="text-[20px] font-light">Listing price</p>
            <p className="text-[20px]">-- ETH</p>
          </div>
          <div className="flex mt-4 justify-between">
            <p className="text-[20px] font-light">Creator earning</p>
            <p className="text-[20px]">0%</p>
          </div>

          <div className="h-[2px] mt-10 w-full bg-white"></div>

          <div className="flex mt-4 justify-between">
            <p className="text-[24px] font-bold">Total potential earnings</p>
            <p className="text-[24px] font-bold">-- ETH</p>
          </div>

          <Button2 title="Complete listing" className="h-[60px] mt-10" />
        </div>
      </div>
      <div className="flex-1">
        <img src={NFTDemoPNG} alt="" />

        <p className="text-[24px] mt-10 font-bold">Description</p>

        <p className="font-bold text-[15px] mt-10">By Starksport</p>
        <p className=" text-[12px]">The item is listed at the price you set</p>

        <p className="text-[24px] mt-10 font-bold">Traits</p>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
            <div className="flex flex-col items-center bg-traits-card py-3 rounded-md">
              <p className="uppercase">body</p>
              <p className="uppercase text-[12px]">light 9%</p>
            </div>
          ))}
        </div>

        <p className="text-[24px] mt-10 font-bold">Details</p>

        <div className="mt-5">
          <div className="flex justify-between">
            <p className="font-normal">Contract Address</p>
            <p>0x9e03......034</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="font-normal">Token ID</p>
            <p>3758</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="font-normal">Token Standard</p>
            <p>ERC</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="font-normal">Creator Earning</p>
            <p>0%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
