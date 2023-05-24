import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import useWindowSize from '../../helpers/hooks';
import { openNotification } from '../../components/Smart/Notification';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getCollectionNft } from '../../services/collectionServices';
import FeaturedCard from '../../components/presentational/FeaturedCard/FeaturedCard';
import FeaturedLoadingCard from '../../components/presentational/FeaturedLoadingCard/FeaturedLoadingCard';
import Spin from '../../components/presentational/Spin';
import './NftDetailSection.scss';

const NftDetailSection = ({
  collectionid,
  currentNftId,
  searchParam,
  sliceItem,
  setCount,
  count,
}) => {
  console.log('currentNftId', currentNftId);
  const arr = [1, 2];

  const [exploreData, setExploreData] = useState([]);
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [browserWidth] = useWindowSize();
  const fetchExploreData = async () => {
    try {
      const res = await getCollectionNft(collectionid, extraData?.next_page);
      if (res?.body?.data?.length) {
        setExploreData([...exploreData, ...res?.body?.data]);
        setExtraData({
          next_page: res?.body?.next_page,
          has_more: res?.body?.has_more,
        });
        setCount(count + res?.body?.data?.length);
      }
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  };
  useEffect(async () => {
    setLoading(true);
    await fetchExploreData();
    setLoading(false);
  }, []);

  const filterNft = (data) => {
    if (data?.guid === currentNftId) {
      return false;
    } else {
      return true;
    }
  };

  const searchNft = (data) => {
    if (!sliceItem) {
      if (
        data?.description_short?.toLowerCase()?.includes(searchParam?.toLowerCase()) ||
        data?.description_long?.toLowerCase()?.includes(searchParam?.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <div className='nftDetailSection main_page_width'>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : exploreData.length > 0 ? (
          <div className='collectionNftViewCardGrid'>
            <InfiniteScroll
              dataLength={exploreData.length} //This is important field to render the next data
              next={fetchExploreData}
              hasMore={extraData?.has_more && (sliceItem ? exploreData.length < 21 : true)}
              loader={
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                  {arr?.map((item, index) => {
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
                        <FeaturedLoadingCard />
                      </Col>
                    );
                  })}
                </Row>
              }
              endMessage={
                <p className='all_seen_txt' style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                {exploreData
                  ?.filter?.(filterNft)
                  ?.filter?.(searchNft)
                  ?.slice(sliceItem && 0, sliceItem && 20)
                  ?.map((item, index) => {
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
                        <FeaturedCard isNft={true} data={item} />
                      </Col>
                    );
                  })}
              </Row>
            </InfiniteScroll>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>No Nfts found for this collection</div>
        )}
      </div>
    </>
  );
};

export default NftDetailSection;
