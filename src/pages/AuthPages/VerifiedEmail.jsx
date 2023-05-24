import React, { useEffect, useState } from 'react';
import PAGE_HEADER from '../../images/PageHeader.png';
import AUTH_ICON from '../../images/auth_icon.svg';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import { Input, Form, Button } from 'antd';
import { ForgotPasswordAPI, VerifyUserEmailAPI } from '../../services/authServices';
import Spin from '../../components/presentational/Spin';
import { openNotification } from '../../components/Smart/Notification';
import useWindowSize from '../../helpers/hooks';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ForgotPassword.scss';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

const VerifiedEmail = ({ match }) => {
  const [browserWidth] = useWindowSize();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { search } = useLocation();

  const { token } = queryString.parse(search);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setLoading(true);
        const res = await VerifyUserEmailAPI(token);
        console.log('res', res);
        openNotification('Email verified successfully');
        // history.push("/auth/login");
        setLoading(false);
      } catch (e) {
        setLoading(false);
        openNotification('Oops', e?.response?.data?.message);
      }
    };
    verifyToken();
  }, [match]);

  return (
    <>
      <div className='ForgotPasswordWrapper'>
        <div className='ForgotPasswordPageHeader'>
          <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={'PAGE_HEADER'} />
        </div>
        <div className='ForgotPasswordFormWrapper main_page_width mT'>
          <div className='ForgotPasswordForm'>
            <div className='form'>
              <span className='formHeadingWrapper'>
                <span className='ForgotPasswordAcc'>Email Verification</span>
                <span className='ForgotPasswordIcon'>
                  <img src={AUTH_ICON} alt={'AUTH_ICON'} />
                </span>
              </span>
              {loading ? (
                <>
                  <div style={{ textAlign: 'center' }}>
                    <Spin />
                  </div>
                  <span className='emailSentMessage'>Verifing Email</span>
                </>
              ) : (
                <div className='emailSent'>
                  Email Verified Successfully. You can
                  <span style={{ margin: '0px 4px' }}>
                    <Link to={'/auth/login'}>Login</Link>
                  </span>
                  now.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default VerifiedEmail;
