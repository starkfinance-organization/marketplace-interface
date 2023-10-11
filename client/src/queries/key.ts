export const QUERY_KEY = {
  SCActivity: (address: string, id: string) => ["action-nft", address, id],

  SCAccountNFTs: (account_address: string) => ["AccountNFTs", account_address],
  SCNFT: (contract_address: string, token_id: string) => [
    "NFT",
    contract_address,
    token_id,
  ],
  SCACCOUNT: (account_address: string) => ["Account", account_address],
  GET_SELL_LISTING: (
    contract_address?: string,
    token_id?: string,
    signer?: string
  ) => ["GET_SELL_LISTING", contract_address, token_id, signer],
  COLLECTION: ["COLLECTION"] as const,
  COLLECTION_DETAIL: (contract_address: string) => [
    ...QUERY_KEY.COLLECTION,
    contract_address,
  ],
  ACTIVITY: (
    contract_address: string,
    status: string,
    type: number,
    name: string
  ) => ["activity", contract_address, status, type, name],
};

export const SC_URL = "https://api.starkscan.co/api/v0";
export const BASE_API_V1 = "https://market-testnet.starksport.finance/api/v0";
// export const BASE_API_V1 = "http://localhost:3000/api/v0";
// export const BASE_API_V1 = "http://localhost:3008/api/v1";
export const BASE_API_FINANCE =
  "https://market-testnet.starksport.finance/api/v0";
// export const BASE_API_FINANCE = "http://localhost:3000/api/v0";
