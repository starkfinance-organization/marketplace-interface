const marketplace = {
	abi: [
		{
			members: [
				{
					name: "low",
					offset: 0,
					type: "felt",
				},
				{
					name: "high",
					offset: 1,
					type: "felt",
				},
			],
			name: "Uint256",
			size: 2,
			type: "struct",
		},
		{
			members: [
				{
					name: "isOrderAsk",
					offset: 0,
					type: "felt",
				},
				{
					name: "taker",
					offset: 1,
					type: "felt",
				},
				{
					name: "price",
					offset: 2,
					type: "felt",
				},
				{
					name: "tokenId",
					offset: 3,
					type: "Uint256",
				},
				{
					name: "minPercentageToAsk",
					offset: 5,
					type: "felt",
				},
				{
					name: "params",
					offset: 6,
					type: "felt",
				},
			],
			name: "TakerOrder",
			size: 7,
			type: "struct",
		},
		{
			members: [
				{
					name: "isOrderAsk",
					offset: 0,
					type: "felt",
				},
				{
					name: "signer",
					offset: 1,
					type: "felt",
				},
				{
					name: "collection",
					offset: 2,
					type: "felt",
				},
				{
					name: "price",
					offset: 3,
					type: "felt",
				},
				{
					name: "tokenId",
					offset: 4,
					type: "Uint256",
				},
				{
					name: "amount",
					offset: 6,
					type: "felt",
				},
				{
					name: "strategy",
					offset: 7,
					type: "felt",
				},
				{
					name: "currency",
					offset: 8,
					type: "felt",
				},
				{
					name: "nonce",
					offset: 9,
					type: "felt",
				},
				{
					name: "startTime",
					offset: 10,
					type: "felt",
				},
				{
					name: "endTime",
					offset: 11,
					type: "felt",
				},
				{
					name: "minPercentageToAsk",
					offset: 12,
					type: "felt",
				},
				{
					name: "params",
					offset: 13,
					type: "felt",
				},
			],
			name: "MakerOrder",
			size: 14,
			type: "struct",
		},
		{
			data: [
				{
					name: "implementation",
					type: "felt",
				},
			],
			keys: [],
			name: "Upgraded",
			type: "event",
		},
		{
			data: [
				{
					name: "previousAdmin",
					type: "felt",
				},
				{
					name: "newAdmin",
					type: "felt",
				},
			],
			keys: [],
			name: "AdminChanged",
			type: "event",
		},
		{
			data: [
				{
					name: "user",
					type: "felt",
				},
				{
					name: "newMinNonce",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "CancelAllOrders",
			type: "event",
		},
		{
			data: [
				{
					name: "user",
					type: "felt",
				},
				{
					name: "orderNonce",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "CancelOrder",
			type: "event",
		},
		{
			data: [
				{
					name: "hash",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "NewHashDomain",
			type: "event",
		},
		{
			data: [
				{
					name: "recipient",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "NewProtocolFeeRecipient",
			type: "event",
		},
		{
			data: [
				{
					name: "manager",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "NewCurrencyManager",
			type: "event",
		},
		{
			data: [
				{
					name: "manager",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "NewExecutionManager",
			type: "event",
		},
		{
			data: [
				{
					name: "manager",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "NewRoyaltyFeeManager",
			type: "event",
		},
		{
			data: [
				{
					name: "selector",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "NewTransferSelectorNFT",
			type: "event",
		},
		{
			data: [
				{
					name: "checker",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "NewSignatureChecker",
			type: "event",
		},
		{
			data: [
				{
					name: "collection",
					type: "felt",
				},
				{
					name: "tokenId",
					type: "Uint256",
				},
				{
					name: "royaltyRecipient",
					type: "felt",
				},
				{
					name: "currency",
					type: "felt",
				},
				{
					name: "amount",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "RoyaltyPayment",
			type: "event",
		},
		{
			data: [
				{
					name: "orderHash",
					type: "felt",
				},
				{
					name: "orderNonce",
					type: "felt",
				},
				{
					name: "taker",
					type: "felt",
				},
				{
					name: "maker",
					type: "felt",
				},
				{
					name: "strategy",
					type: "felt",
				},
				{
					name: "currency",
					type: "felt",
				},
				{
					name: "collection",
					type: "felt",
				},
				{
					name: "tokenId",
					type: "Uint256",
				},
				{
					name: "amount",
					type: "felt",
				},
				{
					name: "price",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "TakerAsk",
			type: "event",
		},
		{
			data: [
				{
					name: "orderHash",
					type: "felt",
				},
				{
					name: "orderNonce",
					type: "felt",
				},
				{
					name: "taker",
					type: "felt",
				},
				{
					name: "maker",
					type: "felt",
				},
				{
					name: "strategy",
					type: "felt",
				},
				{
					name: "currency",
					type: "felt",
				},
				{
					name: "collection",
					type: "felt",
				},
				{
					name: "tokenId",
					type: "Uint256",
				},
				{
					name: "amount",
					type: "felt",
				},
				{
					name: "price",
					type: "felt",
				},
				{
					name: "originalTaker",
					type: "felt",
				},
				{
					name: "timestamp",
					type: "felt",
				},
			],
			keys: [],
			name: "TakerBid",
			type: "event",
		},
		{
			inputs: [
				{
					name: "hash",
					type: "felt",
				},
				{
					name: "recipient",
					type: "felt",
				},
				{
					name: "currency",
					type: "felt",
				},
				{
					name: "execution",
					type: "felt",
				},
				{
					name: "feeManager",
					type: "felt",
				},
				{
					name: "checker",
					type: "felt",
				},
				{
					name: "owner",
					type: "felt",
				},
				{
					name: "proxy_admin",
					type: "felt",
				},
			],
			name: "initializer",
			outputs: [],
			type: "function",
		},
		{
			inputs: [],
			name: "owner",
			outputs: [
				{
					name: "owner",
					type: "felt",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "hashDomain",
			outputs: [
				{
					name: "hash",
					type: "felt",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "protocolFeeRecipient",
			outputs: [
				{
					name: "recipient",
					type: "felt",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "currencyManager",
			outputs: [
				{
					name: "manager",
					type: "felt",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "executionManager",
			outputs: [
				{
					name: "manager",
					type: "felt",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "royaltyFeeManager",
			outputs: [
				{
					name: "manager",
					type: "felt",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "transferSelectorNFT",
			outputs: [
				{
					name: "selector",
					type: "felt",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "signatureChecker",
			outputs: [
				{
					name: "checker",
					type: "felt",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					name: "user",
					type: "felt",
				},
			],
			name: "userMinOrderNonce",
			outputs: [
				{
					name: "nonce",
					type: "felt",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					name: "user",
					type: "felt",
				},
				{
					name: "nonce",
					type: "felt",
				},
			],
			name: "isUserOrderNonceExecutedOrCancelled",
			outputs: [
				{
					name: "executedOrCancelled",
					type: "felt",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					name: "minNonce",
					type: "felt",
				},
			],
			name: "cancelAllOrdersForSender",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "orderNonce",
					type: "felt",
				},
			],
			name: "cancelMakerOrder",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "takerBid",
					type: "TakerOrder",
				},
				{
					name: "makerAsk",
					type: "MakerOrder",
				},
				{
					name: "makerAskSignature_len",
					type: "felt",
				},
				{
					name: "makerAskSignature",
					type: "felt*",
				},
				{
					name: "customNonFungibleTokenRecipient",
					type: "felt",
				},
			],
			name: "matchAskWithTakerBid",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "takerAsk",
					type: "TakerOrder",
				},
				{
					name: "makerBid",
					type: "MakerOrder",
				},
				{
					name: "makerBidSignature_len",
					type: "felt",
				},
				{
					name: "makerBidSignature",
					type: "felt*",
				},
				{
					name: "extraParams_len",
					type: "felt",
				},
				{
					name: "extraParams",
					type: "felt*",
				},
			],
			name: "matchBidWithTakerAsk",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "makerAsk",
					type: "MakerOrder",
				},
				{
					name: "makerAskSignature_len",
					type: "felt",
				},
				{
					name: "makerAskSignature",
					type: "felt*",
				},
				{
					name: "makerBid",
					type: "MakerOrder",
				},
				{
					name: "makerBidSignature_len",
					type: "felt",
				},
				{
					name: "makerBidSignature",
					type: "felt*",
				},
			],
			name: "executeAuctionSale",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "hash",
					type: "felt",
				},
			],
			name: "updateHashDomain",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "recipient",
					type: "felt",
				},
			],
			name: "updateProtocolFeeRecipient",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "manager",
					type: "felt",
				},
			],
			name: "updateCurrencyManager",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "manager",
					type: "felt",
				},
			],
			name: "updateExecutionManager",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "manager",
					type: "felt",
				},
			],
			name: "updateRoyaltyFeeManager",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "selector",
					type: "felt",
				},
			],
			name: "updateTransferSelectorNFT",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "checker",
					type: "felt",
				},
			],
			name: "updateSignatureChecker",
			outputs: [],
			type: "function",
		},
		{
			inputs: [
				{
					name: "newOwner",
					type: "felt",
				},
			],
			name: "transferOwnership",
			outputs: [],
			type: "function",
		},
	],
};
export const marketplaceAbi = marketplace.abi;
