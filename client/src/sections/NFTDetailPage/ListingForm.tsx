import { typedDataValidate } from "@/blockchain/type";
import {
  convertEtherToWei,
  formatDate,
  getShortPrice,
  isSameAddress,
} from "@/utils/string";
// import usePostSellListing from "@/queries/sell_listing/usePostSellListing";
// import { NFT } from "@/queries/types";
import { Contract, number, uint256 } from "starknet";
import { useEffect, useState } from "react";
import { useGetSellListingMutation } from "@/queries/useGetSellListingAsync";
import usePostSellListing from "@/queries/usePostSellListing";
import { DatePicker } from "antd";
import { FaEthereum } from "react-icons/fa";
import dayjs from "dayjs";
import { useAccount, useStarknetExecute } from "@starknet-react/core";
import { InvokeTransactionReceiptResponse, Provider } from "starknet";
import { addresses } from "@/blockchain/address";
import { erc721Abi } from "@/blockchain/abis/erc721";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useInforListingContext } from "./context";
import usePutSellListing from "@/queries/usePutSellListing";
import { useParams } from "react-router-dom";
import Buy from "./Buy";
import utc from "dayjs/plugin/utc"; // import plugin
dayjs.extend(utc); // use plugin

// import { isUndefined } from "@/utils/object";
// import { useGetSellListingMutation } from "@/queries/sell_listing/useGetSellListingAsync";
// import { useInforListingContext } from "../Context/context";

const provider = new Provider({ sequencer: { network: "mainnet-alpha" } });
const transferManagerERC721 = addresses!.transferManagerERC721.address;

type ListingFormProps = {
  nftData: any;
};

const ListingForm: React.FC<ListingFormProps> = (props) => {
  const { contract_address, token_id } = useParams();
  const { nftData } = props;
  const { account, address, status } = useAccount();
  const postSellListing = usePostSellListing();
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isListing, setIsListing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const [activeAction, setActiveAction] = useState(true);
  const [signing, setSigning] = useState(false);

  const [timeEndList, setTimeEndList] = useState(() => {
    const next7thDay = dayjs().add(7, "day").format("YYYY-MM-DD HH:mm:ss");
    return next7thDay;
  });
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    if (
      nftData &&
      address &&
      isSameAddress(nftData?.balance.owner_address, address)
    ) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [address, nftData, status, account]);

  // Handler to update the state when the date value changes
  const handleDateChange = (date: any) => {
    if (date) {
      setTimeEndList(date.format("YYYY-MM-DD HH:mm:ss"));
    }
  };
  const [priceInEther, setPriceInEther] = useState<number>(0.01);
  const { refetchListingData, listingData } = useInforListingContext();

  // If not, get latest nonce of owner
  const { mutateAsync } = useGetSellListingMutation();

  const findHighestNonce = (ownerListings: any) => {
    if (ownerListings?.length) {
      const maxNonceObj = ownerListings.reduce((prev: any, current: any) => {
        return prev.nonce > current.nonce ? prev : current;
      });

      return maxNonceObj.nonce;
    }

    return 30;
  };

  const handleGetLatestNonce = async () => {
    const owner_address = address?.toString() || "";

    if (owner_address && owner_address != "") {
      const params = {
        signer: address!.toString(),
      };

      const res = await mutateAsync(params);
      if (res?.data.length == 0) {
        return 20;
      } else {
        return findHighestNonce(res.data) + 20;
      }
    }
  };

  const handleModifyTypedDataMessage = async () => {
    // const sevenDaysUnixTime = addDaysToCurrentTime(timeEndList);

    typedDataValidate.message.nonce = await handleGetLatestNonce();
    typedDataValidate.message.collection = nftData!.contract_address;
    typedDataValidate.message.price = convertEtherToWei(
      String(priceInEther)
    ).toString(); // Convert Ether to Wei

    // Convert timeEndList to UTC date
    const utcDate = new Date(timeEndList);
    const utcDateString = utcDate.toISOString(); // This will be in format like "2023-07-25T12:00:00.000Z"
    typedDataValidate.message.endTime = Date.parse(utcDateString) / 1000;

    // typedDataValidate.message.endTime = Date.parse(timeEndList) / 1000;
    typedDataValidate.message.signer = address;
    typedDataValidate.message["tokenId.high"] = number.hexToDecimalString(
      uint256.bnToUint256(nftData!.token_id.toString()).high
    );
    typedDataValidate.message["tokenId.low"] = number.hexToDecimalString(
      uint256.bnToUint256(nftData!.token_id.toString()).low
    );
  };

  const handleListingSignature = async () => {
    setActiveAction(false);
    await handleModifyTypedDataMessage();
    try {
      setSigning(true);

      const signature4 = await account!.signMessage(typedDataValidate);
      if (address && signature4) {
        // Convert timeEndList to UTC date
        const utcDate = new Date(timeEndList);
        const utcDateObj = dayjs(utcDate).utc();
        const data = {
          contract_address: nftData!.contract_address,
          token_id: nftData!.token_id,
          signer: address!,
          price: priceInEther,
          signature4: JSON.stringify(signature4),
          nonce: await handleGetLatestNonce(),
          image_url: nftData.image_url,
          name: nftData.name,
          time_end: utcDateObj.utc().format("YYYY-MM-DD HH:mm:ss"),
        };
        postSellListing
          .mutateAsync(data)
          .then(() => {
            setPriceInEther(0);
            refetchListingData();
            setSigning(false);
            setActiveAction(false);
            setIsListing(true);
          })
          .catch(() => {
            setSigning(false);
            setActiveAction(true);
          });
      }
    } catch (err) {
      setSigning(false);
      setActiveAction(true);
    }
  };

  // Handle to approve if haven't approved
  const approveForAllExecute = useStarknetExecute({
    calls: {
      contractAddress: nftData?.contract_address,
      entrypoint: "setApprovalForAll",
      calldata: [transferManagerERC721, 0x1],
    },
  });

  const handleApproveForAll = async () => {
    if (status == "connected") {
      try {
        const result = await approveForAllExecute.execute();
        if (result.transaction_hash) {
          setIsApproving(true);
          const txReceiptDeployTest: InvokeTransactionReceiptResponse =
            await provider.waitForTransaction(result.transaction_hash);
          // If approved done, set state and ready to list
          if (txReceiptDeployTest.events) {
            setIsApproving(false);
            setIsApproved(true);
          }
        }
      } catch (err) {
        console.error(
          "An error occurred while trying to execute the function:",
          err
        );
      }
    } else {
      alert("Please connect wallet");
    }
  };

  // Check if approved
  const handleCheckIsApproved = async () => {
    const nftContract = new Contract(
      erc721Abi,
      nftData?.contract_address,
      provider
    );
    const isApprovedOperator = await nftContract.isApprovedForAll(
      address,
      transferManagerERC721
    );
    if (isApprovedOperator.isApproved.words[0] == true) {
      setIsApproved(true);
    } else {
    }
    setLoading(false);
  };

  useEffect(() => {
    handleCheckIsApproved();
    if (listingData && listingData?.data[0]?.status == "LISTING") {
      setIsListing(true);
    } else {
      setIsListing(false);
    }
  }, [nftData, status, address, account]);

  const ButtonApproveForAll = () => {
    return (
      <button
        disabled={isApproving}
        className={`cursor-pointer h-full py-2 px-4 border w-full  ${
          isApproving ? "bg-gray-500" : "bg-[#24C3BC]"
        } rounded-md grid place-items-center mt-3`}
        onClick={handleApproveForAll}
      >
        <p className="text-[20px] font-bold">
          {isApproving ? "Approving" : "Approve Collection"}
        </p>
      </button>
    );
  };

  const putSellListing = usePutSellListing();

  const cancelListing = useStarknetExecute({
    calls: [
      {
        contractAddress: addresses.marketplace.address,
        entrypoint: "cancelMakerOrder",
        calldata: [listingData?.data[0]?.nonce], // To be replace
      },
    ],
  });

  const handleCancelListing = async () => {
    if (status == "connected") {
      const result = await cancelListing.execute();

      if (result.transaction_hash && address) {
        const bodyData = {
          status: "CANCEL",
          contract_address,
          token_id,
        };

        putSellListing.mutateAsync(bodyData).then(() => {
          refetchListingData();
          setIsListing(false);
        });
      }
    } else {
      alert("Please connect wallet");
    }
  };

  // function addDaysToCurrentTime(dateString: any) {
  //   const unixTimeInSeconds = Math.floor(new Date(dateString).getTime() / 1000);
  //   return unixTimeInSeconds;
  // }

  if (nftData && !isOwner)
    return (
      <div className="p-4 mt-10 border border-gray-500 rounded-md bg-blue-800/50 gap-10 ">
        <div className="items-center justify-between border-b py-2 border-gray-400/50">
          <div className="flex gap-2 items-center">
            <p className="text-[#24C3BC] text-[32px] font-bold">
              {getShortPrice(listingData?.data[0]?.price)}
            </p>
            <FaEthereum className="text-[24px] mr-2" />
          </div>
          <p>
            <span className="text-gray-400">Sale ends:</span>{" "}
            <span>{formatDate(listingData?.data[0]?.time_end)}</span>
          </p>
        </div>

        <Buy nftData={nftData} />
      </div>
    );

  if (nftData && isOwner)
    return (
      <div className="mt-10 relative p-4 border border-gray-500 rounded-md bg-blue-800/50 gap-10 ">
        {loading && (
          <div className="rounded-md absolute inset-0 h-full w-full animate-pulse z-10 bg-blue-800"></div>
        )}

        {isListing ? (
          <div className="flex gap-2 items-center">
            <p className="text-[#24C3BC] text-[32px] font-bold">
              {getShortPrice(listingData?.data[0]?.price)}
            </p>
            <FaEthereum className="text-[24px] mr-2" />
          </div>
        ) : (
          <p className="text-[#24C3BC] text-[24px] font-bold">Not Listed</p>
        )}

        {isApproved ? (
          <div>
            {!isListing ? (
              <div>
                <div className="flex h-14 gap-5 mt-5">
                  <div className="bg-blue-800/50 border border-gray-500 rounded-md  px-3 py-2 w-fit flex items-center">
                    <input
                      type="number"
                      className="h-full bg-transparent outline-none mr-3 border-none active::outline-none"
                      value={priceInEther} // bind the input to the priceInEther state
                      onChange={(e) =>
                        setPriceInEther(parseFloat(e.target.value))
                      } //
                    />
                    <FaEthereum className="text-[24px] mr-2" />
                  </div>

                  <DatePicker
                    className="text-black w-full"
                    value={dayjs(timeEndList).local()} // Convert the state value to Day.js object before passing it to DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime
                    onChange={handleDateChange}
                  />
                </div>

                <button
                  disabled={!activeAction}
                  onClick={handleListingSignature}
                  className={`cursor-pointer h-12 w-full py-2 px-4 border ${
                    signing ? "bg-gray-400" : "bg-[#24C3BC]"
                  } rounded-md grid place-items-center mt-3`}
                >
                  {signing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin">
                        <AiOutlineLoading3Quarters />
                      </div>
                      <p className="text-[20px] font-bold ml-5">Signing</p>
                    </div>
                  ) : (
                    <p className="text-[20px] font-bold">List</p>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <button
                  // disabled={!activeAction}
                  onClick={handleCancelListing}
                  className={`cursor-pointer h-12 w-full py-2 px-4 border
                   bg-gray-400
                  rounded-md grid place-items-center mt-3`}
                >
                  <p className="text-[20px] font-bold">Cancel listing</p>
                </button>
              </div>
            )}
          </div>
        ) : (
          <ButtonApproveForAll />
        )}
      </div>
    );

  return <></>;
};

export default ListingForm;
