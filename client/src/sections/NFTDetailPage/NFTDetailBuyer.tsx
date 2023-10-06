import { useGetNFT } from "@/queries/useGetNFT";
import { getShortAddress, isSameAddress } from "@/utils/string";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingForm from "./ListingForm";
import { InforListingContext } from "./context";
import { useAccount } from "@starknet-react/core";
import { useGetSellListing } from "@/queries/useGetSellListing";
import ContentDetail from "./ContentDetail";
import MoreFromThisCollections from "./MoreFromThisCollections";
// import ContentDetail from "./ContentDetail";
// import MoreFromThisCollections from "./MoreFromThisCollections";

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
      <ContentDetail />
      <MoreFromThisCollections />
    </InforListingContext.Provider>
  );
};

export default NFTDetailBuyer;
