import React, { useEffect, useState } from 'react';
import PAGE_HEADER from '../../images/PageHeader.png';
import AUTH_ICON from '../../images/auth_icon.svg';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import { Input, Form, Button } from 'antd';
import { ForgotPasswordAPI } from '../../services/authServices';
import Spin from '../../components/presentational/Spin';
import { openNotification } from '../../components/Smart/Notification';
import useWindowSize from '../../helpers/hooks';
import './ForgotPassword.scss';
import { useSelector } from 'react-redux';

const VerificationEmail = () => {
  const [browserWidth] = useWindowSize();

  const email = useSelector((state) => state?.auth?.registerEmail);
  useEffect(() => {
    openNotification('Signup verification email sent');
  }, []);

  return (
    <>
      <div className='ForgotPasswordWrapper'>
        <div className='ForgotPasswordPageHeader'>
          <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={'PAGE_HEADER'} />
        </div>
        <div className='ForgotPasswordFormWrapper main_page_width'>
          <div className='ForgotPasswordForm'>
            <div className='form'>
              <span className='formHeadingWrapper'>
                <span className='ForgotPasswordAcc'>Email Verification</span>
                <span className='ForgotPasswordIcon'>
                  <img src={AUTH_ICON} alt={'AUTH_ICON'} />
                </span>
              </span>
              <span className='emailSentMessage'>
                Please check your email at <span className='emailSent'>{email}</span> and click the
                confirmation link for email Verification. Thanks.
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default VerificationEmail;
