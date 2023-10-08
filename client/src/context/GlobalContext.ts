import { createContext, useContext } from "react";

import { WALLET_TYPES, WALLETS } from "./types";

type InitStateType = {
	walletType: WALLET_TYPES;
	wallet: WALLETS | undefined;
	walletAddress: string;
	setWalletConnected: (
		wallet: WALLETS | undefined,
		walletAddress: string,
		walletType?: WALLET_TYPES
	) => void;
};

// init state
export const initState: InitStateType = {
	walletType: WALLET_TYPES.STARKNET,
	wallet: undefined,
	walletAddress: "",
	setWalletConnected: () => {},
};

// create context
export const GlobalContext = createContext<InitStateType>(initState);

export const useGlobalContext = () => useContext(GlobalContext);
