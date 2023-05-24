import React, { useState } from 'react';
import PAGE_HEADER from '../../images/PageHeader.png';
import AUTH_ICON from '../../images/auth_icon.svg';
import { Input, Form, Button } from 'antd';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import Spin from '../../components/presentational/Spin';
import { openNotification } from '../../components/Smart/Notification';
import { useSelector } from 'react-redux';
import { ChangePasswordAPI, getSecurityQuestionsStatusAPI } from '../../services/userServices';
import './ResetPassword.scss';
import useWindowSize from '../../helpers/hooks';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect } from 'react';

const ResetPassword = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(false);
  const { search } = useLocation();

  const { token, user_guid } = queryString.parse(search);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = {
        email: values?.email,
        new_password: values?.password,
        confirm_password: values?.confirmPassword,
        token: token,
      };
      const data = await ChangePasswordAPI(userData);
      openNotification('Password updated successfully');
      history.push('/auth/login');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      openNotification('Oops', error?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [browserWidth] = useWindowSize();

  const checkPassword = async (_, password) => {
    const pattern = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+])[A-Za-z\d~!@#$%^&*()_+]{8,}$/
    );
    if (!pattern.test(password)) {
      return Promise.reject('rejected');
    } else {
      return Promise.resolve(true);
    }
  };

  useEffect(() => {
    const checkSecurityQuestionsStatus = async () => {
      if (user_guid) {
        try {
          const res = await getSecurityQuestionsStatusAPI('15fc3743-866d-4529-9674-e7f464bd230e');
          if (res?.data?.body?.status == 1) {
            history.push(`/auth/security-question`);
          }
        } catch (e) {
          console.log('e', e);
        }
      }
    };
    checkSecurityQuestionsStatus();
  }, []);

  return (
    <>
      <div className='ChangePasswordWrapper'>
        <div className='ChangePasswordPageHeader'>
          <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={'PAGE_HEADER'} />
        </div>
        <div className='ChangePasswordFormWrapper'>
          <div className='ChangePasswordForm'>
            <div className='form'>
              <span className='formHeadingWrapper'>
                <span className='ChangePasswordAcc'>Reset password</span>
                <span className='ChangePasswordIcon'>
                  <img src={AUTH_ICON} alt={'AUTH_ICON'} />
                </span>
              </span>

              <Form
                name='basic'
                initialValues={{
                  remember: true,
                }}
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='on'
              >
                <Form.Item
                  name='email'
                  label='Email'
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
                  <Input placeholder='Email' />
                </Form.Item>
                <Form.Item
                  name='password'
                  label='New Password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your New password!',
                    },
                    {
                      validator: checkPassword,
                      message:
                        'The passwords MUST follow the “Password *” noted above…. 12-25 characters….. etc.',
                    },
                  ]}
                >
                  <Input.Password placeholder='Password' />
                </Form.Item>

                <Form.Item
                  name='confirmPassword'
                  label='Confirm Password'
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your confirmPassword!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('New password and confirm password do not match.')
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder='Confirm Password' />
                </Form.Item>

                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    {loading ? <Spin /> : 'Reset Password'}
                  </Button>
                </Form.Item>
                <Form.Item>
                  <span className='passInfo'>
                    Password ( Passwords must be 12-25 characters and MUST contain 1 uppercase
                    letter, 1 lowercase letter and 1 special character (single and double quotes are
                    not allowed). )
                  </span>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
