import React, { useEffect, useState } from 'react';
import { Card, Dropdown, Menu } from 'antd';
import EYE_ICON from '../../../images/eye_icon.svg';
import ORANGE_FRAME from '../../../images/orange_frame.svg';
import LIKE_ICON from '../../../images/like_icon.svg';
import LIKED_ICON from '../../../images/liked_icon.svg';

import { Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import { openNotification } from '../../Smart/Notification';
import { truncate } from '../../../helpers/utils';
import { likeNfts, unLikeNfts } from '../../../services/collectionServices';
import './CollectionNftCard.scss';
import { useSelector } from 'react-redux';
import { EditOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteNftModal from '../../Smart/DeleteNftModal/DeleteNftModal';

const { Meta } = Card;

const CollectionNftCard = ({
  data,
  showLikeIcon,
  isCollectionDeployed,
  isUserCollection,
  setVisible,
  setSelectedNft,
  collectionDetails,
  collectionAddress,
}) => {
  const history = useHistory();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(data?.is_liked);
  const user = useSelector((state) => state.auth.user);
  const handleClick = () => {
    history.push(`/nftDetail/${data?.guid}`, {
      data: collectionDetails,
      address: collectionAddress,
    });
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

  const handleProfileClick = (e) => {
    e.stopPropagation();

    if (user?.guid === data?.user_guid) {
      history.push(`/profile`);
    } else {
      history.push(`/creatorDetails/${data?.user_guid}`);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setVisible(true);
    setSelectedNft(data);
    setDropdownVisible(false);
  };
  const handleDeleteNft = (e) => {
    e.stopPropagation();
    // setVisible(true);
    // setSelectedNft(data);
    setDropdownVisible(false);
  };
  console.log('dataaaa', data);
  const handleMore = (e) => {
    e.stopPropagation();
    // history.push(`/edit-collection/${data?.guid}`);
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <>
              <div className='edit' style={{ marginBottom: '5%' }} onClick={(e) => handleEdit(e)}>
                <EditOutlined style={{ fontSize: '18px' }} />
                <span>Edit</span>
              </div>
            </>
          ),
        },
        {
          key: '2',
          label: (
            <>
              <div onClick={(e) => handleDeleteNft(e)}>
                <DeleteNftModal data={data} />
              </div>
            </>
          ),
        },
      ]}
    />
  );
  const menuDelete = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <>
              <div onClick={(e) => handleDeleteNft(e)}>
                <DeleteNftModal />
              </div>
            </>
          ),
        },
      ]}
    />
  );

  return (
    <div className='CollectionNftCard' onClick={handleClick}>
      <Card
        hoverable
        cover={
          <span className='ExploreCardWrapper'>
            <span className='ExploreCardImage'>
              <img
                alt='example'
                src={
                  data?.nft_data?.thumbnail
                    ? data?.nft_data?.thumbnail
                    : data?.nft_data?.image_location
                }
              />
            </span>
            {/* <div style={{ position: 'absolute', background: 'red' }}> */}
            <Dropdown
              overlay={!data?.contract_address ? menu : menuDelete}
              placement='bottomRight'
              arrow={true}
              trigger={'click'}
              visible={dropdownVisible}
              onVisibleChange={setDropdownVisible}
            >
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '38px',
                  height: '38px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #f37342',
                  borderRadius: '5px',
                  marginBottom: '20px',
                  position: 'absolute',
                  top: '10px',
                  right: '14px',
                  zIndex: '1',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <MoreOutlined style={{ fontSize: '23px', color: '#f37342' }} />
              </span>
            </Dropdown>
            {/* </div> */}
          </span>
        }
      >
        <Meta
          title={data?.store_name}
          description={
            <div className='nftDesc'>
              <span>{truncate(data?.description_short)}</span>
              {/* {!isCollectionDeployed && isUserCollection && (
                <Tooltip title={'Edit Nft Details'} color={'#303549'}>
                  <span className='editIcon' onClick={(e) => handleEdit(e)}>
                    <EditOutlined style={{ color: '#f37342' }} />
                  </span>
                </Tooltip>
              )} */}
            </div>
          }
        />
        <div className='exploreCardFooter'>
          <span className='priceHeading'>
            Coin Type: <span className='priceHeading grayColor'>{data?.minting_coin}</span>
          </span>
          <span className='rightSection'>
            {showLikeIcon && (
              <span className='tagImage'>
                <Tooltip title={isLiked ? 'Unlike' : 'Like'} color={'#303549'}>
                  <span
                    className={data?.is_followed ? 'orangeFrame' : 'frame'}
                    onClick={isLiked ? (e) => unLikeNft(e) : (e) => likeNft(e)}
                  >
                    <img src={isLiked ? LIKED_ICON : LIKE_ICON} alt={'ORANGE_FRAME'} />
                  </span>
                </Tooltip>
                <span className='tagPrice'>{data?.likes}</span>
              </span>
            )}
          </span>
        </div>
        <div style={{ width: '100%', marginTop: '2%' }}>
          <div style={{ color: '#918a8a' }}>
            Price :{' '}
            <span style={{ color: '#000000', fontWeight: 'bold' }}>
              {data?.current_sale_price <= 0 ? 'not defined' : data?.current_sale_price}
            </span>
          </div>
          {data?.last_sale_price > 0 && (
            <div style={{ color: '#918a8a' }}>
              Last Sale :{' '}
              <span style={{ color: '#000000', fontWeight: 'bold' }}>{data?.last_sale_price}</span>
            </div>
          )}
        </div>
        <div className='dflex'>
          <div className={data?.token_id ? 'idSection' : 'notMinted'}>
            {data?.token_id > 0 ? `${'#' + data?.token_id}` : ''}
          </div>
          <span className='createdBy'>
            <span>Created By: </span>
            <span className='textStyle' onClick={(e) => handleProfileClick(e)}>
              {data?.user_name}
            </span>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default CollectionNftCard;
