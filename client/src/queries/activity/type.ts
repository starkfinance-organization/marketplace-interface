export type ListingResponse<T> = {
  data: T;
  totalPages: number;
  nextPage: number;
};

export type ItemResponse = {
  id: number;
  collection_address: string;
  token_id: string;
  signer: string;
  price: string;
  signature4: string;
  nonce: number;
  created_at: Date;
  update_at: Date;
  status: string;
  transaction_hash: string;
  is_listing: number;
  image_url: string;
  name: string;
};
