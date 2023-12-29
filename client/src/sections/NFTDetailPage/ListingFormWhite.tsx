import { typedDataValidate } from "@/blockchain/type";
import {
	convertEtherToWei,
	formatDate,
	getShortPrice,
	isSameAddress,
} from "@/utils/string";
import moment from "moment";

// import usePostSellListing from "@/queries/sell_listing/usePostSellListing";
// import { NFT } from "@/queries/types";
import { Contract, number, uint256, RpcProvider } from "starknet";
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
import { WALLETS } from "@/context/types";
import { useGlobalContext } from "@/context/GlobalContext";
import useCurrentAccount from "@/hook/useAccount";
dayjs.extend(utc); // use plugin

declare const window: any;

// import { isUndefined } from "@/utils/object";
// import { useGetSellListingMutation } from "@/queries/sell_listing/useGetSellListingAsync";
// import { useInforListingContext } from "../Context/context";

const provider = new RpcProvider({
	nodeUrl:
		"https://starknet-mainnet.g.alchemy.com/v2/bdiaAMbY1lVsbYjjZ9iedVqdwM14xaKi",
});
const transferManagerERC721 = addresses!.transferManagerERC721.address;

type ListingFormProps = {
	nftData: any;
	priceInEther: number;
	timeEndList: any;
};

const ListingFormWhite: React.FC<ListingFormProps> = (props) => {
	const { contract_address, token_id } = useParams();
	const { nftData, priceInEther, timeEndList } = props;
	const { account, address, status } = useCurrentAccount();
	const postSellListing = usePostSellListing();
	const [isApproved, setIsApproved] = useState(false);
	const [loading, setLoading] = useState(true);
	const [isListing, setIsListing] = useState(false);
	const [isOwner, setIsOwner] = useState(false);

	const [activeAction, setActiveAction] = useState(true);
	const [signing, setSigning] = useState(false);

	// const [timeEndList, setTimeEndList] = useState(() => {
	//   const next7thDay = dayjs().add(7, "day").format("YYYY-MM-DD HH:mm:ss");
	//   return next7thDay;
	// });

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
	// const handleDateChange = (date: any) => {
	//   if (date) {
	//     setTimeEndList(date.format("YYYY-MM-DD HH:mm:ss"));
	//   }
	// };
	// const [priceInEther, setPriceInEther] = useState<number>(0.01);
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
						// setPriceInEther(0);
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

	const { wallet } = useGlobalContext();

	const handleApproveForAll = async () => {
		if (
			status == "connected" ||
			(wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected)
		) {
			try {
				let result;
				if (wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected) {
					result = await window.okxwallet.starknet.account.execute({
						contractAddress: nftData?.contract_address,
						entrypoint: "setApprovalForAll",
						calldata: [transferManagerERC721, 0x1],
					});
				} else result = await approveForAllExecute.execute();
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
				className={`cursor-pointer w-full h-fit py-3 px-4 mt-12 shadow-button-wallet ${isApproving ? "bg-gray-500" : "bg-[#24C3BC]"
					} rounded-md grid place-items-center`}
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
		if (
			status == "connected" ||
			(wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected)
		) {
			try {
				let result;
				if (wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected) {
					result = await window.okxwallet.starknet.account.execute({
						contractAddress: addresses.marketplace.address,
						entrypoint: "cancelMakerOrder",
						calldata: [listingData?.data[0]?.nonce], // To be replace
					});
				} else result = await cancelListing.execute();

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

	return (
		<div>
			{loading && (
				<div className="rounded-md absolute inset-0 h-full w-full animate-pulse z-50 bg-blue-800/10"></div>
			)}

			{isApproved ? (
				<div>
					{!isListing ? (
						<div className="w-full">
							{/* <DatePicker
                className="text-black w-full"
                value={dayjs(timeEndList).local()} // Convert the state value to Day.js object before passing it to DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime
                onChange={handleDateChange}
              /> */}

							<button
								disabled={!activeAction}
								onClick={handleListingSignature}
								// className={`cursor-pointer h-12 w-full py-2 px-4 border  rounded-md grid place-items-center mt-3`}
								className={`w-full cursor-pointer h-fit py-3 px-4 shadow-button-wallet ${signing ? "bg-gray-400" : "bg-white"
									} rounded-md grid place-items-center`}
							>
								{signing ? (
									<div className="flex items-center justify-center">
										<div className="animate-spin">
											<AiOutlineLoading3Quarters />
										</div>
										<p className="text-[20px] font-bold ml-5 text-[#24C3BC]">
											Signing
										</p>
									</div>
								) : (
									<p className="text-[20px] uppercase font-bold text-[#24C3BC]">
										Complete listing
									</p>
								)}
							</button>

							{/* <div
                className="cursor-pointer h-fit py-3 px-4 mt-12 shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center"
                onClick={handleCancelListing}
              >
                <p className="text-[20px] uppercase font-bold">
                  Complete listing
                </p>
              </div> */}
						</div>
					) : (
						// <div>
						//   <button
						//     // disabled={!activeAction}
						//     onClick={handleCancelListing}
						//     className={`cursor-pointer h-12 w-full py-2 px-4 border
						//      bg-gray-400
						//     rounded-md grid place-items-center mt-3`}
						//   >
						//     <p className="text-[20px] font-bold">Cancel listing</p>
						//   </button>
						// </div>

						<div
							className="cursor-pointer h-fit py-3 px-4 mt-12 shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center"
							onClick={handleCancelListing}
						>
							<p className="text-[20px] uppercase font-bold">Cancel listing</p>
						</div>
					)}
				</div>
			) : (
				<ButtonApproveForAll />
			)}
		</div>
	);
};

export default ListingFormWhite;
