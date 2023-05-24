import React, { useEffect, useState } from 'react';
import PAGE_HEADER_IMG from '../../images/PageHeader.png';
import RIGHT_ARROW from '../../images/right_arrow.svg';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import NewsLetter from '../../components/presentational/NewsLetter/NewsLetter';
import NftLeftSection from './NftLeftSection';
import NftRightSection from './NftRightSection';
import DetailSection from './DetailSection';
import { Link } from 'react-router-dom';
import useWindowSize from '../../helpers/hooks';
import './NftDetail.scss';
import { nftDetailsApi } from '../../services/nftServices';
import Spin from '../../components/presentational/Spin';
import { openNotification } from '../../components/Smart/Notification';
import NftDetailSection from './NftDetailSection';
import { useLocation } from 'react-router-dom';
import { mynftGet } from '../../pinata';
import BigNumber from 'bignumber.js';
import { editNfAPI } from '../../services/nftServices';
import { useSelector } from 'react-redux';

const NftDetails = ({ match }) => {
  const location = useLocation();
  const collectionData = location.state?.data;
  const user = useSelector((state) => state?.auth?.user);
  console.log('useruser', user);
  const [mintedNfts, setMintedNfts] = useState([]);
  const token_id_hex = mintedNfts?.tokenId?._hex;
  const tokenId = new BigNumber(token_id_hex);
  const integerTokenId = tokenId?.toNumber();
  const price_hex = mintedNfts?.price?._hex;
  const price_BigNumber = new BigNumber(price_hex);
  const integerPrice = price_BigNumber?.toNumber();
  const contract_address = mintedNfts[1];
  const [isMint, setIsMint] = useState(false);
  console.log('mintedNft contract_address', contract_address);
  console.log('mintedNft integerPrice', integerPrice);
  console.log('mintedNft integerTokenId', integerTokenId);
  console.log('mintedNft ', mintedNfts);
  const collectionAddressData = location.state?.address;
  const arr = [1, 2, 3, 4, 5, 6];
  const [browserWidth] = useWindowSize();
  const [nftData, setNftData] = useState([]);
  console.log('mintedNft nftData', nftData);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  // const updateData = {
  //   description_short: nftData?.description_short,
  //   description_long: nftData?.description_long,
  //   contract_address: contract_address,
  //   token_id: integerTokenId,
  //   current_sale_price: 1,
  // };
  // console.log('updateData 1', updateData);
  // console.log('updateData 1', nftData?.guid);
  useEffect(() => {
    const getNftDetail = async () => {
      try {
        setLoading(true);
        const res = await nftDetailsApi(match?.params?.id);
        setNftData(res?.body);
        setLoading(false);
      } catch (error) {
        openNotification('Oops', error?.response?.data?.message);
        setLoading(false);
      }
    };
    getNftDetail();
    setIsMint(true);
    // mynftGet(setMintedNfts);
  }, [match?.params?.id]);

  // useEffect(() => {
  //   editNfAPI(updateData, nftData?.guid);
  // }, [nftData?.guid, updateData]);

  // useEffect(() => {
  //   if (isMint) {
  //     console.log("USeEffect runs ==>")
  //     editNfAPI(updateData, nftData?.guid);
  //   }
  // }, [isMint]);

  // const onMinted = () => {
  //   console.log('editNfAPI onMinted', updateData);
  //   console.log('editNfAPI nftData?.guid', nftData?.guid);
  //   const res = editNfAPI(updateData, nftData?.guid);
  //   console.log('nftData res', res);
  // };
  return (
    <>
      <div className='NftDetailPageWrapper'>
        <div className='CollectionPageHeader'>
          <img
            src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER_IMG}
            alt={'PAGE_HEADER_IMG'}
          />
        </div>
        <>
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          ) : (
            <>
              <div className='selectedCollection main_page_width'>
                <div className='CollectionDetailsSubHeader'>
                  <NftLeftSection nftData={nftData} collectionData={collectionData} />
                  <NftRightSection
                    nftData={nftData}
                    collectionAddressData={collectionAddressData}
                  />
                </div>
                <DetailSection nftData={nftData} />
              </div>
              <div className='resultCardsGrid'>
                <div className='heading main_page_width'>
                  <span className='seeMore'>More from this collection</span>
                  <span>
                    <Link to={`/collectionView/${nftData.store_front_guid}`}>
                      <span className='view'>View all</span>{' '}
                      <img src={RIGHT_ARROW} alt='RIGHT_ARROW' />
                    </Link>
                  </span>
                </div>

                <NftDetailSection
                  collectionid={nftData?.store_front_guid}
                  currentNftId={nftData?.guid}
                  setCount={setCount}
                  sliceItem={true}
                />
              </div>
            </>
          )}
        </>
        <NewsLetter />
      </div>
    </>
  );
};

export default NftDetails;
