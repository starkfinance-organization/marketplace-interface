import BlankImage from "@/assets/png/default.jpg";
import "./NFTCard.css";
import { useNavigate } from "react-router-dom";
import { getShortPrice } from "@/utils/string";

const NFTTopVolume: React.FC<{ nftData?: any }> = ({ nftData }) => {
  const navigation = useNavigate();

  return (
    <div
      className=" w-full min-w-[225px] aspect-[9/10] relative grid place-items-center transition-all hover:scale-105 cursor-pointer rounded-[11px] overflow-hidden"
      onClick={() => {
        navigation(`/collection/${nftData.contract_address}`);
      }}
    >
      <img
        src={nftData?.image || BlankImage}
        alt=""
        className="rounded-lg w-full h-full"
      />
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 bg-[#0B3575]/80 h-fit pt-3">
        <p className="font-extrabold text-[14px] truncate">{nftData?.name}</p>

        <div className="flex justify-between items-center gap-2">
          <div>
            <p className="font-semibold text-[10px]">Floor</p>
            <p className="font-extrabold text-[12px]">
              {getShortPrice(nftData?.price) || "-"} ETH
            </p>
          </div>
          <div>
            <p className="font-semibold text-[10px]">24h volume</p>
            <p className="font-extrabold text-[12px]">
              {getShortPrice(nftData?.price) || "-"} ETH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTTopVolume;
