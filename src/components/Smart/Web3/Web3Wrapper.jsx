import './Web3Wrapper.scss';
import { useEffect, useState } from 'react';
import { Button, Popover, Space } from 'antd';
import { useDispatch } from 'react-redux';

import { networkParams } from './networks';
import { toHex, truncateAddress } from '../../../helpers/utils';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import web3 from 'web3';
import { providerOptions } from './providerOptions';
import {
  walletConnectionSuccess,
  walletConnectionFailure,
} from '../../../store/web3/web3Actions';
import { confirm } from '../../Smart/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const Web3Connector = ({}) => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState();
  const [nonce, setNonce] = useState();

  const dispatch = useDispatch();

  const connectWallet = async () => {
    // debugger
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const signer = await library.getSigner();
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      const providerData = new ethers.providers.Web3Provider(window.ethereum);
      const signerData = providerData.getSigner();
      const account = await signerData.getAddress();
      const nonceId = await providerData.getTransactionCount(account);
      const nonceHex = ethers.utils.hexlify(nonceId).padStart(10, '0');
      setProvider(provider);
      setLibrary(library);
      setSigner(signer);
      setNonce(nonceHex);
      if (accounts) {
        setAccount(accounts[0]);
        dispatch(
          walletConnectionSuccess({
            provider,
            library,
            account: accounts[0],
            signer,
          })
        );
      }
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
      dispatch(walletConnectionFailure(null));
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  // const handleInput = (e) => {
  //   const msg = e.target.value;
  //   setMessage(msg);
  // };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams[toHex(network)]],
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    let message = `Welcome to NFTDepot.Art!
    Click “Sign” to connect your wallet and accept the NFTDepot.Art Terms of Service:  https://nftdepot.art/tos This request will not trigger a blockchain transaction or cost any gas fees. Your authentication status will reset after 24 hours. Wallet address: ${account}
    Nonce: ${nonce}`;
    try {
      const signature = await library.provider.request({
        method: 'personal_sign',
        params: [message, account],
      });
      setSignedMessage(message);
      setSignature(signature);
      window.localStorage.setItem('signature', signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: 'personal_ecRecover',
        params: [signedMessage, signature],
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  // contract interaction functions (later we may move them to a separate component)
  const getContract = async (address, abi) => {
    if (!library) {
      console.log('no library');
      return;
    }
    try {
      const contract = new ethers.Contract(address, abi, library);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork('');
    // setMessage("");
    setSignature('');
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
    dispatch(walletConnectionFailure(null));
  };

  useEffect(async () => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);
  useEffect(() => {
    console.log(window.localStorage.getItem('signature'), account);
    if (!window.localStorage.getItem('signature') && account) {
      confirm(
        'Welcome to NFTDepot',
        'By connecting your wallet and using NFTDepot, you agree to our Terms of Service and Privacy Policy.',
        'Agree & Sign',
        'Cancel',
        signMessage,
        disconnect
      );
    }
  }, [account]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log('accountsChanged', accounts);
        if (accounts) {
          setAccount(accounts[0]);
          dispatch(walletConnectionSuccess({ provider, library, account }));
        }
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log('disconnect', error);
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider]);

  // Test Transaction
  const requestPolygonTransaction = async (signer, address, provider) => {
    // check validity of addresses
    if (
      !web3.utils.isAddress(address) ||
      !web3.utils.isAddress('0x4bE01c5a1fD055eAaF76C5eE257FEbc529D9b5Ed')
    ) {
      toast.error('ERROR invalid wallet addresses provided');
      console.log('ERROR invalid wallet addresses provided');
      return;
    }

    const transactionParameters = {
      from: address, // sender wallet address
      to: '0x4bE01c5a1fD055eAaF76C5eE257FEbc529D9b5Ed', // receiver address
      data: '0x',
      value: ethers.utils.parseEther('0.005'),
      // gasLimit: ethers.utils.hexlify(10000),
      gasPrice: ethers.utils.hexlify(parseInt(await library.getGasPrice())),
    };

    await signer
      .sendTransaction(transactionParameters)
      .then((transaction) => {
        toast.success('Transaction Success!');
      })
      .catch((e) => {
        console.log('failed!', e);
        toast.error('Transaction Failed:' + e.message);
        return;
      });
  };

  return (
    <div style={{ color: 'white' }}>
      {!account ? (
        <Button
          onClick={connectWallet}
          type={'primary'}
          className="connectButton">
          Connect Wallet
        </Button>
      ) : (
        <Popover
          placement="bottomRight"
          content={
            <Button
              onClick={disconnect}
              type={'dashed'}>
              Disconnect
            </Button>
          }
          trigger="click">
          <div className="walletBtn">Connected: {truncateAddress(account)}</div>
        </Popover>
      )}
      {/* <div>
        <span>{error ? error.message : null}</span>
      </div> */}
      {/* {account && (
        <Button
          onClick={() => requestPolygonTransaction(signer, account, provider)}
        >
          Test Transfer
        </Button>
      )} */}
    </div>
  );
};

export { Web3Connector };
