import {
  calculateTimeDifference,
  calculateTimeDifferenceList,
  getShortAddress,
  getShortPrice,
} from "@/utils/string";
import { useNavigate } from "react-router-dom";

const convertStatus = (status: string) => {
  switch (status) {
    case "SELL": {
      return "List";
    }
    case "BUYING": {
      return "Transfer";
    }
    case "SALE": {
      return "Sale";
    }
    default: {
      return "List";
    }
  }
};

const RowNFTActivity: React.FC<{ data: any; index: number }> = ({
  data,
  index,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/assets/${data.contract_address}/${data.token_id}`);
  };

  const handleGotoProfile = () => {
    navigate(`/account/${data.signer}`);
  };

  return (
    <div className=" w-full flex-1 text-xl max-md:text-sm bg-transparent border-gray-800 ">
      <div className="flex items-center ">
        {/* <p className="ml-4 ">{data.name}</p> */}
        <div className="flex flex-1 py-[15px] w-full items-center pr-6 ">
          <img
            src={data?.image_url}
            alt=""
            className="h-[50px] aspect-square rounded-md object-cover border-[#24C3BC] border"
          />
          <div className="flex flex-col ml-[15px]">
            <p className="truncate max-w-[130px]" onClick={handleClick}>
              {data.name}
            </p>
            <p
              className="text-base font-normal text-[#24C3BC]"
              onClick={handleGotoProfile}
            >
              {getShortAddress(data.signer)}
            </p>
          </div>
        </div>
        <div className="text-end">
          <div className="text-sm">{convertStatus(data?.status)}</div>
          <div className="text-[#24C3BC]">{getShortPrice(data.price)} ETH</div>
          <div className="text-sm">
            {calculateTimeDifferenceList(data.update_at)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RowNFTActivity;
