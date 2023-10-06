import { addresses } from "@/blockchain/address";
import { useGlobalContext } from "@/context/GlobalContext";
import { WALLETS } from "@/context/types";
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

declare const window: any;

const RowNFTProfile: React.FC<{
	data: any;
	index: number;
	tabName: string;
	refetch?: any;
}> = ({ data, index, tabName, refetch }) => {
	const navigate = useNavigate();
	const { address, status } = useAccount();

	const handleCounter = () => {};

	const handleAccept = () => {};

	const handleCancelOfferMade = () => {};

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

	const { wallet } = useGlobalContext();

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
		if (
			status == "connected" ||
			(wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected)
		) {
			const result = await (wallet === WALLETS.OKX &&
			window.okxwallet.starknet.isConnected
				? window.okxwallet.starknet.account.execute({
						contractAddress: addresses.marketplace.address,
						entrypoint: "cancelMakerOrder",
						calldata: [data?.nonce], // To be replace
				  })
				: cancelListing.execute());

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

	const btn = () => {
		if (tabName == "Received") {
			return (
				<>
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

	const renderTimeText = () => {
		if (tabName == "Received") {
			return <div className="text-sm">15 minutes ago</div>;
		}
		if (tabName == "Listing") {
			return (
				<div className="text-sm">{calculateTimeDifference(data?.time_end)}</div>
			);
		}
		if (tabName == "OfferMade") {
			return <div className="text-sm">15 minutes ago</div>;
		}
	};

	return (
		<div className="text-xl max-md:text-sm bg-transparent border-gray-800 ">
			<div className="flex pt-[15px] items-center w-full justify-between">
				<div className="flex  items-center pr-6 ">
					<div className="h-12 aspect-square rounded-md object-cover border-[#24C3BC] border">
						<img src={data?.image_url} alt="" className="h-full w-full" />
					</div>

					<div className="flex flex-col ml-[15px]">
						<p className="text-xl" onClick={handleClick}>
							{data?.name}
						</p>
						{collection?.data && (
							<p
								className="text-base text-[#24C3BC] max-md:text-xs font-normal"
								onClick={() => {
									navigate(
										`/collection/${collection.data[0].contract_address}`
									);
								}}
							>
								{collection?.data[0]?.name}
							</p>
						)}
					</div>
				</div>
				<div className="text-end">
					{/* <div className="text-sm">Sale</div> */}
					<div className="text-[#24C3BC]">{getShortPrice(data?.price)} ETH</div>
				</div>
			</div>
			<div className="flex items-center justify-between">
				{renderTimeText()}
				<div className="flex gap-[10px] h-fit ">{btn()}</div>
			</div>
		</div>
	);
};
export default RowNFTProfile;
