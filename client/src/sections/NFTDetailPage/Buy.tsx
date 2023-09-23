import { useAccount, useStarknetExecute } from "@starknet-react/core";
import {
  InvokeTransactionReceiptResponse,
  Provider,
  number,
  uint256,
} from "starknet";
import { convertEtherToWei } from "@/utils/string";
import { useInforListingContext } from "./context";
import usePutSellListing from "@/queries/usePutSellListing";
import { addresses } from "@/blockchain/address";
import { useState } from "react";

const provider = new Provider({ sequencer: { network: "mainnet-alpha" } });

type BuyProps = {
  nftData: any;
};

const Buy: React.FC<BuyProps> = (props) => {
  const { nftData } = props;
  const { address, status } = useAccount();
  const { listingData, refetchListingData } = useInforListingContext();
  const putSellListing = usePutSellListing();
  const [transaction_hash, settransaction_hash] = useState();
  const signature4Parsed = listingData?.data[0]?.signature4
    ? JSON.parse(listingData?.data[0]?.signature4)
    : ["", ""];

  const callDataBuyNow = [
    "0", // isOrderAsk
    address, //   taker
    convertEtherToWei(listingData?.data[0]?.price.toString()).toString(), //   price
    number.hexToDecimalString(
      uint256.bnToUint256(listingData?.data[0]?.token_id.toString()).low
    ), //   tokenId
    number.hexToDecimalString(
      uint256.bnToUint256(listingData?.data[0]?.token_id.toString()).high
    ), //   tokenId
    "8500", // minPercentageToAsk
    "0", // params
    "1", //   isOrderAsk
    listingData?.data[0]?.signer, //   signer
    listingData?.data[0]?.contract_address, //   collection
    convertEtherToWei(listingData?.data[0]?.price.toString()).toString(), //   price
    number.hexToDecimalString(
      uint256.bnToUint256(listingData?.data[0]?.token_id.toString()).low
    ), //   tokenId
    number.hexToDecimalString(
      uint256.bnToUint256(listingData?.data[0]?.token_id.toString()).high
    ), //   tokenId
    "1", //   amount
    addresses.strategyStandardSaleForFixedPrice.address, //   strategy
    addresses.ethToken.address, //   currency
    listingData?.data[0]?.nonce.toString(), //   nonce
    "0", //   startTime
    Date.parse(listingData?.data[0]?.time_end) / 1000, //   endTime
    "8500", //   minPercentageToAsk
    "0", //   params
    "2", //   Sig len
    signature4Parsed[0], //   Sig
    signature4Parsed[1], //   Sig
    "0", //   customNonFungibleTokenRecipient
  ];

  const buyNow = useStarknetExecute({
    calls: [
      {
        contractAddress: addresses.ethToken.address,
        entrypoint: "approve",
        calldata: [
          addresses.marketplace.address,
          convertEtherToWei(listingData?.data[0]?.price.toString()).toString(),
          0,
        ],
      },
      {
        contractAddress: addresses.marketplace.address,
        entrypoint: "matchAskWithTakerBid",
        calldata: callDataBuyNow,
      },
    ],
  });

  const handleBuyNow = async () => {
    if (status == "connected") {
      const result = await buyNow.execute();

      if (result.transaction_hash) {
        settransaction_hash(transaction_hash);
        const bodyData = {
          signer: address!,
          contract_address: nftData.contract_address,
          token_id: nftData.token_id,
          status: "BUYING",
          transaction_hash: result.transaction_hash || "",
        };

        putSellListing.mutateAsync(bodyData).then(() => {
          refetchListingData();
        });

        const txReceiptDeployTest: InvokeTransactionReceiptResponse =
          await provider.waitForTransaction(result.transaction_hash);
        if (txReceiptDeployTest.events) {
          // if done, pop up success
        }
      }
    } else {
      alert("Please connect wallet");
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      className={`cursor-pointer h-12 w-full py-2 px-4 border
bg-[#24C3BC]
rounded-md grid place-items-center mt-3`}
    >
      <p className="text-[20px] font-bold">Buy Now</p>
    </button>
  );
};

export default Buy;
