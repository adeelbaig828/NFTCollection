import { ethers } from 'ethers';
import {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  collectionFactoryaddress,
  collectionfactoryABI,
} from './contracts/constant';
import web3Modal from 'web3modal';
import BigNumber from 'bignumber.js';
import { editNfAPI } from './services/nftServices';
import { editCollectionAPI } from './services/collectionServices';
// import React, { useEffect, useState } from 'react';

const key = '92e1e4c867572f2216b3';
const secret = '8b6edd618f851eafa765a08807a8e520da3f2ef6f0e7178942b4b691d56dd0d2';
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signerOrProvider);
const axios = require('axios');
const FormData = require('form-data');

export const uploadFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //making axios POST request to Pinata :arrow_down:
  let data = new FormData();
  data.append('file', file);
  const metadata = JSON.stringify({
    name: 'Upload Media',
    keyvalues: {
      exampleKey: 'exampleValue',
    },
  });
  data.append('pinataMetadata', metadata);
  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,

    customPinPolicy: {
      regions: [
        {
          id: 'FRA1',
          desiredReplicationCount: 1,
        },
        {
          id: 'NYC1',
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append('pinataOptions', pinataOptions);
  return axios
    .post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      console.log('image uploaded', response.data.IpfsHash);

      return {
        success: true,
        pinataURL: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);

      return {
        success: false,
        message: error.message,
      };
    });
};
export const connectingWithSmartContract = async () => {
  try {
    const web3modal = new web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log('something went wrong while connecting with contract ');
  }
};

export const mintNFT = async (tokenURI, price, _bid, _highestBidder, nftDetail, formData) => {
  try {
    const web3modal = new web3Modal();
    const connect = await web3modal.connect();

    const provider = new ethers.providers.Web3Provider(connect);
    const signer = provider.getSigner();

    let mintInstance = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signer);

    let listingprice = await mintInstance.getListPrice();
    listingprice = listingprice.toString();
    const trans = await mintInstance.createToken(tokenURI, price, { value: listingprice });
    await trans.wait();
    await mynftGet(nftDetail, price, formData);
    return trans;
  } catch (error) {
    console.log('Something went wrong to intetract with smart contract');
  }
};

export const mynftGet = async (nftDetail, price, formData) => {
  try {
    const web3modal = new web3Modal();
    const connect = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connect);
    const nftinstance = await connectingWithSmartContract(provider);
    const transactions = await nftinstance.getMyNFTs();
    const mintedNfts = transactions[transactions?.length - 1];
    const token_id_hex = mintedNfts?.tokenId?._hex;
    const tokenId = new BigNumber(token_id_hex);
    const integerTokenId = tokenId?.toNumber();
    const contract_address = mintedNfts[1];
    const updateData = {
      description_short: formData?.desp,
      description_long: nftDetail?.description_long,
      contract_address: contract_address,
      token_id: integerTokenId,
      current_sale_price: price,
      last_sale_price: nftDetail?.last_sale_price ?? '',
    };
    await editNfAPI(updateData, nftDetail?.guid);
    return transactions;
  } catch (error) {
    console.log('somting went wrong While get your NFTs from the blockchain ');
  }
};

const fetchCollectionContract = (signerOrProvider) =>
  new ethers.Contract(collectionFactoryaddress, collectionfactoryABI, signerOrProvider);

export const connectingWithCollection = async () => {
  try {
    const web3modal = new web3Modal();
    const connecting = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connecting);
    const signer = provider.getSigner();
    const contract = fetchCollectionContract(signer);

    return contract;
  } catch (error) {
    console.log('somthing went wrong while creating instance');
  }
};

export const createcollection = async (
  _name,
  _symbol,
  _uri,
  _totalSupply,
  _mintPrice,
  _startDate,
  _expirationDate,
  currentAccount,
  collectionDetails
) => {
  console.log('createcollection details', collectionDetails);
  try {
    console.log('createcollection 1', collectionDetails);

    const instance = await connectingWithCollection();
    console.log('createcollection 2', collectionDetails);

    const transaction = await instance.createCollection(
      _name,
      _symbol,
      _uri,
      _totalSupply,
      2,
      _startDate,
      _expirationDate
    );

    await transaction.wait();
    console.log('transaction', transaction);

    const data = {
      store_name: collectionDetails?.store_name ?? '',
      url_instagram: collectionDetails?.url_instagram ?? '',
      description_short: collectionDetails?.description_short ?? '',
      description_long: collectionDetails?.description_long ?? '',
      url_personal: collectionDetails?.url_personal ?? '',
      url_medium: collectionDetails?.url_medium ?? '',
      url_discord: collectionDetails?.url_discord ?? '',
      url_telegram: collectionDetails?.url_telegram ?? '',
      after_1st_purchase_text: collectionDetails?.after_1st_purchase_text ?? '',
      minting_supply_count: collectionDetails?.minting_supply_count ?? 0,
      minting_coin: collectionDetails?.minting_coin ?? '',
      mint_locked: collectionDetails?.mint_locked ?? 0,
      is_explicit: collectionDetails?.is_explicit ?? 0,
      mintable: collectionDetails?.mintable ?? 0,
      publish: collectionDetails?.publish ?? 0,
      // isActive: 1,
      // created_by: collectionDetails?.created_by ?? '',
      // created_date : new Date().toLocaleString()
      category_code: collectionDetails?.category_code ?? '',
      // url_name: collectionDetails?.url_name ?? '',
      delay_days: collectionDetails?.delay_days ?? 5,
      royalty_percent: collectionDetails?.royalty_percent ?? 2,
      third_party_royalty_percent: collectionDetails?.third_party_royalty_percent ?? 0,
      price: collectionDetails?.price ?? 0,
      default_price: collectionDetails?.default_price ?? 0,
      third_party_wallet_id: collectionDetails?.third_party_wallet_id ?? '',
      who_pays_fees: collectionDetails?.who_pays_fees ?? 'Seller',
      layout_style_code: collectionDetails?.layout_style_code,
      image_small_location: collectionDetails?.image_small_location,
      image_large_location: collectionDetails?.image_large_location,
      image_banner_location: collectionDetails?.image_banner_location,
      contract_address: transaction?.from ?? '',
    };
    const res = await editCollectionAPI(data, collectionDetails?.guid);
    console.log('editCollectionAPI success res', res);
  } catch (error) {
    console.log('Something went wrong to intetract with smart contract');
  }
};
export const getCollection = async (currentAccount, collectionID) => {
  const web3modal = new web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const contract = fetchCollectionContract(provider);
  const collection = await contract.getCollections(currentAccount);
  console.log('Deployed Collections--->', collection);
  const contractAddressArray = collection?.nftcollections;
  const contractAddress = contractAddressArray[contractAddressArray?.length - 1];
  console.log('contractAddress', contractAddress);
  // setCollectionAddress(contractAddress);
  // const data = {
  //   contract_address: contractAddress,
  // };
  // const res = await editCollectionAPI(data, collectionID);
  return collection;
};

export const addBid = async (tokenId, bidprice) => {
  try {
    let AddBidInstance = await connectingWithSmartContract();
    const addbidding = await AddBidInstance.placeBid(tokenId, bidprice);
    await addbidding.wait();
    await getbid(tokenId);
  } catch (e) {
    console.log('Error while add bidding price');
  }
};

export const getbid = async (tokenId) => {
  const web3modal = new web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  let getbidintance = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, provider);
  let getbid = await getbidintance.getBid(tokenId);
  return getbid;
};

export const Buy = async (tokinID) => {
  let BuyInstance = await connectingWithSmartContract();

  let listingprice = await BuyInstance.getListPrice();
  listingprice = listingprice.toString();

  const transaction = await BuyInstance.executeSale(tokinID, { value: listingprice });
  await transaction.wait();

  return transaction;
};
export const approveBid = async (bidInfo, tokenId, nftData) => {
  const nftId = nftData?.guid;
  const buyer = bidInfo?.bidder;
  const bidprice = bidInfo?.bidPrice;
  let BuyInstance = await connectingWithSmartContract();

  let listingprice = await BuyInstance.getListPrice();
  listingprice = listingprice.toString();
  const transaction = await BuyInstance.AccpetBid(buyer, tokenId, bidprice, {
    value: listingprice,
  });
  await transaction.wait();
  const updateData = {
    description_short: nftData?.description_short,
    description_long: nftData?.description_long,
    contract_address: nftData?.contract_address,
    token_id: nftData?.token_id,
    current_sale_price: nftData?.current_sale_price,
    last_sale_price: bidprice,
  };
  await editNfAPI(updateData, nftId);
  return transaction;
};
export const trendingCollection = async () => {
  const web3modal = new web3Modal();
  const conn = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(conn);
  const instance = await connectingWithCollection(provider);
  const trans = await instance.getTrendingCollections();
  trans.wait();
  return trans;
};
