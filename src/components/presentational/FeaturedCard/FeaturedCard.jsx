import React, { useState } from 'react';
import { Card } from 'antd';
import TEST_ICON from '../../../images/test_footer.svg';
import TEST_IMG from '../../../images/test_img.png';
import ORANGE_DOT from '../../../images/orange_dot.svg';
import ORANGE_FRAME from '../../../images/orange_frame.svg';
import LIKE_ICON from '../../../images/like_icon.svg';
import LIKED_ICON from '../../../images/liked_icon.svg';

import { Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import { openNotification } from '../../Smart/Notification';
import { likeNfts, unLikeNfts } from '../../../services/collectionServices';
import './FeaturedCard.scss';
import { truncate } from '../../../helpers/utils';

const FeaturedCard = ({ data, isNft, showFollowIcon = true }) => {
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(data?.is_liked);
  const handleClick = () => {
    if (isNft) {
      history.push(`/nftDetail/${data?.guid}`);
    } else {
      history.push(`/collectionView/${data?.guid}`);
    }
  };
  const likeNft = async (e) => {
    e.stopPropagation();
    try {
      const res = await likeNfts(data?.guid);
      setIsLiked(true);
      if (res?.body?.like == '1' || res?.body?.like == true) {
        openNotification('Nft liked successfully');
      }
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  };
  const unLikeNft = async (e) => {
    e.stopPropagation();
    try {
      const res = await unLikeNfts(data?.guid);
      setIsLiked(false);
      openNotification('Nft unliked successfully');
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  };
  const handleCreatedBy = (e) => {
    e.stopPropagation();
    history.push(`/creatorDetails/${data?.created_by}`);
  };

  return (
    <div className='featuredCard'>
      <Card>
        <div className='cardContent' onClick={handleClick}>
          <div className='coverImageWrapper'>
            <div className='coverImage'>
              <img
                alt='example'
                src={
                  isNft && data
                    ? data?.nft_data?.image_location
                    : data
                    ? data?.image_large_location
                    : TEST_IMG
                }
              />
            </div>
            {!isNft && (
              <div className='tagImage'>
                <img
                  style={{
                    background: `url(${data && data?.image_small_location}) no-repeat`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  alt=''
                />
              </div>
            )}
          </div>
          <div className='content'>
            <div className='description'>
              <span className='head'>{data ? data?.store_name : 'test store_name'}</span>
              <span className='desc'>
                {data ? truncate(data?.description_short) : 'test description'}
              </span>
              {isNft && (
                <span className='StatsSection'>
                  <span className='avgSection'>
                    <img src={ORANGE_DOT} alt={'ORANGE_DOT'} />
                    <span className='avg'> Avg: 3872.44</span>
                  </span>
                  <span className='floorSection'>
                    <img src={ORANGE_DOT} alt={'ORANGE_DOT'} />
                    <span className='floor'>Floor: 3872.44</span>
                  </span>
                </span>
              )}

              {/* <div className='createdBy'>
                <span>Created By: </span>
                <span className='textStyle' onClick={(e) => handleCreatedBy(e)}>
                  {data?.created_by}
                </span>
              </div> */}
            </div>
            <div className='frameIconSection'>
              <Tooltip title={isLiked ? 'Unlike' : 'Like'} color={'#303549'}>
                {showFollowIcon && (
                  <span
                    className='orangeFrame'
                    onClick={isLiked ? (e) => unLikeNft(e) : (e) => likeNft(e)}
                  >
                    <img src={isLiked ? LIKED_ICON : LIKE_ICON} alt={'ORANGE_FRAME'} />
                  </span>
                )}
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedCard;
