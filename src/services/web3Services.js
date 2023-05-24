import { ethers } from "ethers";
import axios from "axios";
import { restrictedConfig } from "../helpers/utils";
import store from "../store/index";
import { openNotification } from "../components/Smart/Notification";
import { toast } from "react-toastify";
import { Network, Alchemy } from 'alchemy-sdk';
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI,
};
// const alchemy = new Alchemy(settings);

export const getContract = async (address, abi) => {
    if (!isConnected()) {
        toast.error("Please connect to a wallet");
        return null;
    }
    let library = store.getState()?.web3?.library; //useSelector(state=>state?.web3?.library);
    if (!library) {
        console.log("No library found");
        return null;
    }
    try {
        const contract = new ethers.Contract(address, abi, library);
        return contract.connect(library.getSigner());
    } catch (error) {
        console.log(error);
    }
}

export const deployNFT = async (name, symbol, localGuid) => {
    // read the factory contract abi from the json file
    const factoryAbi = require("../contracts/factory.json");
    const factoryAddress = "0x42aCb9bf3A751b9fFAbBB18897fB4480F7A32ee7";
    const contract = await getContract(factoryAddress, factoryAbi);
    // debugger;
    /* Checking if the contract is null. If it is null, it will log "No contract found" and return null. */
    if (!contract) {
        console.log("No contract found");
        return null;
    }
    try {
        const tx = await contract.deployNFT(0, name, symbol, localGuid);
        return tx;
    }
    catch (e) {
        console.log(e);
        if (e.reason) {
            openNotification("error", "Error " + e.reason);
        } else {

            let error = e.toString()

            let start_str = '(reason=';
            let end_str = ', method=';

            let start = error.indexOf(start_str) + start_str.length;
            let end = error.indexOf(end_str) - start

            let err = error.substr(start, end);

            openNotification("error", "Error " + err);
        }
    }

    return null;
}

export const isConnected = () => {
    return store.getState()?.web3?.connected;
}

export const mintNft = async (nft_id, buyer, collectionAddress) => {
    try {
        const collectionAbi = require("../contracts/collection.json");
        const voucherDetails = await getNFTVoucher(nft_id, buyer)
        if (!voucherDetails?.data?.body?.voucher) {
            openNotification(voucherDetails?.data?.message)
            return;
        }
        const data = voucherDetails?.data?.body;
        const contract = await getContract(data?.contract, collectionAbi);
        if (!contract) {
            console.log("No contract found, please try again");
            return null;
        }

        const voucher = [data.token_id, data.price, data.uri, data.buyer, data.signature]
        console.log("voucher", voucher)
        let val = ethers.utils.parseEther(data?.price.toString())
        let tx = await contract.safeMint(voucher, { value: val });
        console.log("tx", tx)
        tx.wait().then(async (receipt) => {
            console.log("receipt", receipt)
            if (receipt?.status === 1) {
                openNotification("success", "NFT Minted Successfully")
                await publishToIpfs(nft_id);
            } else {
                openNotification("error", "NFT Minting Failed")
            }
        })
    }
    catch (e) {
        console.log(e);

        if (e.reason) {
            openNotification("error", "Error " + e.reason);
        } else {

            let error = e.toString()

            let start_str = '(reason=';
            let end_str = ', method=';

            let start = error.indexOf(start_str) + start_str.length;
            let end = error.indexOf(end_str) - start

            let err = error.substr(start, end);
            console.log("err", err)

            openNotification("error", "Error " + err);
        }
    }
}

export const publishIpfs = async (nft_id) => {
    try {
        const collectionAbi = require("../contracts/collection.json");
        const response = await publishToIpfs(nft_id)
        if (!response?.data?.body?.published) {
            openNotification(response?.data?.message)
            return;
        }
        const data = response?.data?.body;
        const contract = await getContract(data?.contract, collectionAbi);
        if (!contract) {
            console.log("No contract found, please try again");
            return null;
        }

        // const voucher = [data.token_id, data.uri]
        // console.log("voucher", voucher)
        // let val = ethers.utils.parseEther(data?.price.toString())
        contract.updateURI(data.token_id, data.uri).then((tx) => {
            tx.wait().then(async (receipt) => {
                console.log("receipt", receipt)
                if (receipt?.status === 1) {
                    openNotification("success", "URI Updated Successfully")
                } else {
                    openNotification("error", "URI Update Failed")
                }
            })
        })

    }
    catch (e) {
        console.log(e);
        if (e.reason) {
            openNotification("error", "Error " + e.reason);
        } else {

            let error = e.toString()

            let start_str = '(reason=';
            let end_str = ', method=';

            let start = error.indexOf(start_str) + start_str.length;
            let end = error.indexOf(end_str) - start

            let err = error.substr(start, end);

            openNotification("error", "Error " + err);
        }
    }
}

const getNFTVoucher = async (nft_id, address) => {
    return await axios.get(
        `http://nftdepot-api.azurewebsites.net/nft/${nft_id}/voucher/${address}`,
        restrictedConfig
    );
};

const publishToIpfs = async (nft_id) => {
    return await axios.get(
        `http://nftdepot-api.azurewebsites.net/nft/${nft_id}/publish_ipfs`,
        restrictedConfig
    );
}

export const listNft = async (nftId, nftAddress, wallet, price) => {
    try {
        const ercContract = require("../contracts/erc721.json");
        const { abi, address } = require("../contracts/marketplaceAbi.json");
        // console.log('abi----- ', ercMethods.address, '----', 'address--- ', ercMethods.abi)
        const contractMethods = await getContract(address, abi);
        console.log('contract----->', contractMethods);
        const ercMethods = await getContract(nftAddress, ercContract.abi)
        if (!contractMethods || !ercMethods) {
            toast.error("No contract found, please try again");
            return null;
        }
        // console.log('ercMethods----->', ercMethods, wallet);
        const approvedTx = await ercMethods.approve(address, nftId)
        const feeTx = await contractMethods.getListingFee();
        try {
            let result = Promise.all([approvedTx, feeTx]);
            let dataTx = await result;
            console.log('dataTx---->', dataTx)
            if (dataTx) {
                const value = ethers.utils.parseEther(String(price));
                const tx = await contractMethods.listItem(nftAddress, nftId, value, { gasLimit: 2900000 })
                console.log('listItem tx----->', tx);
                tx && toast.success('NFT listed successfully!')
            }
        } catch (error) {
            console.log('alll error---->', error);
        }
        // if (approvedTx && feeTx) {
        //     console.log('feeTx------>', feeTx);
        //     console.log('approved successfully!', approvedTx);
        // }

    } catch (err) {
        console.log('errror----->', err)
        toast.error(err)
    }
}

export const fetchMyNfts = async (walletAddress) => {
    const apiUrl = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTs/?owner=${walletAddress}`
    const resp = await axios.get(apiUrl);
    // console.log('response nfts---->', resp.data)
    return resp.data;
}

export const fetchListedNFTS = async () => {
    try {
        const { abi, address } = require("../contracts/marketplaceAbi.json");
        // console.log('abi----- ', ercMethods.address, '----', 'address--- ', ercMethods.abi)
        const contractMethods = await getContract(address, abi);
        if (!contractMethods) {
            toast.error("No contract found, please try again");
            return;
        }
        const collections = await contractMethods.getAllListings();
        // console.log('collections resp---->', collections);
        return collections;
    } catch (err) {
        console.log('collections err', err)
        toast.error(err.message)
    }
}

export const fetchNFTMetaData = async (address, tokenId) => {
    const alchemy = new Alchemy(settings);
    const metadata = await alchemy.nft
        .getNftMetadata(address, tokenId)
        // console.log('response metadata---->', metadata)
    return metadata
}

export const buyNFT = async (address, nftId, price) => {
    try {
        const { abi, address } = require("../contracts/marketplaceAbi.json");
        const contractMethods = await getContract(address, abi);
        if (!contractMethods) {
            toast.error("No contract found, please try again");
            return;
        }
        const tx = await contractMethods.buyItem(address, nftId);
        console.log('tx resp---->', tx);
        tx && toast.success('NFT buy successfully!')
        return tx;
    } catch (err) {
        console.log('nft buy err', err)
        toast.error(err.message)
    }
}