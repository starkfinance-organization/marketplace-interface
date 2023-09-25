import "./NFTCard.css";
import { useNavigate } from "react-router-dom";
import NFTBorder from "@/assets/svg/nft_bg.svg";

const NFTCardWithoutPrice: React.FC<{ nftData: any }> = ({ nftData }) => {
  const navigation = useNavigate();

  return (
    <div
      className=" w-full h-full p-[16px] border-[2px] border-[#24C3BC] bg-[#24C3BC]/10 overflow-hidden rounded-[10px] transition-all aspect-3/4  relative md:hover:scale-105 grid place-items-center cursor-pointer"
      onClick={() => {
        navigation(`/assets/${nftData.contract_address}/${nftData.token_id}`);
      }}
    >
      <div className="rounded-md h-full">
        <img
          src={nftData.image_medium_url}
          alt=""
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 py-2  bg-black/75 z-10 px-[32px]">
        <p className="text-[16px]  flex-1 text-center truncate">
          {nftData.name}
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

export default NFTCardWithoutPrice;
