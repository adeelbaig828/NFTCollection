import React, { useState } from 'react';
import { Radio } from 'antd';
import PAGE_HEADER from '../../images/PageHeader.png';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import { uploadAPI } from '../../services/createCollectionServices';
import { openNotification } from '../../components/Smart/Notification';
import Spin from '../../components/presentational/Spin';
import './UploadNft.scss';
import ZipDropZone from '../../components/Smart/ZipDropdown/ZipDropZone';
import useWindowSize from '../../helpers/hooks';
import { uploadNft } from '../../services/createNftServices';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import BasicModal from '../../components/Smart/BasicModal/BasicModal';
import axios from 'axios';
import EditCollectionModal from '../../components/Smart/EditCollectionModal/EditCollectionModal';

const UploadNft = ({ match }) => {
  const location = useLocation();
  const data = location.state.data;
  const [nftFile, setNftFile] = useState('');
  const [isAgree, setIsAgree] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();
  const [browserWidth] = useWindowSize();

  const handleSubmit = async () => {
    handleFileSubmit();
    if (nftFile?.length) {
      if (isAgree) {
        setIsLoading(true);
        try {
          const nftFileLocation = await uploadNft(nftFile[0], match.params.id);
          openNotification('Nft zip uploaded successfully');
          setIsLoading(false);
          history.push(`/collectionView/${match.params.id}`, { data: nftFileLocation });
          // history.push(`/profile`);
        } catch (error) {
          setIsLoading(false);
          openNotification('Oops', error?.response?.data?.message);
        }
      } else {
        openNotification('Oops', 'Please agree to the terms and conditions');
      }
    } else {
      openNotification('Oops', 'Please upload all the images');
    }
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileSubmit = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    axios
      .post(
        `https://nftdepot-api.azurewebsites.net/collections/${match.params.id}/license_agreement`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        console.log('res', res);
        openNotification('Purchaser License Agreement uploaded successfully');

        // Handle success
      })
      .catch((error) => {
        console.log('error', error);
        // Handle error
      });
  };
  const handleConfirm = () => {
    setConfirm(true);
  };

  return (
    <div className='UploadNft'>
      <div className='UploadNftHeader'>
        <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={'PAGE_HEADER'} />
        <div className='UploadNftHeadingSection'>
          <span className='UploadNftText'>Become an NFT artist with NFTdepot</span>
          <span className='UploadNftHeading'>Upload Zip</span>
        </div>
      </div>
      <div className='UploadNftUploadImageWrapper main_page_width'>
        <div className='dropZoneHeader'>
          <div className='uploadForm'>
            <div className='bannerImage'>
              <ZipDropZone selectedImage={nftFile} setSelectedImage={setNftFile} imageType='zip' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '3% 0' }}>
              <label style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Purchaser License Agreement
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    padding: '1% 2%',
                    background: '#F79521',
                    color: 'white',
                    width: 'fit-content',
                    borderRadius: '10px',
                    position: 'relative',
                    diplay: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  Upload Here
                  <input
                    style={{
                      position: 'absolute',
                      background: 'red',
                      width: '100%',
                      height: '100%',
                      top: '0',
                      left: '0',
                      opacity: '0',
                    }}
                    type='file'
                    onChange={handleFileChange}
                  />
                </div>
                <div>{selectedFile?.name}</div>
              </div>
            </div>
            <div className='agreeSection'>
              <Radio checked={isAgree} onClick={() => setIsAgree((prev) => !prev)} />
              <div className='agree'>
                I agree to the{' '}
                <Link to='/TermsAndCondition' target='_blank'>
                  <span className='termConditions'>Terms and Conditions</span> and{' '}
                </Link>
                <span className='termConditions'>Privacy Policy</span>
              </div>
            </div>
            <div>
              {confirm ? (
                <div className='submitBtn' onClick={handleSubmit}>
                  {loading ? (
                    <span>
                      <Spin />
                    </span>
                  ) : (
                    <span className='submit'>Submit</span>
                  )}
                </div>
              ) : (
                <div className='submitBtn'>
                  <EditCollectionModal
                    modalBtn='Confirm'
                    modalDesp='Uploading a New Zip file will delete the existing one, If any'
                    modalDesp1='Are you sure you want to continue?'
                    btnText='Confrim'
                    setConfirm={setConfirm}
                  />
                </div>
              )}
            </div>
            {/* ) : (
              <div className='submitBtn' onClick={handleSubmit}>
                {loading ? (
                  <span>
                    <Spin />
                  </span>
                ) : (
                  <span className='submit'>Submit</span>
                )}
              </div>
            )} */}
            {/* <div className='submitBtn' onClick={handleSubmit}>
              {loading ? (
                <span>
                  <Spin />
                </span>
              ) : (
                <>
                  <span className='submit'>Submit</span>
                  <BasicModal
                    modalBtn='Submit'
                    modalDesp='Uploading a New Zip file will delete the existing one.'
                    modalDesp1='Are you sure you want to continue?'
                    btnText='Confrim'
                    edit
                    setConfirm={setConfirm}
                  />
                </>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNft;
