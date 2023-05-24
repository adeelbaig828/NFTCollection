import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import NewsLetter from '../../../components/presentational/NewsLetter/NewsLetter';
import FeaturedCard from '../../../components/presentational/FeaturedCard/FeaturedCard';
import useWindowSize from '../../../helpers/hooks';
import ProfileCollectionsFlicker from '../ProfileCollectionsFlicker';
import { myCollectionsAPI } from '../../../services/userServices';
import InfiniteScroll from 'react-infinite-scroll-component';
import { openNotification } from '../../../components/Smart/Notification';
import FeaturedLoadingCard from '../../../components/presentational/FeaturedLoadingCard/FeaturedLoadingCard';
import './MyCollections.scss';
import ExploreCard from '../../../components/presentational/ExploreCard/ExploreCard';
import LoadingCard from '../../../components/presentational/LoadingCard/LoadingCard';
import Spin from '../../../components/presentational/Spin';
import MyCollectionCard from '../../../components/presentational/MyCollectionsCard/MyCollectionCard';

const MyCollections = () => {
  const arr = [0, 1, 2];
  const [browserWidth] = useWindowSize();
  const [loading, setLoading] = useState(false);
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const res = await myCollectionsAPI(extraData?.next_page);
      if (res?.body?.data?.length > 0) {
        setCollections([...collections, ...res?.body?.data]);
        setExtraData({
          next_page: res?.body?.next_page,
          has_more: res?.body?.has_more,
        });
      }
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
      // setExploreData([]);
    }
  };

  useEffect(async () => {
    setLoading(true);
    await fetchCollections();
    setLoading(false);
  }, []);
  return (
    <>
      <div className='MyCollectionCardsGrid main_page_width'>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : collections?.length > 0 ? (
          <InfiniteScroll
            dataLength={collections?.length} //This is important field to render the next data
            next={fetchCollections}
            hasMore={extraData?.has_more}
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
                      <LoadingCard />
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
              {collections?.map((item, index) => {
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
                    <MyCollectionCard data={item} />
                  </Col>
                );
              })}
            </Row>
          </InfiniteScroll>
        ) : (
          <div>You are not following any collections</div>
        )}
      </div>
    </>
  );
};

export default MyCollections;
