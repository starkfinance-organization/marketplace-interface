import {
  calculateTimeDifferenceList,
  convertTimestampToDate,
  convertTimestampToTime,
  convertWeiToEther,
  getShortAddress,
  getShortPrice,
} from "@/utils/string";
import { useNavigate } from "react-router-dom";

const RowActivity: React.FC<{ data: any; index: number }> = ({
  data,
  index,
}) => {
  const navigate = useNavigate();

  const openNewWindow = (url: string) => {
    // Specify the URL you want to open in the new window/tab

    // Define the window features (e.g., size, scrollbars, etc.)
    const windowFeatures = "width=600,height=400";

    // Open the new window/tab
    window.open(url, "_blank", windowFeatures);
  };

  return (
    <tr
      onClick={() => {
        openNewWindow(`https://starkscan.co/tx/${data?.transaction_hash}`);
      }}
      className=" font-semibold text-base bg-transparent border-gray-800 hover:bg-blue-800 cursor-pointer"
    >
      <td className="text-center text-[16px] font-bold px-2">
        {/* <p>{getShortPrice(data.price) || "-"} ETH</p> */}
        <p>{data?.type}</p>
      </td>
      <td className="py-[11px] text-center text-[16px] font-bold">
        <p>
          {getShortPrice(convertWeiToEther(data?.price).toString()) || "-"} ETH
        </p>
      </td>

      <td className="text-center text-[16px] font-bold text-[#24C3BC]">
        <p>{getShortAddress(data?.from_address)}</p>
      </td>

      <td className="text-center text-[16px] font-bold text-[#24C3BC]">
        <p>{getShortAddress(data?.to_address)}</p>
      </td>
      <td className="text-center text-[16px] font-bold px-2">
        <p>
          {calculateTimeDifferenceList(convertTimestampToDate(data?.timestamp))}
        </p>
      </td>
    </tr>
  );
};
export default RowActivity;
