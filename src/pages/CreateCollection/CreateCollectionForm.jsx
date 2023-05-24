import React, { useEffect, useState } from 'react';
import { Input, Form, Button, Select, Switch, InputNumber, Tooltip, Upload, message } from 'antd';
import RightArrow from '../../images/rightIcon.svg';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  collectionDataSuccess,
  collectionNameStatus,
} from '../../store/collectionForm/collectionActions';
import QUESTION_MARK from '../../images/questionMark.png';
import { checkStroeNameAvailability, codesAPI } from '../../services/createCollectionServices';
import './CreateCollectionForm.scss';
import { openNotification } from '../../components/Smart/Notification';
import { CopyOutlined, UploadOutlined } from '@ant-design/icons';
import TextFormatter from '../../components/Smart/TextFormatter';
import { EditorState } from 'draft-js';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CreateCollectionForm = () => {
  const formData = useSelector((state) => state?.collectionData?.data);
  const nameStatus = useSelector((state) => state?.collectionData?.collectionNameStatus);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [textContent, setTextContent] = useState('');

  const [isExplicit, setIsExplicit] = useState(formData?.is_explicit ?? false);
  const [isMintable, setIsMintable] = useState(formData?.mintable ?? false);
  const [isPublish, setIsPublish] = useState(formData?.publish ?? false);
  // const [isActive, setIsActive] = useState(false);
  const [delayDays, setDelayDays] = useState(5);
  const [categoryCodes, setCategoryCodes] = useState([]);
  const [layoutCodes, setLayoutCodes] = useState([]);
  const [mintingCoin, setMintingCoin] = useState([]);
  const [whoPaysFee, setWhoPaysFee] = useState([]);
  const [isMintLocked, setIsMintLocked] = useState(formData?.mint_locked ?? false);
  const [storename, setStoreName] = useState('');
  const [storenameStatus, setStoreNameStatus] = useState(nameStatus ?? null);
  const [urlName, setUrlname] = useState('');
  const [collectionPrice, setCollectionPrice] = useState(null);
  const [purchaserLicense, setPurchaserLicense] = useState([{}]);

  const history = useHistory();

  const user = useSelector((state) => state?.auth?.user);
  const walletId = useSelector((state) => state?.web3?.wallet);

  const handleStorename = async (storeName) => {
    if (!storeName) {
      setStoreNameStatus(null);
      setStoreName(storeName);
    } else {
      setStoreNameStatus('validating');
      setStoreName(storeName);
      try {
        const res = await checkStroeNameAvailability(storeName);
        if (res?.data?.body?.exists) {
          setStoreNameStatus('error');
        } else {
          setStoreNameStatus('success');
        }
      } catch (error) {
        console.log('error', error);
        openNotification('Oops', 'Something went wrong');
      }
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const getCode = async () => {
      try {
        const res = await codesAPI('CategoryCode');
        setCategoryCodes(res.data);
        const response = await codesAPI('LayoutCodes');
        setLayoutCodes(response?.data);
        const respons = await codesAPI('Minting Coin');
        setMintingCoin(respons?.data);
        const feeData = await codesAPI('WhoPaysFees');
        setWhoPaysFee(feeData?.data);
      } catch (error) {
        console.log('error', error?.response?.data?.message);
      }
    };
    getCode();
  }, []);

  const onFinish = async (values) => {
    const data = {
      store_name: values.storename ?? '',
      url_instagram: values.instagramLink ?? '',
      description_short: values.shortDescription ?? '',
      description_long: JSON.stringify(textContent),
      url_personal: values.personalLink ?? '',
      url_medium: values.mediumLink ?? '',
      url_discord: values.discordLink ?? '',
      url_telegram: values.telegramLink ?? '',
      after_1st_purchase_text: values.afterPurchaseMessage ?? '',
      minting_supply_count: values.mintingSupply ?? 0,
      minting_coin: values.mintingCoin ?? '',
      mint_locked: isMintLocked ? 1 : 0,
      is_explicit: isExplicit ? 1 : 0,
      mintable: isMintable ? 1 : 0,
      publish: isPublish ? 1 : 0,
      isActive: 1,
      created_by: user?.first_name ?? '',
      created_date: new Date().toLocaleString(),
      category_code: values.category ?? '',
      url_name: `${window.location.origin}/collectionView/${storename}`,
      delay_days: values.delayDays ?? 5,
      royalty_percent: values.royaltyPercent ?? 2,
      third_party_royalty_percent: values.thirdPartyRoyaltyPercent ?? 0,
      default_price: values.collectionPrice ?? null,
      price: values.collectionPrice ?? null,
      third_party_wallet_id: values.thirdPartyWalletId ?? '',
      who_pays_fees: 'Seller',
    };
    dispatch(collectionNameStatus(storenameStatus));
    if (storenameStatus == 'success') {
      dispatch(collectionDataSuccess(data));
      history.push('/createCollectionUploadImage', { data: data });
    }
    // else {
    //   openNotification("Oops", "Store name already exists");
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleClipBoardCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/collectionView/${storename}`);
      openNotification('Link Copied Successfully');
    } catch (error) {
      console.log('error', error);
    }
  };

  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: (file) => {
      const isDocx =
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (!isDocx) {
        message.error('You can only upload DOCX file!');
      }
      const limit = 1;

      if (purchaserLicense.length >= limit) {
        message.info(`You can only upload ${limit} DOCX file!`);
      }
      setPurchaserLicense(file);

      return isDocx && purchaserLicense.length < limit;
    },
  };

  return (
    <>
      <div className='CreateCollectionFormWrapper main_page_width'>
        <div className='step1Header'>
          <span className='step1'>Step 1</span>
          <span className='desc'>Fill the following fields</span>
        </div>
        <div className='CreateCollectionForm'>
          <Form
            name='basic'
            layout='vertical'
            initialValues={{
              remember: true,
              storename: formData?.store_name ?? '',
              instagramLink: formData?.url_instagram ?? '',
              shortDescription: formData?.description_short ?? '',
              longDescription: formData?.description_long ?? '',
              personalLink: formData?.url_personal ?? '',
              mediumLink: formData?.url_medium ?? '',
              category: formData?.category_code ?? '',
              delayDays: formData?.delay_days ?? 5,
              thirdPartyRoyaltyPercent: formData?.third_party_royalty_percent ?? 0.0,
              collectionPrice: formData?.price ?? null,
              discordLink: formData?.url_discord ?? '',
              telegramLink: formData?.url_telegram ?? '',
              afterPurchaseMessage: formData?.after_1st_purchase_text ?? '',
              mintingSupply: formData?.minting_supply_count ?? null,
              mintingCoin: formData?.minting_coin ?? '',
              isExplicit: formData?.is_explicit ?? isExplicit,
              isMintable: formData?.mintable ?? isMintable,
              isPublish: formData?.publish ?? isPublish,
              isMintLocked: formData?.mint_locked ?? isMintLocked,
              royaltyPercent: formData?.royalty_percent ?? 0,
              thirdPartyWalletId: formData?.third_party_wallet_id ?? walletId,
              whoPaysFee: formData?.who_pays_fees ?? 'Seller',
            }}
            scrollToFirstError='true'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='on'
          >
            <div className='CreateCollectionFormItemWrapper'>
              <div className='CreateCollectionFormIteminner1'>
                <Form.Item
                  name='storename'
                  label='Store Name'
                  help={storenameStatus == 'error' ? 'Collection name already exists' : ''}
                  hasFeedback
                  validateStatus={storenameStatus}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your storeName!',
                    },
                  ]}
                >
                  <Input
                    placeholder='Store name'
                    value={storename}
                    onChange={(e) => handleStorename(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name='shortDescription'
                  label='Short Description'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Short Description!',
                    },
                  ]}
                >
                  <Input placeholder='Short Description' />
                </Form.Item>
                <Form.Item name='longDescription' label='Long Description'>
                  <TextFormatter
                    editorState={editorState}
                    setEditorState={setEditorState}
                    setEmailContent={setTextContent}
                    htmlText={
                      formData?.description_long ? JSON.parse(formData?.description_long) : ''
                    }
                  />
                </Form.Item>
                <Form.Item
                  name='category'
                  label='Category'
                  rules={[
                    {
                      required: true,
                      message: 'Please select a Category!',
                    },
                  ]}
                >
                  <Select placeholder='Category'>
                    {categoryCodes?.body?.map((item, index) => {
                      return (
                        <Select.Option value={item?.code} key={item + index}>
                          {item?.description}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item name='afterPurchaseMessage' label='After 1st Purchase Message'>
                  <Input placeholder='After purshase message' />
                </Form.Item>
                <Form.Item
                  name='mintingCoin'
                  label='Minting Coin'
                  rules={[
                    {
                      required: true,
                      message: 'Please select a Minting Coin!',
                    },
                  ]}
                >
                  <Select placeholder='Minting Coin'>
                    {mintingCoin?.body?.slice(0, 2)?.map((item, index) => {
                      return (
                        <Select.Option value={item?.code} key={item + index}>
                          {item?.description}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name='thirdPartyRoyaltyPercent'
                  label={
                    <div>
                      Royalty Percent
                      <Tooltip
                        title=' This is the “Royalty Percentage” you will receive for each resale after the 1st sale. This will be deducted from the sale price and paid to the “Payout Wallet”.'
                        color={'#303549'}
                        overlayClassName='favouriteToolTip'
                      >
                        <span className='infoIcon'>
                          <img src={QUESTION_MARK} alt={'QUESTION_MARK'} />
                        </span>
                      </Tooltip>
                    </div>
                  }
                >
                  <InputNumber placeholder='Royalty Percent' controls={false} />
                </Form.Item>
                <Form.Item
                  name='collectionPrice'
                  label='Price'
                  rules={[
                    {
                      required: true,
                      message: 'Please input Collection Price!',
                    },
                  ]}
                >
                  <Input
                    placeholder='Collection Price'
                    value={collectionPrice}
                    onChange={(e) => setCollectionPrice(e.target.value)}
                  />
                </Form.Item>

                <div className='displayFlex'>
                  <Form.Item
                    label={
                      <div>
                        Mint Locked
                        <Tooltip
                          title='Use this ONLY when you are sure there are to be no changes to any part of the collection. (Commonly when images are stored to IPFS, etc.)'
                          color={'#303549'}
                          overlayClassName='favouriteToolTip'
                        >
                          <span className='infoIcon'>
                            <img src={QUESTION_MARK} alt={'QUESTION_MARK'} />
                          </span>
                        </Tooltip>
                      </div>
                    }
                    labelAlign='left'
                    valuePropName='checked'
                    className='firstSwitch'
                  >
                    <Switch
                      size='small'
                      checked={isMintLocked}
                      onChange={() => setIsMintLocked(!isMintLocked)}
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div>
                        Explicit
                        <Tooltip
                          title={
                            'Enable this if your items may contain harmful, sexual, or violent  content. This will help users to safely limit their searches.'
                          }
                          color={'#303549'}
                          overlayClassName='favouriteToolTip'
                        >
                          <span className='infoIcon'>
                            <img src={QUESTION_MARK} alt={'QUESTION_MARK'} />
                          </span>
                        </Tooltip>
                      </div>
                    }
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
                  <Form.Item
                    label={
                      <div>
                        Mintable
                        <Tooltip
                          title={
                            'Enabling this will create your contract on the blockchain. This may entail gas fees depending on the blockchain you have selected.'
                          }
                          color={'#303549'}
                          overlayClassName='favouriteToolTip'
                        >
                          <span className='infoIcon'>
                            <img src={QUESTION_MARK} alt={'QUESTION_MARK'} />
                          </span>
                        </Tooltip>
                      </div>
                    }
                    labelAlign='left'
                    valuePropName='checked'
                  >
                    <Switch
                      size='small'
                      checked={isMintable}
                      onChange={() => setIsMintable(!isMintable)}
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div>
                        Publish
                        <Tooltip
                          title={'Enabling this will create your collection'}
                          color={'#303549'}
                          overlayClassName='favouriteToolTip'
                        >
                          <span className='infoIcon'>
                            <img src={QUESTION_MARK} alt={'QUESTION_MARK'} />
                          </span>
                        </Tooltip>
                      </div>
                    }
                    labelAlign='left'
                    valuePropName='checked'
                  >
                    <Switch
                      size='small'
                      checked={isPublish}
                      onChange={() => setIsPublish(!isPublish)}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='CreateCollectionFormIteminner2'>
                <Form.Item name='instagramLink' label='Instagram Link'>
                  <Input
                    placeholder='Instagram link '
                    prefix={<span className='prefixColor'>https://www.instagram.com/</span>}
                  />
                </Form.Item>
                <Form.Item
                  name='personalLink'
                  label={
                    <div>
                      Personal Link
                      <Tooltip
                        title='This is the link that will be used to access your personal site. This will be generated automatically if left blank.'
                        color={'#303549'}
                        overlayClassName='favouriteToolTip'
                      >
                        <span className='infoIcon'>
                          <img src={QUESTION_MARK} alt={'QUESTION_MARK'} />
                        </span>
                      </Tooltip>
                    </div>
                  }
                >
                  <Input placeholder='your personal site link' />
                </Form.Item>
                <Form.Item
                  name='urlName'
                  label={
                    <div>
                      NFTDepot Link
                      <Tooltip
                        title='Click here for the auto-generated link to your collection on NFTDepot.Art. It will be functional once the collection has been successfully created.'
                        color={'#303549'}
                        overlayClassName='favouriteToolTip'
                      >
                        <span className='infoIcon' onClick={handleClipBoardCopy}>
                          <CopyOutlined />
                        </span>
                      </Tooltip>
                    </div>
                  }
                >
                  <Input
                    prefix={
                      <span className='prefixColor'>
                        {`${window.location.origin}/collectionView/${storename}`}
                      </span>
                    }
                    readOnly
                  />
                </Form.Item>
                <span className='mediaAndDiscordLinks'>
                  <Form.Item name='mediumLink' label='Medium Link'>
                    <Input
                      placeholder='Medium link'
                      prefix={<span className='prefixColor'>https://medium.com/</span>}
                    />
                  </Form.Item>

                  <Form.Item name='discordLink' label='Discord Link'>
                    <Input
                      placeholder='Discord link'
                      prefix={<span className='prefixColor'>https://discord.com/</span>}
                    />
                  </Form.Item>
                </span>
                <Form.Item name='telegramLink' label='Telegram Link'>
                  <Input
                    placeholder='Telegram link'
                    prefix={<span className='prefixColor'>https://telegram.com/</span>}
                  />
                </Form.Item>
                <Form.Item
                  name='mintingSupply'
                  label='Minting Supply'
                  rules={[
                    {
                      required: true,
                      message: 'Please input Minting supply Count!',
                    },
                  ]}
                >
                  <InputNumber placeholder='Minting supply Count' controls={false} />
                </Form.Item>
                <Form.Item
                  name='delayDays'
                  label='Delay Days'
                  rules={[
                    {
                      required: true,
                      message: 'Please input Delay Days!',
                    },
                  ]}
                >
                  <InputNumber
                    placeholder='Days to delay before showing next level'
                    controls={false}
                  />
                </Form.Item>
                <Form.Item
                  name='thirdPartyWalletId'
                  label={
                    <div>
                      Payout Wallet
                      <Tooltip
                        title='This is the Wallet ID that will receive the first sale and future royalty payments (if applicable) for this collection.'
                        color={'#303549'}
                        overlayClassName='favouriteToolTip'
                      >
                        <span className='infoIcon'>
                          <img src={QUESTION_MARK} alt={'QUESTION_MARK'} />
                        </span>
                      </Tooltip>
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Please input Payout Wallet id!',
                    },
                  ]}
                >
                  <Input placeholder='Wallet ID we will payout the royalty to' />
                </Form.Item>
              </div>
            </div>

            <span className='nextButton'>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  {'Next'}
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

export default CreateCollectionForm;
