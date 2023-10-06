import { CONTEXT_ACTIONS } from "./types";

export const AppReducer = (
	state: any,
	{ payload, type }: { payload: any; type: CONTEXT_ACTIONS }
) => {
	switch (type) {
		case CONTEXT_ACTIONS.SET_WALLET_CONNECTED:
			return {
				...state,
				wallet: payload.wallet,
				walletAddress: payload.walletAddress,
				walletType: payload.walletType,
			};

		default:
			return state;
	}
};