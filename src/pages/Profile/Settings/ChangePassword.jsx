import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { updatePasswordAPI } from '../../../services/userServices';
import Spin from '../../../components/presentational/Spin';
import { openNotification } from '../../../components/Smart/Notification';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    const updatedData = {
      old_password: values?.old_password,
      new_password: values?.new_password,
      confirm_password: values?.confirm_password,
    };

    try {
      const res = await updatePasswordAPI(updatedData);
      setLoading(false);
      openNotification('Success', 'Password Updated Successfully');
    } catch (e) {
      setLoading(false);
      openNotification('Oops', e?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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

  return (
    <div>
      <Form name='basic' layout='horizontal' onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className='tabform_part_1'>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item
                name='old_password'
                label='Current Password'
                rules={[
                  {
                    required: true,
                    message: 'Please input current password!',
                  },
                ]}
              >
                <Input.Password placeholder='' />
              </Form.Item>
            </div>
          </div>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item
                name='new_password'
                label='New Password'
                rules={[
                  {
                    required: true,
                    message: 'Please input New password!',
                  },
                  {
                    validator: checkPassword,
                    message:
                      'The passwords MUST follow the “Password *” noted above…. 12-25 characters….. etc.',
                  },
                ]}
              >
                <Input.Password placeholder='' />
              </Form.Item>
            </div>
          </div>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item
                name='confirm_password'
                label='Confirm Password'
                rules={[
                  {
                    required: true,
                    message: 'Please confirm new password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('new_password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('New password and confirm password do not match.')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder='' />
              </Form.Item>
            </div>
          </div>
          <span className='nextButton'>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                {loading ? <Spin /> : 'Save changes'}
              </Button>
            </Form.Item>
          </span>
          <Form.Item>
            <span className='passInfo'>
              Password ( Passwords must be 12-25 characters and MUST contain 1 uppercase letter, 1
              lowercase letter and 1 special character (single and double quotes are not allowed). )
            </span>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
