import BlankImage from "@/assets/png/default.jpg";
import "./NFTCard.css";
import { useNavigate } from "react-router-dom";

const NFTTabAll: React.FC<{ nftData?: any }> = ({ nftData }) => {
  const navigation = useNavigate();

  return (
    <div
      className=" card-bg w-full aspect-3/4 relative transition-all hover:scale-105 cursor-pointer"
      onClick={() => {
        navigation(`/assets/${nftData.contract_address}/${nftData.token_id}`);
      }}
    >
      <img
        src={nftData?.image_url || BlankImage}
        alt=""
        className="h-full w-full rounded-lg "
      />

      <div className="absolute bottom-0 left-0 right-0 px-2 md:py-4 py-2 bg-blur bg-blue-800/70">
        <div className="flex justify-center items-center">
          <div>
            <p className="font-bold text-[18fpx] text-center truncate  ">
              {nftData?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTTabAll;
