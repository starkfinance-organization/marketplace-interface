import "./NFTCard.css";
import { useNavigate } from "react-router-dom";
import { getShortAddress, getShortPrice } from "@/utils/string";
import NFTBorder from "@/assets/svg/nft_bg.svg";
import ETHCircle from "@/assets/svg/ic_eth.svg";

const NFTCard: React.FC<{ nftData: any }> = ({ nftData }) => {
  const navigation = useNavigate();

  return (
    <div
      className=" rounded-lg w-full transition-all border-[4px] border-[#24C3BC] aspect-3/4 bg-[#24C3BC]/10 relative md:hover:scale-105 grid place-items-center cursor-pointer"
      onClick={() => {
        navigation(`collection/${nftData.contract_address}`);
      }}
    >
      <img
        src={nftData.image}
        alt=""
        className="h-[95%] w-[95%] object-cover rounded-lg"
      />

      <div className="absolute bottom-0 left-0 right-0 pt-3 pb-6  bg-black/75 z-10 px-[32px]">
        <p className="font-bold text-[18px] text-[#24C3BC] flex-1 uppercase">
          {nftData.name}
        </p>
        <div className="w-full flex  text-[14px]  items-center justify-between flex-1">
          <p className="text-white">Volume</p>
          <div className="flex">
            <p>{getShortPrice(nftData.volume) || "-"}</p>
            <img src={ETHCircle} alt="" className="ml-2" />
          </div>
        </div>

        <div className="w-full flex text-[14px]  items-center justify-between flex-1">
          <p className="text-white">Floor Price</p>
          <div className="flex">
            <p>{getShortPrice(nftData.floor_price) || "-"}</p>
            <img src={ETHCircle} alt="" className="ml-2" />
          </div>
        </div>

        <p className="text-end mt-1">
          By {getShortAddress(nftData.contract_address)}
        </p>
      </div>

      {/* <img
        src={NFTBorder}
        alt=""
        className=" rounded-lg  absolute inset-0 h-full w-full z-10"
      /> */}
    </div>
  );
};

export default NFTCard;
