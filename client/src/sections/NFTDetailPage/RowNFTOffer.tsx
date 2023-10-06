import {
  calculateTimeDifferenceList,
  getShortAddress,
  getShortPrice,
} from "@/utils/string";
import { useNavigate } from "react-router-dom";

const RowNFTOffer: React.FC<{ data: any; index: number }> = ({
  data,
  index,
}) => {
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
      className="font-semibold text-base bg-transparent border-gray-800 hover:bg-blue-800 cursor-pointer"
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
      <td className="flex justify-end items-center py-2 gap-[10px] pr-[30px]">
        <button
          onClick={() => {}}
          className="font-bold max-md:text-sm uppercase bg-[#24C3BC] px-[30px] py-2 rounded-[10px]"
        >
          Counter
        </button>
        <button
          onClick={() => {}}
          className="font-bold max-md:text-sm uppercase bg-[#24C3BC] px-[30px] py-2 rounded-[10px]"
        >
          Accept
        </button>
      </td>
    </tr>
  );
};
export default RowNFTOffer;
