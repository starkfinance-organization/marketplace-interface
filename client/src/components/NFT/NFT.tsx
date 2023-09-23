import BlankImage from "@/assets/png/default.jpg";
import ETHSVG from "@/assets/svg/eth.svg";
import "./NFTCard.css";
import { useNavigate } from "react-router-dom";
import { calculateTimeDifferenceList, getShortPrice } from "@/utils/string";
import NFTBorder from "@/assets/svg/nft_bg.svg";

const NFT: React.FC<{ nftData?: any }> = ({ nftData }) => {
  const navigation = useNavigate();

  return (
    <div
      className="w-full aspect-3/4 relative grid place-items-center transition-all hover:scale-105 cursor-pointer"
      onClick={() => {
        navigation(`/assets/${nftData.contract_address}/${nftData.token_id}`);
      }}
    >
      <img
        src={nftData?.image_url || BlankImage}
        alt=""
        className="rounded-lg h-[95%] w-[95%]"
      />

      <div className="absolute bottom-0 left-2 right-2 px-2 pb-6 bg-blur h-fit pt-2 m-1">
        <p className="font-bold text-center md:text-[14px] text-[10px]">
          {nftData?.name}
        </p>

        <div className="flex justify-end  items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="font-bold md:text-[18px] text-[14px]">
              {getShortPrice(nftData?.price) || "-"}
            </p>
            <img src={ETHSVG} alt="" className="h-5" />
          </div>
        </div>
        <div className=" h-fit w-full pr-2 text-[10px] text-end">
          <p>Sale End: {calculateTimeDifferenceList(nftData?.time_end)}</p>
        </div>
      </div>

      <img
        src={NFTBorder}
        alt=""
        className=" rounded-lg  absolute inset-0 h-full w-full z-10"
      />
    </div>
  );
};

export default NFT;
