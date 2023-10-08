import { useGetNFT } from "@/queries/useGetNFT";
import { getShortAddress, isSameAddress } from "@/utils/string";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InforListingContext } from "./context";
import { useAccount } from "@starknet-react/core";
import { useGetSellListing } from "@/queries/useGetSellListing";
import { AiOutlineEye } from "react-icons/ai";
import ChainIcon from "@/assets/svg/ic_chain.svg";
import OffersTable from "./OffersTable";
import ItemActivityTable from "./ItemActivityTable";
import ListForSale from "./ListForSale";
import OfferWhenNotLogin from "./OfferWhenNotLogin";
import ListingNFT from "./ListingNFT";
import NFTInfo from "@/components/NFTDetail/NFTInfo";
import NFTImgAndDesctription from "@/components/NFTDetail/NFTImgAndDescription";
import Trait from "@/components/NFTDetail/Trait";
import NFTDetail from "@/components/NFTDetail/NFTDetail";
import BtnListForSale from "@/components/NFTDetail/BtnListForSale";
import useCurrentAccount from "@/hook/useAccount";

const trail = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => ({
	trait_type: "Body",
	value: "0.07 ",
}));

const ContentDetail = () => {
	const { contract_address, token_id } = useParams();
	const { address, account, status } = useCurrentAccount();
	const [nftData, setNftData] = useState<any>();
	const [isListing, setIsListing] = useState(false);
	const [isListForSale, setIsListForSale] = useState(false);

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
			<div className="gap-10 2xl:px-[7vw] lg:px-20  px-5 w-full mt-6 pb-11 ">
				<div className="flex-1 ">
					<NFTInfo nftData={nftData} owner={owner} />
					<div className="flex flex-col-reverse mt-[60px] gap-10 lg:flex-row lg:justify-between items-center lg:items-start">
						<div className="lg:max-w-[560px] 2xl:max-w-[800px] w-full">
							{owner ? (
								<div>
									{isListForSale ? (
										<BtnListForSale
											setIsListForSale={setIsListForSale}
											nftData={nftData}
										/>
									) : (
										<ListForSale setIsListForSale={setIsListForSale} />
									)}
								</div>
							) : (
								<div>
									<OfferWhenNotLogin data={nftListing} isListing={isListing} />
								</div>
							)}
						</div>
						<div className="flex xl:ml-[60px]  flex-col lg:w-fit items-center justify-start">
							<NFTImgAndDesctription nftData={nftData} />
							<div className="w-full px-4">
								<Trait traits={nftData?.attributes} />
								<NFTDetail nftData={nftData} />
							</div>
						</div>
					</div>
				</div>
				<div></div>
			</div>
		</InforListingContext.Provider>
	);
};

export default ContentDetail;
