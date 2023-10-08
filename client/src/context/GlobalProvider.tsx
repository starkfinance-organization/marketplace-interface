import { useReducer } from "react";
import { AppReducer } from "./AppReducer";
import { GlobalContext, initState } from "./GlobalContext";
import { CONTEXT_ACTIONS, WALLETS, WALLET_TYPES } from "./types";

// provider component
export const GlobalProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(AppReducer, initState);

	const setWalletConnected = (
		wallet: WALLETS | undefined,
		walletAddress: string,
		walletType: WALLET_TYPES = WALLET_TYPES.STARKNET
	) =>
		dispatch({
			type: CONTEXT_ACTIONS.SET_WALLET_CONNECTED,
			payload: { wallet, walletAddress, walletType },
		});

	return (
		<GlobalContext.Provider value={{ ...state, setWalletConnected }}>
			{children}
		</GlobalContext.Provider>
	);
};