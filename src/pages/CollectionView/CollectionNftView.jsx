import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import useWindowSize from '../../helpers/hooks';
import { openNotification } from '../../components/Smart/Notification';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getCollectionNft } from '../../services/collectionServices';
import Spin from '../../components/presentational/Spin';
import CollectionNftCard from '../../components/presentational/CollectionNftCard/CollectionNftCard';
import LoadingCard from '../../components/presentational/LoadingCard/LoadingCard';
import { useSelector } from 'react-redux';
import TimeLine from '../../components/Timeline/TimeLine';
import EditNftModal from '../../components/Smart/EditNftModal/EditNftModal';
import './CollectionNftView.scss';

const CollectionNftView = ({
  collectionid,
  currentNftId,
  searchParam,
  sliceItem,
  setCount,
  userId,
  count,
  setShowSearchBarAndRarirtyTable,
  isCollectionDeployed,
  selectedFilter,
  collectionDetails,
  collectionAddress,
  traitType,
  extraData,
  setExtraData,
}) => {
  const arr = [1, 2];

  const [exploreData, setExploreData] = useState([]);

  const user = useSelector((state) => state?.auth?.user);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLineData, setTimeLineData] = useState('');
  const [browserWidth] = useWindowSize();
  const [status, setStatus] = useState(0);
  const [selectedNft, setSelectedNft] = useState({});
  const fetchExploreData = async () => {
    try {
      const res = await getCollectionNft(
        collectionid,
        extraData?.next_page,
        searchParam,
        selectedFilter,
        traitType
      );
      setTimeLineData(res);
      setStatus(res?.body?.status);
      if (res?.body?.data?.length > 0) {
        if (extraData.next_page === 1) {
          setExploreData(res?.body?.data);
          setCount(res?.body?.data?.length);
        } else {
          setExploreData([...exploreData, ...res?.body?.data]);
          setCount(count + res?.body?.data?.length);
        }
        setExtraData({
          next_page: res?.body?.next_page,
          has_more: res?.body?.has_more,
        });
      }
      if (res?.body?.data?.length === 0) {
        setExploreData([]);
        setExtraData({
          next_page: 2,
          has_more: false,
        });
      }
      if (res?.body?.status === 5) {
        setShowSearchBarAndRarirtyTable(true);
      }
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  };

  const Reset = () => {
    setLoading(true);
    setExploreData((prev) => []);
    setExtraData({
      next_page: 1,
      has_more: true,
    });
    setCount(0);
  };

  useEffect(async () => {
    Reset();
    await fetchExploreData();
    setLoading(false);
  }, [searchParam, selectedFilter, traitType]);

  const imageLinks = exploreData.map((obj) => obj?.nft_data?.image_location);
  const imageLinksJSON = JSON.stringify(imageLinks);
  const imageLinksObject = JSON.parse(imageLinksJSON);

  const filterNft = (data) => {
    if (data?.guid === currentNftId) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (status !== 5) {
      const interval = setInterval(() => {
        fetchExploreData();
      }, 60000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [status]);

  console.log('exploreData', exploreData);
  return (
    <>
      <EditNftModal visible={visible} data={selectedNft} setVisible={setVisible} />
      <div className='collectionNftViewWrapper '>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : status == 5 && exploreData?.length > 0 ? (
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
                {exploreData
                  ?.filter?.(filterNft)
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
                        <CollectionNftCard
                          data={item}
                          showLikeIcon={true}
                          isCollectionDeployed={isCollectionDeployed}
                          isUserCollection={user?.guid === userId}
                          setVisible={setVisible}
                          setSelectedNft={setSelectedNft}
                          collectionDetails={collectionDetails}
                          collectionAddress={collectionAddress}
                        />
                      </Col>
                    );
                  })}
              </Row>
            </InfiniteScroll>
          </div>
        ) : (
          <>
            <div className='progress'>
              {user?.guid === userId ? (
                <TimeLine status={status} data={timeLineData} collectionid={collectionid} />
              ) : (
                'No Nfts found for this Collection'
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CollectionNftView;
