import React, { useState } from 'react';
import PAGE_HEADER from '../../images/PageHeader.png';
import AUTH_ICON from '../../images/auth_icon.svg';
import { Input, Form, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { LoginAPI } from '../../services/authServices';
import { openNotification } from '../../components/Smart/Notification';
import { toast } from 'react-toastify';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import Spin from '../../components/presentational/Spin';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { LoginSuccess, rememberUser, setProfile } from '../../store/auth/authActions';
import useWindowSize from '../../helpers/hooks';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = {
        email: values.email,
        password: values.password,
      };
      const { data } = await LoginAPI(userData);
      setLoading(false);
      localStorage.setItem('token', data?.body?.token);
      localStorage.setItem('saved', new Date().getTime());
      dispatch(LoginSuccess());
      dispatch(setProfile(data?.body?.user));
      dispatch(rememberUser(isRemember));
      openNotification('User successfully logged in');
    } catch (error) {
      setLoading(false);
      openNotification('Oops', error?.response?.data?.message);
      // toast.error('Oops');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [browserWidth] = useWindowSize();

  return (
    <>
      <div className='LoginWrapper'>
        <div className='LoginPageHeader'>
          <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={'PAGE_HEADER'} />
        </div>
        <div className='loginFormWrapper main_page_width'>
          <div className='loginForm'>
            <div className='form'>
              <span className='formHeadingWrapper'>
                <span className='loginAcc'>Login with your account</span>
                <span className='loginIcon'>
                  <img src={AUTH_ICON} alt={'AUTH_ICON'} />
                </span>
              </span>
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
                  label='User Name / Email'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username or email!',
                    },
                  ]}
                >
                  <Input placeholder='Enter Username or Email' />
                </Form.Item>

                <Form.Item
                  name='password'
                  label='Password'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password placeholder='Password' />
                </Form.Item>

                <Form.Item name='remember'>
                  <Checkbox value={isRemember} onChange={() => setIsRemember((prev) => !prev)}>
                    Remember me
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    {loading ? <Spin /> : 'Login'}
                  </Button>
                </Form.Item>
                <div>
                  <Form.Item>
                    <Link to={'/auth/forgotPassword'}>
                      <span className='toLoginText'>Forgot password?</span>
                    </Link>
                  </Form.Item>
                  <Form.Item>
                    <Link to={'/auth/login'}>
                      <span className='toLoginText'>
                        Account Not Verified Yet?. Click
                        <span style={{ margin: '0px 4px' }}>
                          <Link to='/auth/resendEmail'>here</Link>
                        </span>
                        for Verification
                      </span>
                    </Link>
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div className='orText'>
              <span>OR</span>
            </div>
            <div>
              <Link to={'/auth/signup'}>
                <div className='createAcc'>
                  <span className='createAccText'>Create an account</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Login;
