import {
  calculateTimeDifferenceList,
  getShortAddress,
  getShortPrice,
  getShortPrice3,
} from "@/utils/string";
import { useNavigate } from "react-router-dom";

const RowNFT: React.FC<{ data: any; index: number }> = ({ data, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/collection/${data?.contract_address}`);
  };
  return (
    <tr
      onClick={handleClick}
      className=" font-semibold text-base bg-transparent border-gray-800 hover:bg-gray-800/20 cursor-pointer"
    >
      <td className="text-center font-extrabold">{index}</td>
      <td className="flex py-2 items-center px-6">
        <img
          src={data?.image}
          alt=""
          className="h-10 aspect-square rounded-md border border-[#24C3BC] object-cover"
        />
        <p className="ml-4  font-extrabold">{data.name}</p>
      </td>
      <td className="text-left  ">
        <p>{getShortPrice3(data.floor_price) || "-"} ETH</p>
      </td>

      <td className="text-right ">{getShortPrice3(data.volume) || "-"} ETH</td>
    </tr>
  );
};
export default RowNFT;
