/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NFTDemo from "@/assets/png/nftDemo.png";
import { ethAddress, starksportNftAddress } from "@/constants/addresses";
import { logoAbi } from "@/constants/logoAbi";
import {
	logoAddressesArray,
	logoAddressesObjectArray,
} from "@/constants/logoAddresses";
import { useAccount, useStarknetExecute } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { Contract, Provider, RpcProvider } from "starknet";
import StarksportNFT from "@/assets/svg/ic_starksportNft.svg";
import UEFA from "@/assets/svg/ic_uefa.svg";
import PremierLeague from "@/assets/svg/ic_premier.svg";
import UEFAMobile from "@/assets/svg/ic_uefa_mobile.svg";
import PremierLeagueMobile from "@/assets/svg/ic_premier_mobile.svg";
import PremireLeagueGif from "@/assets/png/premier.gif";
import UEFAImg from "@/assets/png/nftC1.jpg";
import EventBanner from "@/assets/png/event_banner.png";
import EventBannerMobile from "@/assets/png/event_banner_rotate90.png";
import StarksportVideo from "@/assets/video/collection.mov";
import { nftC1AddressesArray } from "@/constants/nftc1Addresses";
import CountdownTimer from "@/components/CountDownTime/CountdownTimer";
import PNGNftSS from "@/assets/png/nftSS.jpg";
import { useGlobalContext } from "@/context/GlobalContext";
import { WALLETS } from "@/context/types";
// const provider = new Provider({ sequencer: { network: "mainnet-alpha" } });
const provider = new RpcProvider({
	nodeUrl:
		"https://starknet-mainnet.g.alchemy.com/v2/bdiaAMbY1lVsbYjjZ9iedVqdwM14xaKi",
});

declare const window: any;

const StarksportMint = () => {
	const [totalMinted, setTotalMinted] = useState(0);
	const { status } = useAccount();

	useEffect(() => {
		const fetchData = async () => {
			let totalMinted = 0;

			const nftAddress = starksportNftAddress;
			const nftContract = new Contract(logoAbi, nftAddress, provider);
			const totalSupplyNft = await nftContract.call("totalSupply");
			totalMinted += totalSupplyNft.totalSupply.low.words[0];

			setTotalMinted(totalMinted);
		};
		void fetchData();
	}, [status]);

	// Get the nft address
	const nftAddress = starksportNftAddress;

	const calls = [
		{
			contractAddress: ethAddress,
			entrypoint: "approve",
			calldata: [nftAddress, 1500000000000000, 1],
		},
		{
			contractAddress: nftAddress,
			entrypoint: "publicmint_mint",
			calldata: [],
		},
	];

	const { wallet } = useGlobalContext();

	const handleMint = async () => {
		if (
			status == "connected" ||
			(wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected)
		) {
			if (wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected) {
				await window.okxwallet.starknet.account.execute({
					contractAddress: ethAddress,
					entrypoint: "approve",
					calldata: [nftAddress, 1500000000000000, 1],
				});

				return window.okxwallet.starknet.account.execute({
					contractAddress: nftAddress,
					entrypoint: "publicmint_mint",
					calldata: [],
				});
			} else return execute();
		} else {
			alert("Please connect wallet");
		}
	};

	const { execute } = useStarknetExecute({ calls });

	return (
		<div className="pt-[222px] flex flex-col items-center ">
			<img src={StarksportNFT} alt="" className="mx-auto" />

			<div className="flex relative md:flex-row flex-col lg:p-[40px] md:p-[30px] p-[20px] rounded-[21px] mt-[70px] w-full max-w-[1150px]  overflow-hidden border-[#00FFFF] border-[1px]">
				<img
					src={EventBanner}
					alt=""
					className="w-full h-full absolute inset-0 -z-10 md:block hidden"
				/>
				<img
					src={EventBannerMobile}
					alt=""
					className="w-full absolute inset-0 -z-10 h-full md:hidden block"
				/>
				{/* <video
          autoPlay
          loop
          muted
          disablePictureInPicture
          className="lg:max-w-[420px] md:max-w-[300px] rounded-[12px] h-fit  md:mr-[30px] lg:mr-[40px]"
        >
          <source src={StarksportVideo} type="video/mp4"></source>
        </video> */}
				<div className="lg:max-w-[420px] w-full md:max-w-[300px] h-full aspect-square  rounded-[12px]  md:mr-[30px] lg:mr-[40px]">
					<img src={PNGNftSS} alt="" className="rounded-[12px]" />
				</div>

				<div className="flex-1 flex flex-col justify-between ">
					<div className="md:mt-0 my-[20px]">
						<p className="text-[32px] text-[#00FFFF] font-bold">
							Starksport NFT Utilities
						</p>
						<p className="text-[20px] text-white font-bold">
							3000 Limited Edition
						</p>
						<p className="md:mt-10 mt-[20px] text-base">
							- Early access & Freemint for the upcoming PolySport project.
						</p>
						<p className="text-base space-y-1 ">
							- Boosting your revenue sharings
						</p>
						<p className="text-base  ">
							- Boosting your allocations on Starksport Launchpad.
						</p>
						<p className="text-base  ">
							- Access NFT Lending on Starksport Marketplace.
						</p>
						<p className="text-base  ">
							- Airdrop 300 SFN tokens for NFT holders.
						</p>
					</div>
					{/* <CountdownTimer /> */}
					{/* <Button2 title="MINT NFT" className="mt-10" /> */}
					<div className="md:mt-10 mt-[20px]">
						<div className="flex md:flex-row flex-col justify-between">
							<p className="">Total Minted: {totalMinted}</p>
							<p className="">Price: 0.015 ETH</p>
						</div>
						<div
							className="cursor-pointer h-fit py-3 px-4 mt-2 shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center"
							onClick={() => handleMint()}
						>
							<p className="text-[20px] uppercase font-bold">Mint nft</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const PremierLeagueMint = () => {
	const [totalMinted, setTotalMinted] = useState(0);
	const { status } = useAccount();

	useEffect(() => {
		const fetchData = async () => {
			let totalMinted = 0;
			for (
				let nftAddressIndex = 0;
				nftAddressIndex < logoAddressesArray.length;
				nftAddressIndex++
			) {
				const nftAddress = logoAddressesArray[nftAddressIndex];
				const nftContract = new Contract(logoAbi, nftAddress, provider);
				const totalSupplyNft = await nftContract.call("totalSupply");

				totalMinted += totalSupplyNft.totalSupply.low.words[0];
			}
			setTotalMinted(totalMinted);
		};
		void fetchData();
	}, []);

	const calls = [
		{
			contractAddress: ethAddress,
			entrypoint: "approve",
			calldata: [logoAddressesArray[totalMinted % 20], "1300000000000000", 0],
		},
		{
			contractAddress: logoAddressesArray[totalMinted % 20],
			entrypoint: "mint",
			calldata: [],
		},
	];

	const { wallet } = useGlobalContext();

	const handleMint = async () => {
		if (
			status == "connected" ||
			(wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected)
		) {
			if (wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected) {
				await window.okxwallet.starknet.account.execute({
					contractAddress: ethAddress,
					entrypoint: "approve",
					calldata: [
						logoAddressesArray[totalMinted % 20],
						"1300000000000000",
						0,
					],
				});

				return window.okxwallet.starknet.account.execute({
					contractAddress: logoAddressesArray[totalMinted % 20],
					entrypoint: "mint",
					calldata: [],
				});
			} else return execute();
		} else {
			alert("Please connect wallet");
		}
	};

	const { execute } = useStarknetExecute({ calls });

	return (
		<div className="py-[120px] flex flex-col items-center ">
			<img src={PremierLeague} alt="" className="lg:block hidden mx-auto" />
			<img
				src={PremierLeagueMobile}
				alt=""
				className="lg:hidden block mx-auto"
			/>

			<div className="flex relative md:flex-row flex-col lg:p-[40px] md:p-[30px] p-[20px] rounded-[21px] mt-[70px] w-full max-w-[1150px]  overflow-hidden border-[#00FFFF] border-[1px]">
				<img
					src={EventBanner}
					alt=""
					className="w-full h-full absolute inset-0 -z-10 md:block hidden"
				/>
				<img
					src={EventBannerMobile}
					alt=""
					className="w-full absolute inset-0 -z-10 h-full md:hidden block"
				/>
				<div className="lg:max-w-[420px] w-full md:max-w-[300px] h-full aspect-square  rounded-[12px]  md:mr-[30px] lg:mr-[40px]">
					<img src={PremireLeagueGif} alt="" className="h-full w-full" />
				</div>

				<div className="flex-1 flex flex-col justify-between ">
					<div className="md:mt-0 my-[20px]">
						<p className="text-[32px] text-[#00FFFF] font-bold">Game Rule</p>
						<p className=" ">
							- You can mint to receive randomly a football club logo in Premier
							League.
						</p>
						<p className="">- Mint Price is 0.0013 ETH.</p>
						<p className=" ">
							- No limit, the more you mint, the more chances you have to win.
						</p>
					</div>
					<div className="space-y-2">
						<p className="text-[32px] text-[#00FFFF] font-bold ">Reward</p>
						<p className="text-base  ">
							- 80% of the revenue will be distributed to the holders of the
							champion team logo.
						</p>
						<p className="text-base ">
							- 20% of the revenue will be distributed to treasury.
						</p>
					</div>

					{/* <Button2 title="MINT NFT" className="mt-10" /> */}
					<div className="md:mt-10 mt-[20px]">
						<div className="flex md:flex-row flex-col justify-between">
							<p className="">Total Minted: {totalMinted}</p>
							<p className="">Price: 0.0013 ETH</p>
						</div>
						<div
							className="cursor-pointer h-fit py-3 px-4 mt-2 shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center"
							onClick={() => handleMint()}
						>
							<p className="text-[20px] uppercase font-bold">Mint nft</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const UEFALeagueMint = () => {
	const [totalMinted, setTotalMinted] = useState(0);
	const { status } = useAccount();

	useEffect(() => {
		const fetchData = async () => {
			let totalMinted = 0;
			for (
				let nftAddressIndex = 0;
				nftAddressIndex < nftC1AddressesArray.length;
				nftAddressIndex++
			) {
				const nftAddress = nftC1AddressesArray[nftAddressIndex];
				const nftContract = new Contract(logoAbi, nftAddress, provider);
				const totalSupplyNft = await nftContract.call("totalSupply");

				totalMinted += totalSupplyNft.totalSupply.low.words[0];
			}
			setTotalMinted(totalMinted);
		};
		void fetchData();
	}, []);

	const calls = [
		{
			contractAddress: ethAddress,
			entrypoint: "approve",
			calldata: [nftC1AddressesArray[totalMinted % 32], "1300000000000000", 0],
		},
		{
			contractAddress: nftC1AddressesArray[totalMinted % 32],
			entrypoint: "mint",
			calldata: [],
		},
	];

	const { wallet } = useGlobalContext();

	const handleMint = async () => {
		if (
			status == "connected" ||
			(wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected)
		) {
			if (wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected) {
				await window.okxwallet.starknet.account.execute({
					contractAddress: ethAddress,
					entrypoint: "approve",
					calldata: [
						nftC1AddressesArray[totalMinted % 32],
						"1300000000000000",
						0,
					],
				});

				return window.okxwallet.starknet.account.execute({
					contractAddress: nftC1AddressesArray[totalMinted % 32],
					entrypoint: "mint",
					calldata: [],
				});
			} else return execute();
		} else {
			alert("Please connect wallet");
		}
	};

	const { execute } = useStarknetExecute({ calls });

	return (
		<div className=" flex flex-col pb-[120px] items-center ">
			<img src={UEFA} alt="" className="lg:block hidden mx-auto" />
			<img src={UEFAMobile} alt="" className="lg:hidden block mx-auto" />

			<div className="flex relative md:flex-row flex-col lg:p-[40px] md:p-[30px] p-[20px] rounded-[21px] mt-[70px] w-full max-w-[1150px]  overflow-hidden border-[#00FFFF] border-[1px]">
				<img
					src={EventBanner}
					alt=""
					className="w-full h-full absolute inset-0 -z-10 md:block hidden"
				/>
				<img
					src={EventBannerMobile}
					alt=""
					className="w-full absolute inset-0 -z-10 h-full md:hidden block"
				/>
				<img
					src={UEFAImg}
					alt=""
					className="lg:max-w-[420px] md:max-w-[300px] h-full aspect-square  rounded-[12px]  md:mr-[30px] lg:mr-[40px]"
				/>

				<div className="flex-1 flex flex-col justify-between ">
					<div className="md:mt-0 my-[20px]">
						<p className="text-[32px] text-[#00FFFF] font-bold">Game Rule</p>
						<p className=" ">
							- You can mint to receive randomly a football club Jersey in
							Champions League
						</p>
						<p className="">- Mint Price is 0.0013 ETH.</p>
						<p className="">
							- No limit, the more you mint, the more chances you have to win.
						</p>
					</div>
					<div className="space-y-2">
						<p className="text-[32px] text-[#00FFFF] font-bold ">Reward</p>

						<p className=" ">
							- 80% of the revenue will be distributed to the holders of the
							champion team jersey.
						</p>
						<p className="">
							- 20% of the revenue will be distributed to treasury.
						</p>
					</div>

					{/* <Button2 title="MINT NFT" className="mt-10" /> */}
					<div className="md:mt-10 mt-[20px]">
						<div className="flex md:flex-row flex-col justify-between">
							<p className="">Total Minted: {totalMinted}</p>
							<p className="">Price: 0.0013 ETH</p>
						</div>
						<div
							className="cursor-pointer h-fit py-3 px-4 mt-2 shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center"
							onClick={() => handleMint()}
						>
							<p className="text-[20px] uppercase font-bold">Mint NFT</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const LogoMint = () => {
	const [totalMinted, setTotalMinted] = useState(0);
	const { status } = useAccount();
	const [nftAddressToMint, setNftAddressToMint] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			let totalMinted = 0;
			for (
				let nftAddressIndex = 0;
				nftAddressIndex < logoAddressesArray.length;
				nftAddressIndex++
			) {
				const nftAddress = logoAddressesArray[nftAddressIndex];
				const nftContract = new Contract(logoAbi, nftAddress, provider);
				const totalSupplyNft = await nftContract.call("totalSupply");

				totalMinted += totalSupplyNft.totalSupply.low.words[0];
			}
			setTotalMinted(totalMinted);
		};
		void fetchData();
	}, []);

	const calls = [
		{
			contractAddress: ethAddress,
			entrypoint: "approve",
			calldata: [nftAddressToMint, "1300000000000000", 0],
		},
		{
			contractAddress: nftAddressToMint,
			entrypoint: "mint",
			calldata: [],
		},
	];

	const { wallet } = useGlobalContext();

	const handleMint = async () => {
		if (
			status == "connected" ||
			(wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected)
		) {
			if (wallet === WALLETS.OKX && window.okxwallet.starknet.isConnected) {
				await window.okxwallet.starknet.account.execute({
					contractAddress: ethAddress,
					entrypoint: "approve",
					calldata: [nftAddressToMint, "1300000000000000", 0],
				});

				return window.okxwallet.starknet.account.execute({
					contractAddress: nftAddressToMint,
					entrypoint: "mint",
					calldata: [],
				});
			} else return execute();
		} else {
			alert("Please connect wallet");
		}
	};

	const { execute } = useStarknetExecute({ calls });

	return (
		<div className="py-40 flex flex-col px-5 items-center">
			{/* <p className="text-[48px] font-bold">Logo NFTs</p> */}
			<p className=" text-[48px] font-bold text-center font-paytone">
				Click To Mint Your Team Logo NFT
			</p>
			<p className="mt-10 text-[24px] font-bold">Total Minted: {totalMinted}</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-10 bg-blur rounded-md mt-20">
				{logoAddressesObjectArray.map((logoObj: any) => {
					return (
						<div className="flex md:flex-row flex-col gap-10 px-10 py-10 bg-blur rounded-md cursor-pointer">
							<img
								className="w-64 h-64 object-cover  rounded-md"
								onClick={() => {
									setNftAddressToMint(logoObj.nftAddress);
									handleMint();
								}}
								src={logoObj.src}
								alt=""
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const NFTMint = () => {
	return (
		<div className="lg:px-[180px] md:px-[60px] px-[20px]">
			<StarksportMint />
			<PremierLeagueMint />
			<UEFALeagueMint />
			{/* <LogoMint /> */}
		</div>
	);
};

export default NFTMint;
