import React, { useEffect, useState } from 'react';
import PAGE_HEADER from '../../images/PageHeader.png';
import RightArrow from '../../images/rightIcon.svg';
import './CreateNft.scss';
// import { openNotification } from '../../components/Smart/Notification';
import { ethers } from 'ethers';

import { uploadFileToIPFS, connectingWithSmartContract, mintNFT } from '../../pinata.js';
import { useLocation, useHistory } from 'react-router-dom';
const bigNUmber = require('bignumber.js');
const CreateNft = () => {
  const history = useHistory();
  const location = useLocation();
  const nftID = location.state?.data?.guid;
  console.log('nftID', nftID);
  const nftData = location.state?.data?.nft_data?.image_location;
  const nftDetail = location.state?.data;
  console.log('nftDetail', nftDetail);

  const addressData = location.state?.address;
  const nftPrice = localStorage.getItem('collectionPrice');
  const [currentAccount, setcurrentAccount] = useState('');
  const [price, setPrice] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    desp: '',
    symbol: '',
    image: null,
  });
  const resetForm = () => {
    setFormData({
      name: '',
      desp: '',
      symbol: '',
      image: null,
    });
  };

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [ResultUrl, setResultUrl] = useState();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleCollectionData = () => {
    setFormData({
      image: nftData,
    });
  };

  useEffect(() => {
    setImagePreviewUrl(nftData);
    setResultUrl(nftData);
    handleCollectionData();
  }, [nftData]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentAccount) {
      connectWallet();
    } else {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      const _symbol = formData.name
        ?.toUpperCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      const nftMintData = {
        name: formData.name,
        desp: formData.desp,
        symbol: _symbol,
        image: formData.image,
      };
      const tokenURI = JSON.stringify(nftMintData);
      console.log('tokenURI', tokenURI);
      await mintNFT(
        tokenURI,
        price,
        1,
        '0x771c1E041f71dCB2b05Aa05cc94004660742514f',
        nftDetail,
        formData
      );

      history.push(`/nftDetail/${nftID}`);

      // uploadToIPFS(formData?.image);
      //createNFT(formData, imagePreviewUrl);
    }
  };
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log('install metamask ');

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setcurrentAccount(accounts[0]);
    } catch (error) {
      console.log('error while connecting to the wallet');
    }
  };

  // const uploadToIPFS = async (file) => {
  //   console.log(file);
  //   try {
  //     const response = await uploadFileToIPFS(file);

  //     if (response.success === true) {
  //       console.log('Uploaded image to Pinata: ', response.pinataURL);

  //       setFormData({
  //         ...formData,
  //         image: response.pinataURL,
  //       });

  //       setResultUrl(response.pinataURL);

  //       let _countuser = 0;

  //       resetForm();
  //       setImagePreviewUrl(null);
  //       console.log('eleven');

  //       // setFormVal.fileUrl(response.pinataURL);
  //     }
  //   } catch (e) {
  //     alert('Error during file upload', e);
  //   }
  // };
  // conecting with smart contract

  // const createNFT = async (formInput, fileUrl) => {
  //   const nftid = formInput?.name;
  //   const nftidWithoutDashes = nftid.replace(/-/g, '');
  //   const nftidAsInt = parseInt(nftidWithoutDashes, 16);
  //   const nft_Id = new bigNUmber(nftidAsInt);
  //   const nftcollectionaddress = formInput?.desp;
  //   try {
  //     const price = ethers.utils.parseUnits(formInput?.price, 'ether');
  //     const contract = await connectingWithSmartContract();
  //     // const listing = await contract.getListingFee();
  //     const transaction = await contract.listItem(
  //       nftcollectionaddress,
  //       1,
  //       price
  //     );
  //     console.log('Your fucntion of smart contract has been triggerd');
  //     await transaction.wait();
  //     history.push(`/nftDetail/${nftDetail?.guid}`);
  //   } catch (error) {
  //     console.log('error while creating sale');
  //   }
  // };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      <div className='CreateNftWrapper'>
        <div className='CreateNftHeader'>
          <img src={PAGE_HEADER} alt={'PAGE_HEADER'} />
          <div className='CreateNftHeadingSection'>
            <span className='CreateNftText'>Become an NFT artist with NFTdepot</span>
            <span className='CreateNftHeading'>Create your NFT</span>
          </div>
        </div>

        <div>
          <div className='MintNftContainer'>
            <div className='MintNftMainDiv'>
              <form className='MintNftFormDiv'>
                <div className='MintNftLeftForm'>
                  <div className='MintNftImageDiv'>
                    <img
                      className='MintNftImage'
                      src={
                        imagePreviewUrl ||
                        'https://png.pngtree.com/background/20210711/original/pngtree-gray-minimalist-light-headphones-psd-layered-main-picture-picture-image_1120970.jpg'
                      }
                      alt='Preview'
                      onClick={() => document.querySelector('input[type="file"]').click()}
                    />
                    <div
                      className='MintNftUploadText'
                      style={{
                        opacity: imagePreviewUrl ? 0 : 1,
                      }}
                      onClick={() => document.querySelector('input[type="file"]').click()}
                    >
                      Upload NFT
                    </div>
                    <input
                      className='MintNftChooseFile'
                      style={{ display: 'none' }}
                      type='file'
                      name='image'
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className='MintNftRightForm'>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Name
                    </label>
                    <input
                      name='name'
                      type='text'
                      placeholder='Enter Name'
                      value={formData.name}
                      // value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Description
                    </label>
                    <input
                      name='desp'
                      type='text'
                      placeholder='Enter Description'
                      value={formData.desp}
                      // value={formData.desp}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Price
                    </label>
                    <input
                      name='price'
                      type='number'
                      placeholder='Enter Price'
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>
                  <div className='MintNftButtonDiv'>
                    <div className='MintNftButton' onClick={handleSubmit}>
                      <button type='submit'>{nftData ? 'Confirm' : 'Create'}</button>
                      <img src={RightArrow} alt={'RightArrow'} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNft;
