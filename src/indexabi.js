export const address = "0xe0265E7e2bfc977167f57eA6BD1790d5e0c4B447";
export const abi =  [
    {
      "type": "constructor",
      "payable": false,
      "inputs": [{ "type": "string", "name": "_name" }]
    },
    {
      "type": "error",
      "name": "AlreadyListed",
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "nftId" }
      ]
    },
    { "type": "error", "name": "AuctionClosed", "inputs": [] },
    { "type": "error", "name": "AuctionHasBids", "inputs": [] },
    { "type": "error", "name": "AuctionStillOpen", "inputs": [] },
    { "type": "error", "name": "InvalidAddresses", "inputs": [] },
    { "type": "error", "name": "InvalidAuction", "inputs": [] },
    { "type": "error", "name": "InvalidAuctionCreator", "inputs": [] },
    { "type": "error", "name": "InvalidBidPrice", "inputs": [] },
    { "type": "error", "name": "InvalidPercentageAmount", "inputs": [] },
    { "type": "error", "name": "NoBidsToClaim", "inputs": [] },
    { "type": "error", "name": "NotApprovedForMarketplace", "inputs": [] },
    {
      "type": "error",
      "name": "NotListed",
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "nftId" }
      ]
    },
    { "type": "error", "name": "NotOwner", "inputs": [] },
    { "type": "error", "name": "PriceMustBeAboveZero", "inputs": [] },
    {
      "type": "error",
      "name": "PriceNotMet",
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "nftId" },
        { "type": "uint256", "name": "price" }
      ]
    },
    {
      "type": "event",
      "anonymous": false,
      "name": "NewAuction",
      "inputs": [
        { "type": "uint256", "name": "index", "indexed": false },
        { "type": "address", "name": "addressNFTCollection", "indexed": false },
        { "type": "uint256", "name": "nftId", "indexed": false },
        { "type": "address", "name": "mintedBy", "indexed": false },
        { "type": "address", "name": "currentBidOwner", "indexed": false },
        { "type": "uint256", "name": "currentBidPrice", "indexed": false },
        { "type": "uint256", "name": "endAuction", "indexed": false },
        { "type": "uint256", "name": "bidCount", "indexed": false }
      ]
    },
    {
      "type": "event",
      "anonymous": false,
      "name": "OwnershipTransferred",
      "inputs": [
        { "type": "address", "name": "previousOwner", "indexed": true },
        { "type": "address", "name": "newOwner", "indexed": true }
      ]
    },
    {
      "type": "function",
      "name": "RoyaltyRecord",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "address" }],
      "outputs": [
        { "type": "address", "name": "royaltyReciever" },
        { "type": "uint256", "name": "percentageOfRoyalty" }
      ]
    },
    {
      "type": "function",
      "name": "acceptOffer",
      "constant": false,
      "stateMutability": "payable",
      "payable": true,
      "inputs": [{ "type": "uint256", "name": "_offerId" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "allAuctions",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256" }],
      "outputs": [
        { "type": "uint256", "name": "index" },
        { "type": "address", "name": "addressNFTCollection" },
        { "type": "uint256", "name": "nftId" },
        { "type": "address", "name": "creator" },
        { "type": "address", "name": "currentBidOwner" },
        { "type": "uint256", "name": "currentBidPrice" },
        { "type": "uint256", "name": "endAuction" },
        { "type": "uint256", "name": "bidCount" }
      ]
    },
    {
      "type": "function",
      "name": "allListings",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256" }],
      "outputs": [
        { "type": "uint256", "name": "L_index" },
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "NFTId" },
        { "type": "bool", "name": "isListed" }
      ]
    },
    {
      "type": "function",
      "name": "allOffers",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256" }],
      "outputs": [
        { "type": "uint256", "name": "offerId" },
        { "type": "address", "name": "sender" },
        { "type": "address", "name": "reciever" },
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "id" },
        { "type": "uint256", "name": "price" },
        { "type": "bool", "name": "accepted" },
        { "type": "bool", "name": "cancel" }
      ]
    },
    {
      "type": "function",
      "name": "auctionTimeLimit",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "bid",
      "constant": false,
      "stateMutability": "payable",
      "payable": true,
      "inputs": [{ "type": "uint256", "name": "_auctionIndex" }],
      "outputs": [{ "type": "bool" }]
    },
    {
      "type": "function",
      "name": "buyItem",
      "constant": false,
      "stateMutability": "payable",
      "payable": true,
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "nftId" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "calculateMarketPlaceCommision",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "_price" }],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "calculateRoyalties",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "_price" }
      ],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "calculateSellerMoney",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "_price" }],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "cancelListing",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "nftId" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "cancelOffer",
      "constant": false,
      "stateMutability": "payable",
      "payable": true,
      "inputs": [{ "type": "uint256", "name": "_offerId" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "claimNFT",
      "constant": false,
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "_auctionIndex" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "claimToken",
      "constant": false,
      "stateMutability": "payable",
      "payable": true,
      "inputs": [{ "type": "uint256", "name": "_auctionIndex" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "createAuction",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "_nftId" },
        { "type": "uint256", "name": "_initialBid" },
        { "type": "uint256", "name": "endAuction" }
      ],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "getAllListings",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [
        {
          "type": "tuple[]",
          "components": [
            { "type": "uint256", "name": "L_index" },
            { "type": "address", "name": "_addressNFTCollection" },
            { "type": "uint256", "name": "NFTId" },
            { "type": "bool", "name": "isListed" }
          ]
        }
      ]
    },
    {
      "type": "function",
      "name": "getAllOffers",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [
        {
          "type": "tuple[]",
          "components": [
            { "type": "uint256", "name": "offerId" },
            { "type": "address", "name": "sender" },
            { "type": "address", "name": "reciever" },
            { "type": "address", "name": "_addressNFTCollection" },
            { "type": "uint256", "name": "id" },
            { "type": "uint256", "name": "price" },
            { "type": "bool", "name": "accepted" },
            { "type": "bool", "name": "cancel" }
          ]
        }
      ]
    },
    {
      "type": "function",
      "name": "getAuctions",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [
        {
          "type": "tuple[]",
          "components": [
            { "type": "uint256", "name": "index" },
            { "type": "address", "name": "addressNFTCollection" },
            { "type": "uint256", "name": "nftId" },
            { "type": "address", "name": "creator" },
            { "type": "address", "name": "currentBidOwner" },
            { "type": "uint256", "name": "currentBidPrice" },
            { "type": "uint256", "name": "endAuction" },
            { "type": "uint256", "name": "bidCount" }
          ]
        }
      ]
    },
    {
      "type": "function",
      "name": "getCurrentBid",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "_auctionIndex" }],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "getCurrentBidOwner",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "_auctionIndex" }],
      "outputs": [{ "type": "address" }]
    },
    {
      "type": "function",
      "name": "getListing",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "nftId" }
      ],
      "outputs": [
        {
          "type": "tuple",
          "components": [
            { "type": "uint256", "name": "L_index" },
            { "type": "uint256", "name": "price" },
            { "type": "address", "name": "seller" },
            { "type": "bool", "name": "isListedState" }
          ]
        }
      ]
    },
    {
      "type": "function",
      "name": "getListingFee",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "getRoyaltyReciever",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "address", "name": "_addressNFTCollection" }],
      "outputs": [{ "type": "address" }]
    },
    {
      "type": "function",
      "name": "getTotalFunds",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "getmarketPercentageCommision",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "index",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "isOpen",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "_auctionIndex" }],
      "outputs": [{ "type": "bool" }]
    },
    {
      "type": "function",
      "name": "listItem",
      "constant": false,
      "stateMutability": "payable",
      "payable": true,
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "nftId" },
        { "type": "uint256", "name": "price" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "listingFee",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "listingIndex",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "marketPercentageCommision",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "name",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "string" }]
    },
    {
      "type": "function",
      "name": "offerId",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "onERC721Received",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address" },
        { "type": "address" },
        { "type": "uint256" },
        { "type": "bytes" }
      ],
      "outputs": [{ "type": "bytes4" }]
    },
    {
      "type": "function",
      "name": "owner",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "address" }]
    },
    {
      "type": "function",
      "name": "refund",
      "constant": false,
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "_auctionIndex" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "constant": false,
      "payable": false,
      "inputs": [],
      "outputs": []
    },
    {
      "type": "function",
      "name": "s_listings",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "address" }, { "type": "uint256" }],
      "outputs": [
        { "type": "uint256", "name": "L_index" },
        { "type": "uint256", "name": "price" },
        { "type": "address", "name": "seller" },
        { "type": "bool", "name": "isListedState" }
      ]
    },
    {
      "type": "function",
      "name": "sendOffer",
      "constant": false,
      "stateMutability": "payable",
      "payable": true,
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "nftId" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "setAuctionTimeLimit",
      "constant": false,
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "_time" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "setListingFee",
      "constant": false,
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "_newFee" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "setRoyalty",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "address", "name": "_royaltyReciever" },
        { "type": "uint256", "name": "_royaltyPercentage" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "setpercentageCommision",
      "constant": false,
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "_commision" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "constant": false,
      "payable": false,
      "inputs": [{ "type": "address", "name": "newOwner" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateListing",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "uint256", "name": "nftId" },
        { "type": "uint256", "name": "newPrice" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "updateRoyalty",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address", "name": "_addressNFTCollection" },
        { "type": "address", "name": "_royaltyReciever" },
        { "type": "uint256", "name": "_royaltyPercentage" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "withdrawfunds",
      "constant": false,
      "stateMutability": "payable",
      "payable": true,
      "inputs": [{ "type": "address", "name": "_to" }],
      "outputs": []
    }
  ];