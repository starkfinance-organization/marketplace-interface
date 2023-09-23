import NFT from "@/assets/png/nft_demo_1.png";
import { useNavigate } from "react-router-dom";
import { getShortPrice3 } from "@/utils/string";

const CollectionCard = ({ data }: { data: any }) => {
  const navigation = useNavigate();

  return (
    <button
      onClick={() => navigation(`/collection/${data.contract_address}`)}
      className="overflow-hidden w-full duration-700 rounded-lg bg-gray-900 "
    >
      <div className="overflow-hidden">
        <img
          src={data.image || NFT}
          className="aspect-square w-full object-cover transition-all hover:scale-110 "
          alt=""
        />
      </div>
      <div className="px-4 py-4 ">
        <p className="flex-1 mt-2 mb-4 text-center truncate  text-2xl font-semibold">
          {data.name}
        </p>
        <div className="flex justify-around">
          <div className="text-lg text-left ">
            <p className="text-slate-500">Volume</p>
            <p className="font-semibold text-lg">
              {getShortPrice3(data.volume)}
            </p>
          </div>
          <div className="text-lg text-left">
            <p className="text-slate-500">Price</p>
            <p className="font-semibold  text-lg">{`${
              data.floor_price ?? "-"
            } ETH`}</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CollectionCard;
