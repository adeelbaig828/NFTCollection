import React from 'react';
import { Card, Dropdown, Menu } from 'antd';
import EYE_ICON from '../../../images/eye_icon.svg';
import LINK_ICON from '../../../images/link_icon.svg';
import ORANGE_FRAME from '../../../images/orange_frame.svg';
import { Tooltip } from 'antd';
import './MyCollectionCard.scss';
import { useHistory } from 'react-router-dom';
import { truncate, truncateTitle } from '../../../helpers/utils';
import { confirm } from '../../Smart/Modal';
import { EditOutlined, MoreOutlined } from '@ant-design/icons';

const { Meta } = Card;

const MyCollectionCard = ({ data }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/collectionView/${data?.guid}`);
  };

  const handleCreatedBy = (e) => {
    e.stopPropagation();
    history.push(`/profile`);
  };

  const handleOk = () => {
    data?.url_personal?.includes('https') && window.open(data?.url_personal);
  };

  const handleUrlPersonal = (e) => {
    e.stopPropagation();
    confirm('Are you sure', 'By click ok you will leave this site', '', '', handleOk);
  };

  const handleMore = (e) => {
    e.stopPropagation();
    history.push(`/edit-collection/${data?.guid}`);
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div className='edit' onClick={(e) => handleMore(e)}>
              <EditOutlined style={{ fontSize: '18px' }} />
              <span>Edit</span>
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <div className='myCollectionCard' onClick={handleClick}>
      <Card
        hoverable
        cover={
          <span className='ExploreCardWrapper'>
            <span className='ExploreCardImage'>
              <img alt='example' src={data?.image_large_location} />
            </span>
            {!data?.contract_address && (
              <Dropdown overlay={menu} placement='bottomRight' arrow={true} trigger={'click'}>
                <span className='frame' onClick={(e) => e.stopPropagation()}>
                  <MoreOutlined style={{ fontSize: '23px' }} />
                </span>
              </Dropdown>
            )}

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

export default MyCollectionCard;
