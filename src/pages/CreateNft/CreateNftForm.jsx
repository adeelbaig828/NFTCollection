import React, { useEffect, useState } from 'react';
import { Input, Form, Button, Select, Switch, InputNumber } from 'antd';
import RightArrow from '../../images/rightIcon.svg';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collectionDataSuccess } from '../../store/collectionForm/collectionActions';
import { codesAPI } from '../../services/createCollectionServices';
import './CreateNftForm.scss';

const CreateNftForm = () => {
  const [isExplicit, setIsExplicit] = useState(false);
  const [isMintable, setIsMintable] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [categoryCodes, setCategoryCodes] = useState('');
  console.log('categoryCodes', categoryCodes);
  const history = useHistory();

  const user = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCode = async () => {
      try {
        const res = await codesAPI('categoryCodes');
        setCategoryCodes(res.data);
      } catch (err) {
        console.log('errorrrr', err);
      }
    };
    getCode();
  }, []);

  const onFinish = async (values) => {
    const data = {
      store_name: values.storename ?? '',
      url_instagram: values.instagramLink ?? '',
      description_short: values.shortDescription ?? '',
      description_long: values.longDescription ?? '',
      url_personal: values.personalLink ?? '',
      url_medium: values.mediaLink ?? '',
      url_discord: values.discordLink ?? '',
      url_telegram: '',
      after_1st_purchase_text: values.afterPurchaseMessage ?? '',
      minting_supply_count: values.mintingSupply ?? 0,
      minting_coin: values.mintingCoin ?? '',
      mint_locked: 0,
      layout_style_code: '',
      is_explicit: isExplicit ? 1 : 0,
      mintable: isMintable ? 1 : 0,
      isActive: isActive,
      created_by: user?.first_name ?? '',
      created_date: new Date().toLocaleString(),
      category_code: values.category ?? '',
      url_name: '',
      delay_days: 0,
      royalty_percent: 0,
      third_party_royalty_percent: 0,
      third_party_wallet_id: '0xE7b3D35c1939592332735E6300b4DC00d3A3E5B0',
      who_pays_fees: '',
    };
    try {
      dispatch(collectionDataSuccess(data));
      history.push('/createCollectionUploadImage');
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className='CreateCollectionFormWrapper'>
        {/* <div className="header">
          <span className="step1">Step 1</span>
          <span className="desc">Fill the following fields</span>
        </div> */}
        <div className='CreateNftForm'>
          <Form
            name='basic'
            initialValues={{
              remember: true,
              layout: 'inline',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='on'
          >
            <div className='CreateNftFormItemWrapper'>
              <Form.Item
                name='storename'
                rules={[
                  {
                    required: true,
                    message: 'Please input your storeName!',
                  },
                ]}
              >
                <Input placeholder='Store name' />
              </Form.Item>
              <Form.Item
                name='instagramLink'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Instagram link !',
                  },
                ]}
              >
                <Input placeholder='Instagram link ' />
              </Form.Item>
              <Form.Item
                name='shortDescription'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Short Description!',
                  },
                ]}
              >
                <Input placeholder='Short Description' />
              </Form.Item>

              <Form.Item
                name='personalLink'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Personal link!',
                  },
                ]}
              >
                <Input placeholder='Personal link' />
              </Form.Item>

              <Form.Item
                name='longDescription'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Long description!',
                  },
                ]}
              >
                <Input.TextArea placeholder='Long description' style={{ height: 120 }} />
              </Form.Item>

              <span className='mediaAndDiscordLinks'>
                <Form.Item
                  name='mediaLink'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Media link!',
                    },
                  ]}
                >
                  <Input placeholder='Medium link' />
                </Form.Item>

                <Form.Item
                  name='discordLink'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Discord link!',
                    },
                  ]}
                >
                  <Input placeholder='Discord link' />
                </Form.Item>
              </span>

              <Form.Item
                name='category'
                rules={[
                  {
                    required: true,
                    message: 'Please select a Category!',
                  },
                ]}
              >
                <Select placeholder='Category'>
                  {/* {categoryCodes?.body?.map((item) => {
                    return <Select.Option value={item?.code}>{item?.code}</Select.Option>;
                  })} */}
                </Select>
              </Form.Item>

              <Form.Item
                name='afterPurchaseMessage'
                rules={[
                  {
                    required: true,
                    message: 'Please input After purshase message!',
                  },
                ]}
              >
                <Input placeholder='After purshase message' />
              </Form.Item>

              <Form.Item
                name='mintingSupply'
                rules={[
                  {
                    required: true,
                    message: 'Please input Minting supply Count!',
                  },
                ]}
              >
                <InputNumber placeholder='Minting supply' controls={false} />
              </Form.Item>

              <Form.Item
                name='mintingCoin'
                rules={[
                  {
                    required: true,
                    message: 'Please input Minting coin!',
                  },
                ]}
              >
                <Input placeholder='Minting coin' />
              </Form.Item>

              <span className='dFlex'>
                <Form.Item
                  label='Explicit'
                  labelAlign='left'
                  valuePropName='checked'
                  className='firstSwitch'
                >
                  <Switch
                    size='small'
                    checked={isExplicit}
                    onChange={() => setIsExplicit(!isExplicit)}
                  />
                </Form.Item>

                <Form.Item label='Mintable' labelAlign='left' valuePropName='checked'>
                  <Switch
                    size='small'
                    checked={isMintable}
                    onChange={() => setIsMintable(!isMintable)}
                  />
                </Form.Item>

                <Form.Item label='Active' labelAlign='left' valuePropName='checked'>
                  <Switch size='small' checked={isActive} onChange={() => setIsActive(!isActive)} />
                </Form.Item>
              </span>
            </div>

            <span className='submitButton'>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  {/* {loading ? <Spin /> : "Sign Up"} */}
                  Next
                  <img src={RightArrow} alt={'RightArrow'} />
                </Button>
              </Form.Item>
            </span>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateNftForm;
