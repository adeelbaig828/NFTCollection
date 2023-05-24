import React, { useRef, useState } from 'react';
import DISCORD_ICON from '../../images/discord_icon.svg';
import M_ICON from '../../images/M_icon.svg';
import TWITTER_ICON from '../../images/twitter_icon.svg';
import WHITE_FRAME_ICON from '../../images/white_frame_icon.svg';
import SHARE_ICON from '../../images/share.svg';
import PRICE_ICON from '../../images/price_icon.svg';
import LIKE_ICON from '../../images/like_icon.svg';
import LIKED_ICON from '../../images/liked_icon.svg';

import { Tooltip } from 'antd';
import './NftRightSection.scss';
import { likeNfts, unLikeNfts } from '../../services/collectionServices';
import { openNotification } from '../../components/Smart/Notification';
import { mintNft, publishIpfs } from '../../services/web3Services';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Buy } from '../../pinata';
import BasicModal from './BasicModal';

const NftRightSection = ({ nftData, collectionAddressData }) => {
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(nftData?.is_liked);
  const user = useSelector((state) => state.auth.user);
  const wallet_id = useSelector((state) => state?.web3?.wallet);

  const likeNft = async () => {
    try {
      const res = await likeNfts(nftData?.guid);
      setIsLiked(true);
      if (res?.body?.like == '1' || res?.body?.like == true) {
        openNotification('Nft liked successfully');
      }
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  };
  const unLikeNft = async () => {
    try {
      const res = await unLikeNfts(nftData?.guid);
      setIsLiked(false);
      openNotification('Nft unliked successfully');
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  };

  const textAreaRef = useRef(null);

  async function copyToClip() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      openNotification('Link Copied Successfully');
    } catch (error) {
      console.log('error', error);
    }
  }
  const alreadyMinted = () => {
    openNotification('Minted NFT already exists.');
  };
  const mintNftPlease = async () => {
    if (!wallet_id) {
      openNotification('please connect to wallet');
      return;
    }
    history.push('/create-nft-form', { data: nftData, address: collectionAddressData });
    await mintNft(nftData?.guid, wallet_id);
  };
  const handleBuy = () => {
    Buy(nftData?.token_id);
  };
  const publishToIpfs = async () => {
    if (!wallet_id) {
      openNotification('please connect to wallet');
      return;
    }
    history.push('/create-nft-form', { data: nftData });
    // await publishIpfs(nftData?.guid, wallet_id);
  };

  return (
    <div className='NftrightSectionWrapper'>
      <div className='RightHeader'>
        <div className='leftSideWithImage'>
          <div className='priceDetails'>
            <span className='test'>Current Price</span>
            <span className='icon'>
              {nftData?.current_sale_price} <img src={PRICE_ICON} alt={'PRICE_ICON'} />
            </span>
          </div>
          <div className='socialIcons'>
            {/* <span className="socialIconImage">
              <img src={DISCORD_ICON} alt={"DISCORD_ICON"} />
            </span>
            <span className="socialIconImage">
              <img src={M_ICON} alt={"M_ICON"} />
            </span>
            <span className="socialIconImage">
              <img src={TWITTER_ICON} alt={"TWITTER_ICON"} />
            </span> */}
            <span className='socialIconImage changebg' onClick={copyToClip}>
              <img src={SHARE_ICON} alt={'SHARE_ICON'} />
            </span>
            <Tooltip
              title={isLiked ? 'UnLike' : 'Like'}
              color={'#303549'}
              overlayClassName='favouriteToolTip'
            >
              <span
                className='socialIconImage changebgColor '
                onClick={isLiked ? unLikeNft : likeNft}
              >
                <img src={isLiked ? LIKED_ICON : LIKE_ICON} alt={'LIKE_ICON'} />
              </span>
            </Tooltip>
          </div>
        </div>
        <div className='itemDetails'>
          <span className='detail'>{nftData?.description_short}</span>
        </div>
        <div className='offerBtn'>
          {/* <Button className='mintNft' onClick={publishToIpfs}>
            Publish IPFS
          </Button> */}
          {user?.guid !== nftData?.user_guid ? (
            <>
              <span className='buyNow' onClick={handleBuy}>
                Buy Now
              </span>
              <BasicModal nftData={nftData} />
            </>
          ) : (
            <Button
              className='mintNft'
              onClick={nftData?.contract_address ? alreadyMinted : mintNftPlease}
            >
              {nftData?.contract_address ? 'Minted' : 'Mint'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NftRightSection;
