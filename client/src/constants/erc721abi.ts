export const erc721abi = {
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
      data: [
        {
          name: "from_",
          type: "felt",
        },
        {
          name: "to",
          type: "felt",
        },
        {
          name: "tokenId",
          type: "Uint256",
        },
      ],
      keys: [],
      name: "Transfer",
      type: "event",
    },
    {
      data: [
        {
          name: "owner",
          type: "felt",
        },
        {
          name: "approved",
          type: "felt",
        },
        {
          name: "tokenId",
          type: "Uint256",
        },
      ],
      keys: [],
      name: "Approval",
      type: "event",
    },
    {
      data: [
        {
          name: "owner",
          type: "felt",
        },
        {
          name: "operator",
          type: "felt",
        },
        {
          name: "approved",
          type: "felt",
        },
      ],
      keys: [],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      data: [
        {
          name: "previousOwner",
          type: "felt",
        },
        {
          name: "newOwner",
          type: "felt",
        },
      ],
      keys: [],
      name: "OwnershipTransferred",
      type: "event",
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
      inputs: [
        {
          name: "name",
          type: "felt",
        },
        {
          name: "symbol",
          type: "felt",
        },
        {
          name: "owner_contract",
          type: "felt",
        },
        {
          name: "payment_token_address",
          type: "felt",
        },
        {
          name: "mint_price",
          type: "Uint256",
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
      inputs: [
        {
          name: "token_id",
          type: "Uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          name: "token_uri_len",
          type: "felt",
        },
        {
          name: "token_uri",
          type: "felt*",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "totalSupply",
          type: "Uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "owner_contract_address",
          type: "felt",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          name: "index",
          type: "Uint256",
        },
      ],
      name: "tokenByIndex",
      outputs: [
        {
          name: "tokenId",
          type: "Uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          name: "owner",
          type: "felt",
        },
        {
          name: "index",
          type: "Uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          name: "tokenId",
          type: "Uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          name: "interfaceId",
          type: "felt",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          name: "success",
          type: "felt",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "name",
          type: "felt",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "symbol",
          type: "felt",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          name: "owner",
          type: "felt",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "Uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          name: "tokenId",
          type: "Uint256",
        },
      ],
      name: "ownerOf",
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
      inputs: [
        {
          name: "tokenId",
          type: "Uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          name: "approved",
          type: "felt",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          name: "owner",
          type: "felt",
        },
        {
          name: "operator",
          type: "felt",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          name: "isApproved",
          type: "felt",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "contractURI",
      outputs: [
        {
          name: "uri_len",
          type: "felt",
        },
        {
          name: "uri",
          type: "felt*",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          name: "to",
          type: "felt",
        },
        {
          name: "tokenId",
          type: "Uint256",
        },
      ],
      name: "approve",
      outputs: [],
      type: "function",
    },
    {
      inputs: [
        {
          name: "operator",
          type: "felt",
        },
        {
          name: "approved",
          type: "felt",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      type: "function",
    },
    {
      inputs: [
        {
          name: "from_",
          type: "felt",
        },
        {
          name: "to",
          type: "felt",
        },
        {
          name: "tokenId",
          type: "Uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      type: "function",
    },
    {
      inputs: [
        {
          name: "from_",
          type: "felt",
        },
        {
          name: "to",
          type: "felt",
        },
        {
          name: "tokenId",
          type: "Uint256",
        },
        {
          name: "data_len",
          type: "felt",
        },
        {
          name: "data",
          type: "felt*",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      type: "function",
    },
    {
      inputs: [],
      name: "mint",
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
      name: "permissionedMint",
      outputs: [],
      type: "function",
    },
    {
      inputs: [
        {
          name: "tokenId",
          type: "Uint256",
        },
      ],
      name: "burn",
      outputs: [],
      type: "function",
    },
    {
      inputs: [
        {
          name: "base_token_uri_len",
          type: "felt",
        },
        {
          name: "base_token_uri",
          type: "felt*",
        },
        {
          name: "token_uri_suffix",
          type: "felt",
        },
      ],
      name: "setBaseURI",
      outputs: [],
      type: "function",
    },
    {
      inputs: [
        {
          name: "contractURI_len",
          type: "felt",
        },
        {
          name: "contractURI",
          type: "felt*",
        },
      ],
      name: "setContractURI",
      outputs: [],
      type: "function",
    },
    {
      inputs: [
        {
          name: "new_implementation",
          type: "felt",
        },
      ],
      name: "upgrade",
      outputs: [],
      type: "function",
    },
  ],
};
