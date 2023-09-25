import {
  calculateTimeDifferenceList,
  getShortAddress,
  getShortPrice,
} from "@/utils/string";
import { useNavigate } from "react-router-dom";

const RowNFT: React.FC<{ data: any; index: number }> = ({ data, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (data?.collection_address !== undefined)
      navigate(`/assets/${data.collection_address}/${data.token_id}`);
    else {
      navigate(`/assets/${data.contract_address}/${data.token_id}`);
    }
  };
  return (
    <tr
      onClick={handleClick}
      className="px-9 py-3 h-full font-semibold text-base bg-transparent border-gray-800 hover:bg-blue-800 cursor-pointer"
    >
      <td className=" text-center text-[16px] font-bold px-2">
        {/* <p>{getShortPrice(data.price) || "-"} ETH</p> */}
        <p>0.1100 ETH</p>
      </td>
      <td className="text-center text-[16px] font-bold">
        <p>$170,01</p>
      </td>
      <td className=" text-center text-[16px] font-bold">
        <p>1</p>
      </td>
      <td className="text-center text-[16px] font-bold">
        <p>in 23 hours</p>
      </td>
      <td className=" px-2 text-center text-[16px] font-bold text-[#24C3BC]">
        {/* <p>{getShortAddress(data.owner)}</p> */}
        <p>00x898787</p>
      </td>
      <td className="flex justify-center items-center py-2">
        <button
          onClick={() => {}}
          className="font-bold text-xl max-md:text-sm uppercase bg-[#24C3BC] px-[30px] py-2 rounded-[10px]"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default RowNFT;
