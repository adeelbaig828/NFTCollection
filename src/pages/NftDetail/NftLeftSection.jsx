import React from 'react';
import NftDetailCard from '../../components/presentational/NftDetailCard/NftDetailCard';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './NftLeftSection.scss';
import Verified from '../../images/verified.png';

const NftLeftSection = ({ nftData, collectionData }) => {
  return (
    <div className='NftleftSideSection'>
      <span className='searchedCard'>
        <NftDetailCard nftData={nftData} />
      </span>
      <span
        style={{
          color: 'rgb(32, 129, 226)',
          fontSize: '18px',
          fontWeight: '700',
          marginTop: '2%',
          width: '100%',
        }}
      >
        {collectionData?.store_name}
        {collectionData?.user_details?.active === 1 && (
          <img style={{ width: '20px', marginLeft: '2%' }} src={Verified} alt='Verified' />
        )}
      </span>
      <span className={nftData?.token_id ? 'idSection' : 'notMinted'}>
        {nftData?.token_id ? `${'#' + nftData?.token_id}` : 'Not Minted'}
      </span>
      <div style={{ fontSize: '14px', fontWeight: '700' }}>
        Owned By{' '}
        <span style={{ color: 'rgb(32, 129, 226)' }}>{collectionData?.user_details?.username}</span>{' '}
      </div>
      <div
        style={{
          width: '100%',
          gap: '2%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '5%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '2%',
            width: '30%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RemoveRedEyeOutlinedIcon />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
            }}
          >
            {nftData.views > 1 ? nftData.views + ' views' : nftData.views + ' view'}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '2%',
            width: '30%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ThumbUpOutlinedIcon />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
            }}
          >
            {nftData.likes > 1 ? nftData.likes + ' likes' : nftData.likes + ' like'}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '2%',
            width: '30%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FavoriteBorderIcon />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              whiteSpace: 'nowrap',
            }}
          >
            {nftData.favorite_count > 1
              ? nftData.favorite_count + ' favourites'
              : nftData.favorite_count + ' favourite'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftLeftSection;
