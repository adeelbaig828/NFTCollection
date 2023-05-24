import React, { useEffect, useState } from 'react';
import PAGE_HEADER from '../../../images/PageHeader.png';
import HEADER_IMAGE_MOBILE from '../../../images/header_image_mobile.png';
import useWindowSize from '../../../helpers/hooks';
import moment from 'moment';
import OtherUserProfileCard from '../../../components/presentational/OtherUserProfileCard/OtherUserProfieCard';
import { userDetailAPI } from '../../../services/userServices';
import { openNotification } from '../../../components/Smart/Notification';
import './OtherUserProfile.scss';
import Spin from '../../../components/presentational/Spin';

const OtherUserProfile = ({ match }) => {
  const [browserWidth] = useWindowSize();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log('profileData', profileData);
  useEffect(async () => {
    try {
      setLoading(true);
      const res = await userDetailAPI(match?.params?.id);
      setProfileData(res?.data?.body);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      openNotification('Oops', error?.response?.data?.message);
    }
  }, [match.params.id]);

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '120px' }}>
          <Spin />
        </div>
      ) : (
        <div className='OtherUserProfileWrapper'>
          <div className='ProfileHeader'>
            <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={'PAGE_HEADER'} />
          </div>
          {error ? (
            <div
              style={{
                textAlign: 'center',
                margin: '60px',
                fontSize: '24px',
                fontStyle: 'bold',
              }}
            >
              No Such User Found
            </div>
          ) : (
            <div className='userData main_page_width'>
              <div className='profileCard'>
                <OtherUserProfileCard data={profileData} />
              </div>
              <div className='profilecardFotterSection'>
                <span className='flexStyle'>
                  <span className='key'>Username</span>
                  <span className='value changeColor'>{profileData?.username}</span>
                </span>
                <span className='flexStyle'>
                  <span className='key'> Joined</span>
                  <span className='value'>
                    <span className='dFlex'>
                      {/* <img src={PRICE_ICON} alt={"PRICE_ICON"} /> */}
                    </span>{' '}
                    {moment(profileData?.created_date).format('MMM DD, YYYY')}
                  </span>
                </span>
                {profileData?.url_personal && (
                  <span className='flexStyle unsetBorder'>
                    <span className='key'> Website</span>
                    <span className='value'>{profileData?.url_personal}</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OtherUserProfile;
