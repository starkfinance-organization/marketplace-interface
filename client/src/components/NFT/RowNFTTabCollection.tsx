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

const RowNFTTabCollection: React.FC<{ data: any; index: number }> = ({
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
    <tr className="max-md:text-sm bg-transparent border-gray-800 hover:bg-gray-700/30 cursor-pointer">
      <td className="pl-[20px]">
        <p className="">{convertStatus(data?.status)}</p>
      </td>
      <td className="flex py-[15px] items-center pr-6 ">
        <img
          src={data?.image_url}
          alt=""
          className="h-10 aspect-square rounded-md border border-[#24C3BC] object-cover"
        />
        {/* <p className="ml-4 ">{data.name}</p> */}
        <div className="flex flex-col ml-[15px]" onClick={handleClick}>
          <p className="">{data?.name}</p>
          {/* <p className="text-base max-md:text-xs font-normal">Starksport</p> */}
        </div>
      </td>

      <td className="">{getShortPrice(data.price)} ETH</td>
      <td className="text-[#24C3BC]" onClick={handleGotoProfile}>
        {getShortAddress(data?.signer)}
      </td>
      <td className="text-[#24C3BC] max-md:text-sm">-</td>
      <td className="pr-[15px]">
        {calculateTimeDifferenceList(data.update_at)}
      </td>
    </tr>
  );
};
export default RowNFTTabCollection;
