import { useNavigate } from "react-router-dom";
import SVGETH from "@/assets/svg/Ethereum.svg";
import { getShortPrice } from "@/utils/string";

const NFTV2: React.FC<{ nftData: any }> = ({ nftData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/assets/${nftData.contract_address}/${nftData.token_id}`);
  };

  return (
    <div
      className="pb-1 border  rounded-md overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={nftData?.image_url}
        alt=""
        className="w-full aspect-square rounded-t-md transition-all hover:scale-105"
      />
      <div className="p-3">
        <p className="text-lg font-semibold">{nftData?.name}</p>
        <p className="text-gray-500">#{nftData?.token_id}</p>
        {nftData?.price && (
          <div className="flex mt-2">
            <p className="font-semibold mr-1">Price: </p>
            <p>{getShortPrice(nftData?.price)}</p>
            <img src={SVGETH} alt="" className="h-7" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTV2;
