import { getShortPrice } from "@/utils/string";
import { useNavigate } from "react-router-dom";

const CardNFT: React.FC<{ nftData: any; style: any }> = ({
  nftData,
  style,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (nftData?.collection_address === undefined)
      navigate(`/assets/${nftData.collection_address}/${nftData.token_id}`);
    else {
      navigate(`/assets/${nftData.contract_address}/${nftData.token_id}`);
    }
  };

  return (
    <div
      className="border border-gray-700 rounded-md pb-2 cursor-pointer h-full"
      onClick={handleClick}
    >
      <div>
        <img
          src={nftData.image_url}
          alt=""
          className="rounded-md aspect-square w-full"
        />
      </div>
      <p className="text-[14px] px-3 font-medium mt-3">{nftData.name}</p>
      <div
        className={`flex mx-3 items-center mt-1 ${style == 3 && "text-[14px]"}`}
      >
        <p className="font-bold text-white">
          {getShortPrice(nftData.price) || "-"}
        </p>
      </div>

      <div
        className={`flex mx-3 items-center mt-1 text-gray-400 ${
          style == 3 && "text-[12px]"
        }`}
      >
        <p>Last Sale:</p>
        <p className="font-bold ml-1 ">
          {getShortPrice(nftData.last_sale) || "-"}
        </p>
      </div>
    </div>
  );
};

export default CardNFT;
