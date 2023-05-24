import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import FRAME_ICON from '../../../images/frame.svg';
import EYE_ICON from '../../../images/eye_icon.svg';
import LINK_ICON from '../../../images/link_icon.svg';
import ORANGE_FRAME from '../../../images/orange_frame.svg';
import { Tooltip } from 'antd';
import './ExploreCard.scss';
import { useHistory } from 'react-router-dom';
import { followCollection, unFollowCollection } from '../../../services/collectionServices';
import { openNotification } from '../../Smart/Notification';
import { truncate, truncateTitle } from '../../../helpers/utils';
import { useSelector } from 'react-redux';
import { confirm } from '../../Smart/Modal';

const { Meta } = Card;

const ExploreCard = ({ data, showFollowIcon = true, exploreData, setExploreData }) => {
  const history = useHistory();
  const user = useSelector((state) => state?.auth?.user);
  const handleClick = () => {
    history.push(`/collectionView/${data?.guid}`);
  };

  const followTheCollection = async (e) => {
    e.stopPropagation();
    try {
      const res = await followCollection(data?.guid);
      if (res?.body?.followed) {
        const dataManipulated = exploreData.map((el) => {
          if (el.guid === data.guid) {
            return {
              ...el,
              is_followed: true,
            };
          }
          return el;
        });
        setExploreData(dataManipulated);
        openNotification('Collection followed successfully');
      }
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
      return error;
    }
  };
  const unFollowCollections = async (e) => {
    e.stopPropagation();
    try {
      const res = await unFollowCollection(data?.guid);
      const dataManipulated = exploreData.map((el) => {
        if (el.guid === data.guid) {
          return {
            ...el,
            is_followed: false,
          };
        }
        return el;
      });
      setExploreData(dataManipulated);
      openNotification('Collection unfollowed successfully');
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  };

  const handleCreatedBy = (e) => {
    e.stopPropagation();
    if (user?.username === data?.created_by) {
      history.push(`/profile`);
    } else {
      history.push(`/creatorDetails/${data?.created_by}`);
    }
  };

  const handleOk = () => {
    data?.url_personal?.includes('https') && window.open(data?.url_personal);
  };

  const handleUrlPersonal = (e) => {
    e.stopPropagation();
    confirm(
      <>
        You are about ready to leave NFTDepot.Art and go to
        <p className='linkStyle'>{data?.url_personal}</p>
      </>,
      'Are you sure you wish to do this? ',
      'YES',
      'NO',
      handleOk
    );
  };

  return (
    <div className='ExploreCard' onClick={handleClick}>
      <Card
        hoverable
        cover={
          <span className='ExploreCardWrapper'>
            <span className='ExploreCardImage'>
              <img alt='example' src={data?.image_large_location} />
            </span>
            <Tooltip title={data?.is_followed ? 'UnFollow' : 'Follow'} color={'#303549'}>
              {showFollowIcon && (
                <span
                  className={data?.is_followed ? 'orangeFrame' : 'frame'}
                  onClick={
                    data?.is_followed
                      ? (e) => unFollowCollections(e)
                      : (e) => followTheCollection(e)
                  }
                >
                  <img src={FRAME_ICON} alt={'FRAME_ICON'} />
                </span>
              )}
            </Tooltip>

            <span
              className='footer'
              style={{
                background: `url(${data?.image_small_location}) no-repeat`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            ></span>
          </span>
        }
      >
        <Meta
          title={<div className='DisplayF'>{truncateTitle(data?.store_name)}</div>}
          description={truncate(data?.description_short)}
        />
        <div className='exploreCardFooter'>
          <div className='rightSection'>
            <span className='tagImage'>
              <Tooltip title={'Views'} color={'#303549'}>
                <img src={EYE_ICON} alt={'EYE_ICON'} />
              </Tooltip>
              <span className='beliefPrice'>{data?.views}</span>
            </span>
            <span className='tagImage'>
              <Tooltip title={'Followers'} color={'#303549'}>
                <img src={ORANGE_FRAME} alt={'ORANGE_FRAME'} />
              </Tooltip>
              <span className='tagPrice'>{data?.followers_count}</span>
            </span>
            {data?.url_personal?.includes('https') && (
              <span className='tagImage'>
                <Tooltip title={data?.url_personal} color={'#303549'}>
                  <img src={LINK_ICON} alt={'LINK_ICON'} onClick={(e) => handleUrlPersonal(e)} />
                </Tooltip>
              </span>
            )}
            {data?.created_by && (
              <span className='dFlex' onClick={(e) => handleCreatedBy(e)}>
                <span className='createdBy'>Created By: </span>
                <span className='textStyle'>{data?.created_by}</span>
              </span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExploreCard;
