import React, { useEffect, useState } from 'react';
import { Radio, Select } from 'antd';
import PAGE_HEADER from '../../images/PageHeader.png';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import DropZone from '../../components/Smart/DropZone/DropZone';
import { codesAPI, createCollectionAPI, uploadAPI } from '../../services/createCollectionServices';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../components/Smart/Notification';
import './CreateCollectionUploadImage.scss';
import Spin from '../../components/presentational/Spin';
import useWindowSize from '../../helpers/hooks';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { collectionDataSuccess } from '../../store/collectionForm/collectionActions';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
// import { uploadJSONToIPFS,uploadFileToIPFS} from "../../../src/pinata";
import { NftSaleMarketplace } from 'alchemy-sdk';
import { toast } from 'react-toastify';
// process.env.config();
// import {address, abi } from "../../../src/indexabi";

const NftMarketplace = process.env.NftMarketplace;
const CreateCollectionUploadImage = () => {
  const [smallImage, setSmallImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [layoutCodes, setLayoutCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [browserWidth] = useWindowSize();
  const [fileURL, setFileURL] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const formData = useSelector((state) => state?.collectionData?.data);
  useEffect(() => {
    const getCode = async () => {
      try {
        const response = await codesAPI('LayoutCodes');
        setLayoutCodes(response?.data);
      } catch (error) {
        console.log('error', error?.response?.data?.message);
      }
    };
    getCode();
  }, []);

  const handleChange = (value) => {
    console.log('handleChange');
    setSelectedCode(value);
  };

  const handleSubmit = async () => {
    if (smallImage?.length && largeImage?.length && bannerImage?.length && selectedCode) {
      setIsLoading(true);
      try {
        //   const metadataURL = await uploadMetadataToIPFS ();
        //   const provider = new ethers.providers.Web3Provider(window.ethereum);
        //   const signer = provider.getSigner();

        //   let contract = new ethers.Contract(NftMarketplace,abi, signer);

        //   const price = ethers.utils.parseUnits(formParams.pricd, "ether");
        //   let listingPrice = await contract.getListingFee();
        //   listingPrice = await contract.getListingFee();
        //   listingPrice = listingPrice.toString();

        //  let transaction = await contract.creatToken(metadataURL,price, {value:getListingFee});
        //  await transaction.wait();
        //  alert("Succesfully listed your NFT");
        //  window.location.replace("/");

        const smallImageLocation = await uploadAPI(smallImage[0]);
        const largeImageLocation = await uploadAPI(largeImage[0]);
        const bannerImageLocation = await uploadAPI(bannerImage[0]);

        const data = {
          ...formData,
          layout_style_code: selectedCode,
          url_discord: 'https://discord.com/' + formData?.url_discord,
          url_instagram: 'https://www.instagram.com/' + formData?.url_instagram,
          url_medium: 'https://medium.com/' + formData?.url_medium,
          url_personal: formData?.url_personal,
          url_telegram: 'https://telegram.com/' + formData?.url_telegram,
          image_small_location: smallImageLocation?.body?.url,
          image_large_location: largeImageLocation?.body?.url,
          image_banner_location: bannerImageLocation?.body?.url,
        };
        const res = await createCollectionAPI(data);
        dispatch(collectionDataSuccess({}));
        openNotification('Collection created successfully');
        history.push(`/createNft/${res?.body?.collection_id}`);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        openNotification('Ooooooooops', error?.response?.data?.message);
      }
    } else {
      openNotification('Oops', 'Please Fill in all Fields');
    }
  };

  useEffect(() => {
    if (!formData) {
      history.push('/createCollection');
    }
  }, []);

  //  const onChangefile = async (e) =>{
  // console.log("onChangefile")
  //     var file = e.target.files[0];

  //     try {
  //       const response = await uploadFileToIPFS(file)
  //       if (response.success === true){
  //         console.log("uploading files......", response,pinataURL)
  //         setFileURL(response.pinataURL);
  //       }
  //     }catch(e) {
  //       console.log("Error during uploading ", e)
  //     }
  //   }

  // async function uploadMetadataToIPFS(){
  //   const data = history ;
  //   if (! data|| ~fileURL)
  //   return;

  //   const nftJSON = {
  //     history, image: fileURL
  //   };
  //   try {
  //     const response = await uploadJSONToIPFS(nftJSON);
  //     if(response.success=== true){
  //       console.log("UPloaded JSON metadata : ");
  //       return response.pinataURL;
  //     }
  //   }catch (e){
  //     console.log ("error uploading JSON metadata", e);
  //   }

  // }

  return (
    <div className='CreateCollectionUploadImage'>
      <div className='CreateCollectionHeader'>
        <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={'PAGE_HEADER'} />
        <div className='CreateCollectionHeadingSection'>
          <span className='CreateCollectionText'>Become an NFT artist with NFTdepot</span>
          <span className='CreateCollectionHeading'>Create a Collection</span>
        </div>
      </div>
      <div className='CreateCollectionUploadImageWrapper main_page_width'>
        <div className='dropZoneHeader'>
          <div className='step2Header'>
            <span className='step2'>Step 2</span>
            <span className='desc'>Select Layout Style</span>
            <span className='desc2 changeColor'>
              Select a layout style that best fits your NFT’s image ratio.
            </span>
          </div>
          <div>
            <Select
              placeholder='Select the style for the layout of your Small/Large images.'
              onChange={handleChange}
            >
              {layoutCodes?.body?.map((item, index) => {
                return (
                  <Select.Option value={item?.code} key={item + index}>
                    {item?.description}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
          <div className='uploadForm'>
            <label className='cardLabel changeColor'>
              Accepted file formats for images are: JPG, JPEG,PNG and GIF
            </label>
            <div className='collectionImages'>
              <div className='dflex'>
                {' '}
                <div className='smallImage'>
                  <label>Small Image</label>
                  <span>
                    Image will show on the collection as a icon. Recommended size: 350 x 350{' '}
                  </span>
                  <DropZone
                    selectedImage={smallImage}
                    setSelectedImage={setSmallImage}
                    imageType='small'
                  />
                </div>
                <div className='largeImage'>
                  <label>Large Image</label>
                  <span>
                    This is the larger image shown on all listings, categories and featured pages.
                    Recommended size: 600 x 400
                  </span>
                  <DropZone
                    selectedImage={largeImage}
                    setSelectedImage={setLargeImage}
                    imageType='large'
                  />
                </div>
              </div>

              <div className='bannerImage'>
                <label>Banner Image</label>
                <span>
                  This image will display on the top of your Storefront/Collection Page. Recommended
                  dimension 1400 X 400.
                </span>
                <DropZone
                  selectedImage={bannerImage}
                  setSelectedImage={setBannerImage}
                  imageType='banner'
                />
              </div>
            </div>
            {/* <div className="bannerImage">
              <DropZone
                selectedImage={bannerImage}
                setSelectedImage={setBannerImage}
                imageType="banner"
              />
            </div> */}
            <div className='submitBtn' onClick={handleSubmit}>
              {loading ? (
                <span>
                  <Spin />
                </span>
              ) : (
                <span className='submit'>Submit</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionUploadImage;
