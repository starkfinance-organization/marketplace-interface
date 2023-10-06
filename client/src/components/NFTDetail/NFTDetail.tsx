import { getShortAddress } from "@/utils/string";
import { useNavigate } from "react-router";

const NFTDetail: React.FC<{ nftData: any }> = ({ nftData }) => {
  const navigate = useNavigate();

  const handleGotoCollection = () => {
    navigate(`/collection/${nftData?.contract_address}`);
  };
  return (
    <>
      <p className="text-[32px] mt-8 font-bold text-[#24C3BC]">Details</p>
      <div className="mt-3">
        <div className="w-full flex justify-between items-center mb-4">
          <p className="text-[15px]  text-">Contract Address</p>
          <p
            className="text-[15px]  text-[#24C3BC] cursor-pointer"
            onClick={handleGotoCollection}
          >
            {getShortAddress(nftData?.contract_address || "")}
          </p>
        </div>
        <div className="w-full flex justify-between items-center mb-4">
          <p className="text-[15px]  text-">Token ID</p>
          <p className="text-[15px]  text-">{nftData?.token_id}</p>
        </div>
      </div>
    </>
  );
};
export default NFTDetail;
