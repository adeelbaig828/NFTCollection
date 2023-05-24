import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import PAGE_HEADER from '../../images/PageHeader.png';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import DropZone from '../../components/Smart/DropZone/DropZone';
import { codesAPI, uploadAPI } from '../../services/createCollectionServices';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../components/Smart/Notification';
import Spin from '../../components/presentational/Spin';
import useWindowSize from '../../helpers/hooks';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { collectionDetailsApi, editCollectionAPI } from '../../services/collectionServices';
import { editCollectionDataSuccess } from '../../store/editCollectionForm/editCollectionActions';
import './EditCollectionImage.scss';

const EditCollectionImage = ({ match }) => {
  const editFormData = useSelector((state) => state?.editCollectionData?.data);
  const [loading, setIsLoading] = useState(false);
  const [layoutCodes, setLayoutCodes] = useState([]);
  const [collectionData, setCollectionData] = useState(null);
  const [browserWidth] = useWindowSize();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [smallImage, setSmallImage] = useState();
  const [largeImage, setLargeImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [selectedCode, setSelectedCode] = useState();
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

  useEffect(() => {
    const getCollectionDetails = async () => {
      try {
        setIsPageLoading(true);
        const detail = await collectionDetailsApi(match.params.id);
        setCollectionData(detail?.body);
        setSelectedCode(detail?.body?.layout_style_code);
        setIsPageLoading(false);
      } catch (e) {
        setIsPageLoading(false);
        console.log(e);
      }
    };
    getCollectionDetails();
  }, []);

  const handleChange = (value) => {
    setSelectedCode(value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let smallImageLocation;
      let largeImageLocation;
      let bannerImageLocation;

      if (smallImage) {
        smallImageLocation = await uploadAPI(smallImage[0]);
      } else if (largeImage) {
        largeImageLocation = await uploadAPI(largeImage[0]);
      } else if (bannerImage) {
        bannerImageLocation = await uploadAPI(bannerImage[0]);
      } else {
        // return null;

        const data = {
          ...editFormData,

          layout_style_code: selectedCode,
          image_small_location: smallImageLocation?.body?.url
            ? smallImageLocation?.body?.url
            : collectionData?.image_small_location,
          image_large_location: largeImageLocation?.body?.url
            ? largeImageLocation?.body?.url
            : collectionData?.image_large_location,
          image_banner_location: bannerImageLocation?.body?.url
            ? bannerImageLocation?.body?.url
            : collectionData?.image_banner_location,
        };
        const res = await editCollectionAPI(data, match.params.id);

        dispatch(editCollectionDataSuccess({}));
        openNotification('Collection Updated successfully');
        // history.push(`/profile`);
        // history.push(`/createNft/${res?.body?.collection_id}`);
        history.push(`/createNft/${res?.body?.guid}`, { data });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      openNotification('Oops', error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!editFormData) {
      history.push('/profile');
    }
  }, []);

  return (
    <>
      <div className='EditCollectionUploadImage'>
        <div className='EditCollectionHeader'>
          <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={'PAGE_HEADER'} />
          <div className='EditCollectionHeadingSection'>
            <span className='EditCollectionText'>Become an NFT artist with NFTdepot</span>
            <span className='EditCollectionHeading'>Edit Your Collection</span>
          </div>
        </div>
        {isPageLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          <div className='EditCollectionUploadImageWrapper main_page_width'>
            <div className='dropZoneHeader'>
              <div className='step2Header'>
                <span className='step2'>Step 2</span>
                <span className='desc'>Edit Layout Style</span>
                <span className='desc2 changeColor'>
                  Select a layout style that best fits your NFT’s image ratio.
                </span>
              </div>
              <div>
                <Select
                  placeholder='Select the style for the layout of your Small/Large images.'
                  onChange={handleChange}
                  defaultValue={collectionData?.layout_style_code}
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
                        imgSrc={collectionData?.image_small_location}
                      />
                    </div>
                    <div className='largeImage'>
                      <label>Large Image</label>
                      <span>
                        This is the larger image shown on all listings, categories and featured
                        pages. Recommended size: 600 x 400
                      </span>
                      <DropZone
                        selectedImage={largeImage}
                        setSelectedImage={setLargeImage}
                        imageType='large'
                        imgSrc={collectionData?.image_large_location}
                      />
                    </div>
                  </div>

                  <div className='bannerImage'>
                    <label>Banner Image</label>
                    <span>
                      This image will display on the top of your Storefront/Collection Page.
                      Recommended dimension 1400 X 400.
                    </span>
                    <DropZone
                      selectedImage={bannerImage}
                      setSelectedImage={setBannerImage}
                      imageType='banner'
                      imgSrc={collectionData?.image_banner_location}
                    />
                  </div>
                </div>
                <div className='submitBtn' onClick={handleSubmit}>
                  {loading ? (
                    <span>
                      <Spin />
                    </span>
                  ) : (
                    <span className='submit'>Update</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditCollectionImage;
