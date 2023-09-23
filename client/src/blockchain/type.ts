import { typedData } from "starknet";
import { addresses } from "./address";

export const typedDataValidate: typedData.TypedData = {
  domain: {
    chainId: "SN_MAIN",
    name: "StarkSport",
    version: "2",
  },
  message: {
    amount: "1",
    collection: "0x0",
    currency: addresses.ethToken.address,
    endTime: "9999999999",
    isOrderAsk: "1",
    minPercentageToAsk: "8500",
    nonce: 0,
    params: "0",
    price: "0",
    signer: "0x0",
    startTime: "0",
    strategy: addresses.strategyStandardSaleForFixedPrice.address,
    "tokenId.high": "0",
    "tokenId.low": "0",
  },
  primaryType: "Message",
  types: {
    Message: [
      {
        name: "isOrderAsk",
        type: "felt",
      },
      {
        name: "signer",
        type: "felt",
      },
      {
        name: "collection",
        type: "felt",
      },
      {
        name: "price",
        type: "felt",
      },
      {
        name: "tokenId.low",
        type: "felt",
      },
      {
        name: "tokenId.high",
        type: "felt",
      },
      {
        name: "amount",
        type: "felt",
      },
      {
        name: "strategy",
        type: "felt",
      },
      {
        name: "currency",
        type: "felt",
      },
      {
        name: "nonce",
        type: "felt",
      },
      {
        name: "startTime",
        type: "felt",
      },
      {
        name: "endTime",
        type: "felt",
      },
      {
        name: "minPercentageToAsk",
        type: "felt",
      },
      {
        name: "params",
        type: "felt",
      },
    ],
    StarkNetDomain: [
      {
        name: "name",
        type: "felt",
      },
      {
        name: "chainId",
        type: "felt",
      },
      {
        name: "version",
        type: "felt",
      },
    ],
  },
};
