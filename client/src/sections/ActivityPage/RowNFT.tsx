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
      className=" font-semibold text-base bg-transparent border-gray-800 hover:bg-blue-800 cursor-pointer"
    >
      <td className="text-center">{index}</td>
      <td className="flex py-2 items-center px-6">
        <img
          src={data?.image_url}
          alt=""
          className="h-10 aspect-square rounded-full object-cover"
        />
        <p className="ml-4">{data.name}</p>
      </td>
      <td>
        <div className="flex">
          <p>{getShortPrice(data.price) || "-"} ETH</p>
        </div>
      </td>

      <td>{getShortAddress(data.signer) || "-"}</td>
      <td className="text-end pr-4">
        {calculateTimeDifferenceList(data.created_at)}
      </td>
    </tr>
  );
};
export default RowNFT;
