//** Libs */
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

//** Icons */
import ArgentXPng from "@/assets/png/argent.png";
import BraavosPng from "@/assets/png/braavos.jpg";
import OkxPng from "@/assets/png/okx.png";
import { useConnectors } from "@starknet-react/core";
import { VscClose } from "react-icons/vsc";
import { useGlobalContext } from "@/context/GlobalContext";
import { WALLETS } from "@/context/types";

type ModalWalletProps = {
	isShowing: boolean;
	hide: () => void;
};

declare const window: any;

const ModalWallet: React.FC<ModalWalletProps> = ({ isShowing, hide }) => {
	const { available, connectors, connect, refresh } = useConnectors();
	const { setWalletConnected } = useGlobalContext();

	useEffect(() => {
		const interval = setInterval(refresh, 5000);
		return () => clearInterval(interval);
	}, [refresh]);

	const handleClose = () => {
		hide();
	};

	const handleConnect = async (connector: any, okx = false) => {
		if (!okx) {
			const isWalletConnected = available.find(
				(availableConnector) => availableConnector.id() === connector.id()
			);

			isWalletConnected
				? connect(connector)
				: alert(`Please install ${connector.id()} wallet!`);
		} else {
			if (window.okxwallet.starknet.isConnected) {
				setWalletConnected(
					WALLETS.OKX,
					window.okxwallet.starknet.selectedAddress
				);
			}

			const [address] = await window.okxwallet.starknet.enable();
			setWalletConnected(WALLETS.OKX, address);
		}

		handleClose();
	};

	return isShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<div
						className="fixed left-0 right-0 top-0 z-50 h-screen w-screen bg-black/70 backdrop-blur-lg"
						onClick={handleClose}
					/>
					<div
						className="fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-gray-900 rounded-lg"
						aria-modal
						aria-hidden
						tabIndex={-1}
						role="dialog"
					>
						<div
							className="relative z-50 mx-auto w-fit md:min-w-[400px] min-w-[300px] overflow-hidden rounded-xl "
							onClick={(event) => {
								event.stopPropagation();
							}}
						>
							<div className="flex w-full justify-between rounded-t-xl px-5 py-6">
								<div className="flex items-center gap-2">
									<p className=" text-[20px] font-bold">
										Connect to Stark Sport
									</p>
								</div>
								<button
									onClick={handleClose}
									className="grid h-8 w-8 place-items-center rounded-lg bg-gray-700 hover:bg-gray-700"
								>
									{/* <img src={CloseSVG} alt="arrow" className="h-5" /> */}
									<VscClose />
								</button>
							</div>

							<div className=" items-center justify-center gap-10 px-5 pb-7 pt-7 ">
								<div
									className="flex items-center mb-4 rounded-md bg-gray-800 p-4 cursor-pointer"
									onClick={() => handleConnect(connectors[1])}
								>
									<img
										src={ArgentXPng}
										alt="wallet_logo_argentx"
										className="h-12 cursor-pointer rounded-lg"
									/>
									<p className="flex-1 text-center font-medium text-2xl">
										Argent X
									</p>
								</div>
								<div
									className="flex items-center  rounded-md bg-gray-800 p-4 cursor-pointer mb-4"
									onClick={() => handleConnect(connectors[0])}
								>
									<img
										src={BraavosPng}
										alt="wallet_logo_braavos"
										className="h-12 cursor-pointer rounded-lg"
									/>
									<p className="flex-1 text-center font-medium text-2xl">
										Braavos
									</p>
								</div>

								<div
									className="flex items-center  rounded-md bg-gray-800 p-4 cursor-pointer"
									onClick={() => handleConnect(undefined, true)}
								>
									<img
										src={OkxPng}
										alt="wallet_logo_braavos"
										className="h-12 cursor-pointer rounded-lg"
									/>
									<p className="flex-1 text-center font-medium text-2xl">OKX</p>
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default ModalWallet;
