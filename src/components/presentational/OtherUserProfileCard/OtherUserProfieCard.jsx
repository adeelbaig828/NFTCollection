import React from 'react';
import { Card } from 'antd';
import Verified from '../../../images/verified.png';
import './OtherUserProfileCard.scss';

const { Meta } = Card;

const OtherUserProfileCard = ({ data }) => {
  console.log('OtherUserProfileCard', data);
  return (
    <div className='OtherUserProfileCard'>
      <Card
        cover={
          <span className='ProfileCardWrapper'>
            <span className='ProfileCardImage'>
              <img
                alt='example'
                src={
                  data?.image_profile_location
                    ? data?.image_profile_location
                    : 'https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528__340.jpg'
                }
              />
            </span>
          </span>
        }
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5%' }}>
          <Meta title={data?.first_name + ' ' + data?.last_name} />
          {data?.active === 1 && <img style={{ width: '20px' }} src={Verified} alt='Verified' />}
        </div>
      </Card>
    </div>
  );
};

export default OtherUserProfileCard;
