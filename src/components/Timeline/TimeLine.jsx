import { Button, Col, Row, Steps, Modal } from 'antd';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useWindowSize from '../../helpers/hooks';
import { collectionActions } from '../../services/collectionServices';
import CollectionNftCard from '../presentational/CollectionNftCard/CollectionNftCard';
import ProgressBar from '../presentational/Progress';
import BasicModal from '../Smart/BasicModal/BasicModal';
import { openNotification } from '../Smart/Notification';
import './Timeline.scss';

const { Step } = Steps;

const TimeLine = ({ status, data, collectionid }) => {
  const [browserWidth] = useWindowSize();
  const history = useHistory();
  const [visible, setVisible] = useState(status == -1);
  console.log('status', status);
  console.log('status data', data);
  const messages = {
    1: 'We are generating samples.... You will receive an email shortly when they are ready for your review.',
    2: 'Please verify the sample NFT’s are looking as expected.When you have validated them, click below to Approve.',
    3: 'Please be patient as this process can take a while.We will notify you by email once the NFT’s have been fully generated',
  };

  const handleAction = async () => {
    try {
      await collectionActions(collectionid, 'Approve');
      window.location.reload();
      openNotification('Congratulations!', 'You have approved your collection');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleInvalid = async () => {
    try {
      history.push(`/createNft/${collectionid}`);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOk = () => {
    setVisible(false);
    history.goBack();
  };

  const handleZip = () => {
    history.push(`/createNft/${collectionid}`);
  };

  return (
    <div className='main_page_width'>
      <div className='timeLineWrapper'>
        <Steps current={status} responsive={true}>
          <Step title='Awaiting Processing' />
          <Step title='Processing Zip' />
          <Step title='Waiting For Approval' />
          <Step title='Awaiting Processing' />
          <Step title='Generating NFT' />
        </Steps>
      </div>
      <div className='messageWrapper'>
        <div className='message'>{data?.body?.comments}</div>
      </div>
      <div className='collectionNftViewCardGrid'>
        <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
          {data?.body?.data?.map((item, index) => {
            return (
              <Col
                className='gutter-row'
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={8}
                xxl={4}
                key={index}
              >
                <CollectionNftCard data={item} showLikeIcon={false} />
              </Col>
            );
          })}
        </Row>
      </div>
      {status == 2 && (
        <div className='actionBtnsWrapper'>
          <div className='actionBtn'>
            <span className='btn' onClick={handleAction}>
              Approve
            </span>
            <span className='btn'>
              <BasicModal
                collectionid={collectionid}
                modalBtn='Upload New Zip File'
                modalDesp='Uploading a New Zip file will delete the existing one.'
                modalDesp1='Are you sure you want to continue?'
                btnText='Confrim'
              />
              {/* Upload New Zip File */}
            </span>
          </div>
        </div>
      )}
      {status !== 2 && (
        <ProgressBar percent={data?.body?.progress} classname={status == 0 ? 'dimOpacity' : ''} />
      )}
      {status == -1 && (
        <Modal
          visible={visible}
          footer={
            <>
              <Button onClick={handleZip}>Upload Zip File</Button>
              <Button className='bgColor' onClick={handleOk}>
                Ok
              </Button>
            </>
          }
          closable={false}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          maskClosable={false}
        >
          <p>{data?.body?.comments}</p>
          <p>
            You can choose to upload a new valid Zip File or email
            <span className='email'> support@nftdepot.art</span>
            with the above error information.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default TimeLine;
