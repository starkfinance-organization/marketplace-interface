import { addresses } from "@/blockchain/address";
import { useGetCollectionsDetail } from "@/queries/useGetCollectionsDetailQuery";
import usePutSellListing from "@/queries/usePutSellListing";
import {
  calculateTimeDifference,
  calculateTimeDifferenceList,
  getShortAddress,
  getShortPrice,
} from "@/utils/string";
import { useAccount, useStarknetExecute } from "@starknet-react/core";
import { useNavigate } from "react-router-dom";

const RowNFTTabProfile: React.FC<{
  data: any;
  index: number;
  tabName: string;
  refetch?: any;
}> = ({ data, index, tabName, refetch }) => {
  const navigate = useNavigate();
  const { address, status } = useAccount();
  const handleClick = () => {
    if (data?.collection_address !== undefined)
      navigate(`/assets/${data.collection_address}/${data.token_id}`);
    else {
      navigate(`/assets/${data.contract_address}/${data.token_id}`);
    }
  };

  const putSellListing = usePutSellListing();

  const { data: collection } = useGetCollectionsDetail(
    data?.contract_address || ""
  );

  const cancelListing = useStarknetExecute({
    calls: [
      {
        contractAddress: addresses.marketplace.address,
        entrypoint: "cancelMakerOrder",
        calldata: [data?.nonce], // To be replace
      },
    ],
  });

  const handleCancelListing = async () => {
    const contract_address = data.contract_address;
    const token_id = data.token_id;
    if (status == "connected") {
      const result = await cancelListing.execute();

      if (result.transaction_hash && address) {
        const bodyData = {
          status: "CANCEL",
          contract_address,
          token_id,
        };

        putSellListing.mutateAsync(bodyData).then(() => {
          // refetchListingData();
          // setIsListing(false);
          if (refetch) refetch();
        });
      }
    } else {
      alert("Please connect wallet");
    }
  };

  const handleCounter = () => {};

  const handleAccept = () => {};

  const handleCancelOfferMade = () => {};

  const btn = () => {
    if (tabName == "Received") {
      return (
        <>
          <button
            onClick={handleCounter}
            className=" text-xl font-bold max-md:text-sm uppercase bg-[#24C3BC] px-[30px] py-2 rounded-[10px]"
          >
            Counter
          </button>
          <button
            onClick={handleAccept}
            className="font-bold text-xl max-md:text-sm uppercase bg-[#24C3BC] px-[30px] py-2 rounded-[10px]"
          >
            Accept
          </button>
        </>
      );
    }
    if (tabName == "Listing") {
      return (
        <button
          onClick={handleCancelListing}
          className="font-bold text-xl max-md:text-sm uppercase bg-[#24C3BC] px-[30px] py-2 rounded-[10px]"
        >
          Cancel
        </button>
      );
    }
    if (tabName == "OfferMade") {
      return (
        <button
          onClick={handleCancelOfferMade}
          className="font-bold text-xl max-md:text-sm uppercase bg-[#24C3BC] px-[30px] py-2 rounded-[10px]"
        >
          Cancel
        </button>
      );
    }
  };

  return (
    <tr className=" font-bold text-xl max-md:text-sm bg-transparent border-gray-800 hover:bg-gray-700/30 cursor-pointer">
      <td className="flex py-[15px] items-center justify-start pr-6 pl-[30px]">
        <img
          src={data?.image_url}
          alt=""
          className="h-10 aspect-square rounded-md border-[1px] border-[#24C3BC] object-cover"
        />
        {/* <p className="ml-4 ">{data.name}</p> */}
        <div className="flex flex-col justify-start items-start ml-[15px]">
          <p className="" onClick={handleClick}>
            {data?.name}
          </p>
          {collection?.data && (
            <p
              className="text-base max-md:text-xs font-normal text-[#24C3BC]"
              onClick={() => {
                navigate(`/collection/${collection.data[0].contract_address}`);
              }}
            >
              {collection?.data[0]?.name}
            </p>
          )}
        </div>
      </td>

      <td className="">
        <p className="text-xl font-bold text-center">
          {getShortPrice(data.price) || "-"} ETH
        </p>
      </td>

      <td className="text-xl font-bold text-center">
        {getShortPrice(collection?.data[0]?.floor_price) || "-"} ETH
      </td>
      <td className="text-xl font-bold text-center">
        {calculateTimeDifference(data?.time_end)}
      </td>

      {tabName == "Received" && (
        <td className=" pr-4 text-xl font-bold text-center">
          {calculateTimeDifference(data?.created_at)}
        </td>
      )}
      {tabName == "OfferMade" && (
        <td className=" pr-4 text-xl font-bold text-center">
          {calculateTimeDifference(data?.created_at)}
        </td>
      )}
      <td>
        <div className="flex gap-[10px] justify-center w-full h-fit ">
          {btn()}
        </div>
      </td>
    </tr>
  );
};
export default RowNFTTabProfile;
