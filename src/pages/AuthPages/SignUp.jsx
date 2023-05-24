import React, { useState } from 'react';
import PAGE_HEADER from '../../images/PageHeader.png';
import AUTH_ICON from '../../images/auth_icon.svg';
import { Input, Form, Button, Radio, Select } from 'antd';
import { Link } from 'react-router-dom';
import { SignUpAPI, VerifyEmailAPI, VerifyUsernameAPI } from '../../services/authServices';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../components/Smart/Notification';
import Spin from '../../components/presentational/Spin';
import useWindowSize from '../../helpers/hooks';
import { registerEmail } from '../../store/auth/authActions';
import { useEffect } from 'react';
import { codesAPI } from '../../services/createCollectionServices';
import './SignUp.scss';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [newsTeller, setNewsTeller] = useState(false);
  const dispatch = useDispatch();
  const wallet_id = useSelector((state) => state?.web3?.wallet);
  const history = useHistory();

  const onFinish = async (values) => {
    if (!wallet_id) {
      openNotification('Oops', 'Please connect to your wallet');
      return;
    }
    if (isAgree) {
      setLoading(true);
      try {
        const data = {
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
          password: values.password,
          confirm_password: values.confirmPassword,
          wallet_id: wallet_id,
          notification_marketing: newsTeller,
          username: values?.username,
        };
        const res = await SignUpAPI(data);
        setLoading(false);
        openNotification('User signed up successfully');
        dispatch(registerEmail(values.email));
        history.push('/auth/emailVerification');
      } catch (error) {
        setLoading(false);
        openNotification('Oops', error?.response?.data?.message);
        console.log('error', error);
      }
    } else {
      openNotification('Error', 'Please agree to the terms & conditions.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [browserWidth] = useWindowSize();

  const checkEmail = async (_, email) => {
    const res = await VerifyEmailAPI(email);
    if (res?.data?.body?.exists) {
      return Promise.reject('rejected');
    } else {
      return Promise.resolve(true);
    }
  };

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

  const checkUserName = async (_, username) => {
    const res = await VerifyUsernameAPI(username);
    if (res?.data?.body?.exists) {
      return Promise.reject('rejected');
    } else {
      return Promise.resolve(true);
    }
  };

  return (
    <>
      <div className='signUpWrapper'>
        <div className='SignUpPageHeader'>
          <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={'PAGE_HEADER'} />
        </div>
        <div className='registerFormWrapper main_page_width'>
          <div className='registerForm'>
            <div className='form'>
              <span className='formHeadingWrapper'>
                <span className='registerAcc'>Register a new account</span>
                <span className='registerIcon'>
                  <img src={AUTH_ICON} alt={'AUTH_ICON'} />
                </span>
              </span>
              <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                  name='username'
                  label='User Name'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  validateFirst={true}
                  validateTrigger='onChange'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your userName!',
                    },
                    {
                      validator: checkUserName,
                      message: `Username already registered`,
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder='FirstName' />
                </Form.Item>

                <Form.Item
                  name='firstName'
                  label='First Name'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your firstName!',
                    },
                  ]}
                >
                  <Input placeholder='FirstName' />
                </Form.Item>

                <Form.Item
                  name='lastName'
                  label='Last Name'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your lastName!',
                    },
                  ]}
                >
                  <Input placeholder='LastName' />
                </Form.Item>

                <Form.Item
                  name='email'
                  label='Email'
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  validateFirst={true}
                  validateTrigger='onChange'
                  rules={[
                    {
                      type: 'email',
                      message: 'Provided email is not valid.',
                    },
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                    {
                      validator: checkEmail,
                      message: `Email already registered`,
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Email' />
                </Form.Item>
                <Form.Item
                  name='password'
                  label={
                    <>
                      Password ( Passwords must be 12-25 characters and MUST contain 1 uppercase
                      letter, 1 lowercase letter and 1 special character (single and double quotes
                      are not allowed). )
                    </>
                  }
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
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
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
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
                          new Error('Password and Confirm password do not match.')
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder='Confirm Password' />
                </Form.Item>
                {/* <Form.Item
                  name="Security Questions"
                  label="Security Questions"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select placeholder="Security Questions">
                    {securityQuestions?.slice(0, 4)?.map((item, index) => {
                      return (
                        <Select.Option value={item?.code} key={item + index}>
                          <div
                            className="marginTop"
                            onClick={() =>
                              hanldeQuestion(index + 1, item?.description)
                            }
                          >
                            {item?.description}
                          </div>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                {showAnswerField && (
                  <Form.Item
                    label="Answer"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      // {
                      //   required: true,
                      //   message: "Please input your Answer!",
                      // },
                    ]}
                  >
                    <Input
                      placeholder="Answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    <div className="nextBtn" onClick={handleQuestions}>
                      <span>Submit</span>
                    </div>
                  </Form.Item>
                )} */}
                <Form.Item name='termsAndCondition'>
                  <Radio checked={isAgree} onClick={() => setIsAgree((prev) => !prev)}>
                    I agreee to the{' '}
                    <Link to='/TermsAndCondition' target='_blank' style={{ color: '#F37342' }}>
                      Terms & Conditions
                    </Link>
                  </Radio>
                </Form.Item>

                <Form.Item name='newsTeller'>
                  <Radio checked={newsTeller} onClick={() => setNewsTeller((prev) => !prev)}>
                    I would like to receive marketing, blog and special offer emails from
                    NFTDepot.Art.
                  </Radio>
                </Form.Item>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    {loading ? <Spin /> : 'Sign Up'}
                  </Button>
                </Form.Item>
                <div className='alreadyAcc'>
                  <Form.Item>
                    <Link to={'/auth/login'}>
                      <span className='toLoginText'>I already have an account</span>
                    </Link>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
