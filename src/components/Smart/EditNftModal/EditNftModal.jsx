import { Button, Form, Input, Modal, Switch, Tooltip } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { editNfAPI } from '../../../services/nftServices';
import QUESTION_MARK from '../../../images/questionMark.png';

import Spin from '../../presentational/Spin';
import { openNotification } from '../Notification';
import './EditNftModal.scss';

const EditNftModal = ({ visible, data, setVisible }) => {
  const formRef = useRef();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [isExplicit, setIsExplicit] = useState(data?.is_explicit === 0 ? false : true);
  console.log('isExplicit', isExplicit);
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const nftData = {
        description_short: values?.descriptionShort,
        description_long: values?.descriptionLong,
        contract_address: data?.contract_address,
        token_id: data?.token_id,
        current_sale_price: data?.current_sale_price,
        last_sale_price: data?.last_sale_price ?? 0,
        is_explicit: isExplicit ? 1 : 0,
        after_1st_purchase_text: values?.purchaseText,
      };
      const res = await editNfAPI(nftData, data?.guid);
      setLoading(false);
      openNotification('Success', 'Nft Info Updated Successfully');
      setVisible(false);
    } catch (error) {
      setLoading(false);
      openNotification('Error', error?.response?.data?.message);
    }
  };

  const onFinishFailed = (error) => {
    console.log(error);
  };

  const onReset = () => {
    form.resetFields();
    setLoading(false);
  };

  useEffect(() => {
    return onReset();
  }, [data]);
  return (
    <>
      <Modal
        visible={visible}
        footer={null}
        title={<div className='editTitle'>Edit Nft Details</div>}
        onOk={handleOk}
        onCancel={handleCancel}
        className='editNftModalWrapper'
      >
        <Form
          name='basic'
          initialValues={{
            remember: true,
            descriptionShort: data?.description_short,
            descriptionLong: data?.description_long,
            purchaseText: data?.after_1st_purchase_text,
            explicit: isExplicit ? 1 : 0,
            // data?.is_explicit,
          }}
          ref={formRef}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='on'
        >
          <Form.Item
            name='purchaseText'
            label='After 1st Purchase Text'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Please input 1st Purchase Text',
              },
            ]}
          >
            <Input placeholder='Enter 1st Purchase Text' />
          </Form.Item>
          <Form.Item
            name='descriptionShort'
            label='Short Description'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Please input Short Description',
              },
            ]}
          >
            <Input placeholder='Enter Short Description' />
          </Form.Item>

          <Form.Item
            name='descriptionLong'
            label='Long Description'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Please input Long Description',
              },
            ]}
          >
            <Input.TextArea placeholder='Enter Long Description' />
          </Form.Item>
          {/* <Form.Item
            name='explicit'
            label='Explicit'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Please input Explicit',
              },
            ]}
          >
            <Switch size='small' checked={isExplicit} onChange={() => setIsExplicit(!isExplicit)} />
          </Form.Item> */}

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {loading ? <Spin /> : 'Update'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditNftModal;
