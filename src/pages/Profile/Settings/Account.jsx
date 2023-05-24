import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropZone from '../../../components/Smart/DropZone/DropZone';
import { openNotification } from '../../../components/Smart/Notification';
import { uploadAPI } from '../../../services/createCollectionServices';
import { updateProfileAPI } from '../../../services/userServices';
import Spin from '../../../components/presentational/Spin';
import './Account.scss';
import { setProfile } from '../../../store/auth/authActions';
import { VerifyUser } from '../../../services/authServices';
import { toast } from 'react-toastify';

const Account = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    let profileImageLocation = null;
    if (profileImage?.length) {
      profileImageLocation = await uploadAPI(profileImage[0]);
    }
    const updatedData = {
      answer1: user?.answer1 ?? '',
      answer2: user?.answer2 ?? '',
      answer3: user?.answer3 ?? '',
      answer4: user?.answer4 ?? '',
      city: user?.city ?? '',
      guid: user?.guid ?? '',
      irs1099: user?.irs1099 ?? '',
      notification_auction_expired: user?.notification_auction_expired ?? 1,
      notification_bid_activity: user?.notification_bid_activity ?? 1,
      notification_bid_minimum_met_amount: user?.notification_bid_minimum_met_amount ?? 1,
      notification_bid_minimum_met_coin_type: user?.notification_bid_minimum_met_coin_type ?? '1',
      notification_item_sold: user?.notification_item_sold ?? 1,
      notification_marketing: user?.notification_marketing ?? 0,
      notification_out_bid: user?.notification_out_bid ?? 1,
      notification_owned_item_updated: user?.notification_owned_item_updated ?? 1,
      notification_price_change: user?.notification_price_change ?? 1,
      notification_purchase_successful: user?.notification_purchase_successful ?? 1,
      phone2: user?.phone2 ?? '',
      postal_code: user?.postal_code ?? '',
      provence: user?.provence ?? '',
      show_explicit: user?.show_explicit ?? '',
      state: user?.state ?? '',
      image_profile_location: profileImageLocation?.body?.url ?? user?.image_profile_location,
      first_name: values?.first_name === '' ? user?.first_name : values?.first_name,
      last_name: values?.last_name === '' ? user?.last_name : values?.last_name,
      address1: values?.address1 === '' ? user?.address1 : values?.address1,
      address2: values?.address2 === '' ? user?.address2 : values?.address2,
      country: values?.country === '' ? user?.country : values?.country,
      phone1: values?.phone1 === '' ? user?.phone1 : values?.phone1,
      company: values?.company === '' ? user?.company : values?.company,
    };

    try {
      const res = await updateProfileAPI(updatedData);
      setLoading(false);
      dispatch(setProfile({ ...user, updatedData }));
      const userData = await VerifyUser();
      dispatch(setProfile(userData));
      openNotification('User updated successfully');
    } catch (e) {
      setLoading(false);
      openNotification('Oops', e?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='accSettingWrapper'>
      <div className='dropZoneWrapper'>
        <div className='dropZoneSection'>
          <DropZone
            selectedImage={profileImage}
            setSelectedImage={setProfileImage}
            imageType='profile'
            imgSrc={user?.image_profile_location}
          />
        </div>
      </div>
      <Form
        name='basic'
        layout='horizontal'
        scrollToFirstError='true'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='on'
        initialValues={{
          first_name: user?.first_name ?? '',
          last_name: user?.last_name ?? '',
          username: user?.username ?? '',
          email: user?.email ?? '',
          address1: user?.address1 ?? '',
          address2: user?.address2 ?? '',
          country: user?.country ?? '',
          phone1: user?.phone1 ?? '',
          company: user?.company ?? '',
        }}
      >
        <div className='tabform_part_1 _space_inner_de'>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item name='first_name' label='First Name'>
                <Input placeholder='First Name' />
              </Form.Item>
            </div>
          </div>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item name='last_name' label='Last Name'>
                <Input placeholder='Last Name' />
              </Form.Item>
            </div>
          </div>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item name='username' label='Username'>
                <Input placeholder='Username' readOnly />
              </Form.Item>
            </div>
          </div>
          <div className='_field_out'>
            <div className='fields_input_data'>
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
                <Input placeholder='Email' readOnly />
              </Form.Item>
            </div>
          </div>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item name='address1' label='Primary Address'>
                <Input placeholder='Primary Address' />
              </Form.Item>
            </div>
          </div>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item name='address2' label='Secondary Address'>
                <Input placeholder='Secondary Address' />
              </Form.Item>
            </div>
          </div>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item name='country' label='Country'>
                <Input placeholder='Country' />
              </Form.Item>
            </div>
          </div>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item name='phone1' label='Phone Number'>
                <Input placeholder='Phone Number' />
              </Form.Item>
            </div>
          </div>
          <div className='_field_out'>
            <div className='fields_input_data'>
              <Form.Item name='company' label='Company'>
                <Input placeholder='Company' />
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
        </div>
      </Form>
    </div>
  );
};

export default Account;
