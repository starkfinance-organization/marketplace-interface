import { addresses } from "@/blockchain/address";
import usePutAcceptOffer from "@/queries/usePutAcceptOffer";
import {
  calculateTimeDifference,
  calculateTimeDifferenceList,
  convertEtherToWei,
  getShortAddress,
  getShortPrice,
  isSameAddress,
} from "@/utils/string";
import { useAccount, useStarknetExecute } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { BiExitFullscreen } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { number, uint256 } from "starknet";
function transformDateFormat(dateStr: string) {
  // Extract the year, month, day, hours, minutes, and seconds
  const match = dateStr.match(
    /(\w{3}) (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):(\d{2})/
  );

  if (!match) {
    throw new Error("Invalid date format");
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = (monthNames.indexOf(match[2]) + 1).toString().padStart(2, "0");
  const day = match[3];
  const year = match[4];
  const time = `${match[5]}:${match[6]}:${match[7]}`;

  return `${year}-${month}-${day}T${time}.000Z`;
}

const RowNFTOffer: React.FC<{ data: any; index: number; nftData: any }> = ({
  data,
  index,
  nftData,
}) => {
  const { contract_address, token_id } = useParams();
  const { address, status, account } = useAccount();
  const [timeEnd, setTimeEnd] = useState("");
  // console.log("nftData", nftData);
  // console.log("data", data);
  const navigate = useNavigate();

  useEffect(() => {
    let time_end = data.time_end; // This is your UTC time
    console.log("time_end", time_end);
    let localDate = new Date(time_end);
    const newTimeEnd = transformDateFormat(localDate.toString());
    console.log("newTimeEnd", newTimeEnd);
    setTimeEnd(newTimeEnd);
  }, [data]);

  const handleClick = () => {
    // if (data?.collection_address !== undefined)
    //   navigate(`/assets/${data.collection_address}/${data.token_id}`);
    // else {
    //   navigate(`/assets/${data.contract_address}/${data.token_id}`);
    // }
  };

  const generateOfferCalldata = (offerData: any, address: any) => {
    if (!offerData) return null;
    const signature4Parsed = offerData.signature4
      ? JSON.parse(offerData.signature4)
      : ["", ""];

    const sell_end_time =
      timeEnd == null ? "9999999999" : Date.parse(timeEnd) / 1000;

    const callData = [
      "1", // takerAsk.isOrderAsk
      address, //   taker
      convertEtherToWei(offerData.price.toString()).toString(), //   price
      number.hexToDecimalString(
        uint256.bnToUint256(offerData.token_id.toString()).low
      ), //   tokenId
      number.hexToDecimalString(
        uint256.bnToUint256(offerData.token_id.toString()).high
      ), //   tokenId
      "8500", // minPercentageToAsk
      "0", // params
      "0", //   makerBid.isOrderAsk
      offerData.signer, //   signer
      offerData.contract_address, //   collection
      convertEtherToWei(offerData.price.toString()).toString(), //   price
      number.hexToDecimalString(
        uint256.bnToUint256(offerData.token_id.toString()).low
      ), //   tokenId
      number.hexToDecimalString(
        uint256.bnToUint256(offerData.token_id.toString()).high
      ), //   tokenId
      "1", //   amount
      addresses.strategyStandardSaleForFixedPrice.address, //   strategy
      addresses.ethToken.address, //   currency
      offerData.nonce.toString(), //   nonce
      "0", //   startTime
      sell_end_time, //   endTime
      "8500", //   minPercentageToAsk
      "0", //   params
      "2", //   Sig len
      signature4Parsed[0], //   Sig
      signature4Parsed[1], //   Sig
      "0", //   customNonFungibleTokenRecipient
    ];
    return callData;
  };

  const acceptOffer = useStarknetExecute({
    calls: [
      {
        contractAddress: contract_address || "",
        entrypoint: "setApprovalForAll",
        calldata: [addresses.transferManagerERC721.address, 0x1],
      },
      {
        contractAddress: addresses.marketplace.address,
        entrypoint: "matchBidWithTakerAsk",
        calldata: generateOfferCalldata(data, address) || [],
      },
    ],
  });
  // const putRecord = usePutBuy();
  // const { refetchListingData } = useInforListingContext();
  const putRecord = usePutAcceptOffer();

  const handleAcceptOffer = async () => {
    if (status == "connected") {
      const result = await acceptOffer.execute();
      if (result.transaction_hash) {
        const bodyData = {
          contract_address: contract_address,
          token_id: token_id,
          signer: data?.signer || "",
        };
        try {
          putRecord.mutateAsync(bodyData);
        } catch (error) {
          // console.log(error);
        }
      }
    }
  };

  return (
    <tr className="font-semibold text-base bg-transparent border-gray-800 hover:bg-blue-800">
      <td className=" text-center text-[16px] font-bold px-2">
        <p>{getShortPrice(data.price) || "-"} ETH</p>
        {/* <p>0.1100 ETH</p> */}
      </td>
      {/* <td className="text-center text-[16px] font-bold">
        <p>$170,01</p>
      </td> */}
      <td className="py-[11px] text-center text-[16px] font-bold">
        <p>1</p>
      </td>
      <td className="text-center text-[16px] font-bold">
        <p>{calculateTimeDifference(timeEnd)}</p>
      </td>
      <td className=" px-2 text-center text-[16px] font-bold text-[#24C3BC]">
        {/* <p>{getShortAddress(data.owner)}</p> */}
        <p>{getShortAddress(data.signer)}</p>
      </td>
      <td className="flex justify-end items-center py-2 gap-[10px] pr-[30px]">
        {/* <button
          onClick={() => { }}
          className="font-bold text-xl max-md:text-sm uppercase bg-[#24C3BC] px-[30px] py-2 rounded-[10px]"
        >
          Counter
        </button> */}
        {isSameAddress(nftData?.balance.owner_address, address || "") ? (
          <button
            onClick={() => {
              handleAcceptOffer();
            }}
            className="font-bold text-xl max-md:text-sm uppercase bg-[#24C3BC] px-[30px] py-2 rounded-[10px]"
          >
            Accept
          </button>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
};
export default RowNFTOffer;
