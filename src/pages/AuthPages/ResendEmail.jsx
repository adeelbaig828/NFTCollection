import React, { useState } from 'react';
import PAGE_HEADER from '../../images/PageHeader.png';
import AUTH_ICON from '../../images/auth_icon.svg';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import { Input, Form, Button } from 'antd';
import { ForgotPasswordAPI, ResendUserEmailAPI } from '../../services/authServices';
import Spin from '../../components/presentational/Spin';
import { openNotification } from '../../components/Smart/Notification';
import './ForgotPassword.scss';
import useWindowSize from '../../helpers/hooks';

const ResendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const email = values.email;
      const { data } = await ResendUserEmailAPI(email);
      setLoading(false);
      setIsEmailSent(true);
      setEmail(values.email);
    } catch (error) {
      setLoading(false);
      openNotification('Oops', error?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [browserWidth] = useWindowSize();
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
              {isEmailSent ? (
                <>
                  <span className='emailSentMessage'>
                    Please check your email at <span className='emailSent'>{email}</span> and click
                    the confirmation link. Thanks.
                  </span>
                </>
              ) : (
                <>
                  <Form
                    name='basic'
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='on'
                  >
                    <Form.Item
                      name='email'
                      rules={[
                        {
                          type: 'email',
                          message: 'Provided email is not valid.',
                        },
                        {
                          required: true,
                          message: 'Please input your email!',
                        },
                      ]}
                    >
                      <Input placeholder='Enter email' />
                    </Form.Item>

                    <Form.Item>
                      <Button type='primary' htmlType='submit'>
                        {loading ? <Spin /> : 'Submit'}
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default ResendEmail;
