import { useGetNFT } from "@/queries/useGetNFT";
import { getShortAddress, isSameAddress } from "@/utils/string";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingForm from "./ListingForm";
import { InforListingContext } from "./context";
import { useAccount } from "@starknet-react/core";
import { useGetSellListing } from "@/queries/useGetSellListing";

const DescriptionNFT: React.FC<{ description: string; traits: any[] }> = ({
  description,
  traits,
}) => {
  return (
    <div className="mt-10 border border-gray-500 rounded-md bg-blue-800/50">
      <div className="p-4 border-b border-gray-500 ">
        <p className="text-[24px] font-semibold">Description</p>
      </div>
      <div className="p-4">
        <p>{description}</p>
      </div>
      <div className="p-4 border-b border-t border-gray-500">
        <p className="text-[24px] font-semibold">Traits</p>
      </div>
      <div className="p-4 grid grid-cols-3 gap-2">
        {traits?.map((trait) => (
          <div className="p-3 bg-[#24C3BC] rounded-xl flex flex-col items-center">
            <p className="text-gray-700">{trait.trait_type}</p>
            <p className="text-[16px] text-center text-black font-semibold">
              {trait.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const NFTDetailBuyer = () => {
  const { contract_address, token_id } = useParams();
  const { address, account, status } = useAccount();
  const [nftData, setNftData] = useState<any>();
  // const [nftListingData, setNftListingData] = useState();
  const [isListing, setIsListing] = useState(false);
  const [owner, setOwner] = useState(false);

  const { data: nftResponse, refetch } = useGetNFT(
    contract_address || "",
    token_id || ""
  );

  const { data: nftListing } = useGetSellListing(
    contract_address || "",
    token_id || ""
  );


  useEffect(() => {
    if (nftResponse) setNftData(nftResponse);
  }, [nftResponse]);

  useEffect(() => {
    if (nftListing) {
      if (nftListing.data.length > 0) setIsListing(true);
      else setIsListing(false);
    }

    if (!!address && !!nftResponse) {
      if (isSameAddress(nftResponse.balance.owner_address, address))
        setOwner(true);
    } else setOwner(false);
  }, [nftListing, nftResponse, address, status, account]);



  return (
    <InforListingContext.Provider
      value={{
        listingData: nftListing,
        refetchListingData: refetch,
      }}
    >
      <div className="flex gap-10 flex-col md:flex-row px-5 w-full mt-6 pb-32">
        <div className="flex-1">
          <img src={nftData?.image_url} alt="" className="rounded-xl w-full" />
        </div>

        <div className="flex-1">
          <p className="text-[32px] font-bold">
            {nftData?.name} #{nftData?.token_id}
          </p>
          <p>By {getShortAddress(nftData?.balance?.owner_address)}</p>
          {nftListing?.data[0]?.status == "BUYING" ? (
            <div className="mt-10 relative p-4 border border-gray-500 rounded-md bg-blue-800/50 gap-10 ">
              <p className="font-bold">NFT is being processed</p>
              {/* <div className="flex mt-2">
                <p className="font-bold">Hash:</p>
                <p className="ml-4">
                  {getShortAddress(nftListing?.data[0]?.transaction_hash)}
                </p>
              </div> */}
            </div>
          ) : (
            <div>
              {(isListing || owner) && <ListingForm nftData={nftData} />}
            </div>
          )}
          <DescriptionNFT
            description={nftData?.description}
            traits={nftData?.attributes}
          />
        </div>
      </div>
    </InforListingContext.Provider>
  );
};

export default NFTDetailBuyer;
