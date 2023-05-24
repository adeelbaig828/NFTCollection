import React, { useEffect, useState } from 'react';
import ExploreCard from '../../components/presentational/ExploreCard/ExploreCard';
import PAGE_HEADER from '../../images/PageHeader.png';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import { Row, Col } from 'antd';
import NewsLetter from '../../components/presentational/NewsLetter/NewsLetter';
import { allCollectionsAPI } from '../../services/explorePageServices';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingCard from '../../components/presentational/LoadingCard/LoadingCard';
import useWindowSize from '../../helpers/hooks';
import { openNotification } from '../../components/Smart/Notification';
import CategoryFlicker from '../FilterCollections/CategoryFlicker';
import { getCollectionByCategory } from '../../services/collectionServices';
import Spin from '../../components/presentational/Spin';
import './ExplorePage.scss';
import { AdvanceSearchApi } from '../../services/searchServices';
import { useSelector } from 'react-redux';

const ExplorePage = () => {
  const web3 = useSelector((state) => state.web3);
  const arr = [1, 2, 3];
  const [exploreData, setExploreData] = useState([]);
  const [category, setCategory] = useState(null);
  const query = new URLSearchParams(window?.location?.search);
  const [loading, setLoading] = useState(false);
  const [stickyOffset, setStickyOffset] = useState(0);

  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });
  const [browserWidth] = useWindowSize();
  console.log('exploreData', exploreData);
  const fetchExploreData = async () => {
    try {
      if (query?.get('SearchCollection')) {
        const res = await AdvanceSearchApi(
          query?.get('SearchCollection'),
          query?.get('SelectedCategory'),
          extraData?.next_page
        );
        console.log('res', res);
        if (res?.body?.data?.length) {
          setExploreData([...exploreData, ...res?.body?.data]);
          setExtraData({
            next_page: res?.body?.next_page,
            has_more: res?.body?.has_more,
          });
        }
      } else if (query?.get('SelectedCategory')) {
        const res = await getCollectionByCategory(
          query?.get('SelectedCategory'),
          extraData?.next_page
        );

        if (res?.body?.data?.length) {
          setExploreData([...exploreData, ...res?.body?.data]);
          setExtraData({
            next_page: res?.body?.next_page,
            has_more: res?.body?.has_more,
          });
        }
      } else {
        const res = await allCollectionsAPI(extraData?.next_page);
        if (res?.body?.data?.length) {
          setExploreData([...exploreData, ...res?.body?.data]);
          setExtraData({
            next_page: res?.body?.next_page,
            has_more: res?.body?.has_more,
          });
        }
      }
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  };
  useEffect(async () => {
    console.log('called');
    setLoading(true);
    await fetchExploreData();
    setLoading(false);
  }, [query?.get('SearchCollection')]);

  const isSticky = () => {
    var header = document.getElementById('searchHeader');
    var sticky = header?.offsetTop;
    if (sticky !== 0) {
      setStickyOffset(sticky);
    }
    if (window.pageYOffset > sticky && window.pageYOffset > stickyOffset) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };
  window.onscroll = function () {
    isSticky();
  };
  console.log('test', query?.get('SearchCollection'));
  console.log('exploreData', exploreData);
  return (
    <>
      <div className='ExplorePageWrapper'>
        <div className='ExplorePageHeader'>
          <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={'PAGE_HEADER'} />
          <div className='exploreHeadingSection'>
            <span className='exploreText'>FIND, EXPLORE & FOLLOW DIGITAL ART NFTS.</span>
            <span className='exploreHeading'>Explore Collections</span>
          </div>
        </div>
        <div id='searchHeader'>
          <CategoryFlicker category={category} setCategory={setCategory} reloadOnChange={true} />
        </div>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : exploreData.length > 0 ? (
          <>
            <div className='ExplorecardGrid main_page_width'>
              <InfiniteScroll
                dataLength={exploreData?.length} //This is important field to render the next data
                next={fetchExploreData}
                hasMore={extraData?.has_more}
                loader={
                  <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    {browserWidth < 620 ? (
                      <LoadingCard />
                    ) : (
                      arr?.map((item, index) => {
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
                      })
                    )}
                  </Row>
                }
                endMessage={
                  <p className='all_seen_txt' style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                  {exploreData?.map((item, index) => {
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
                        <ExploreCard
                          data={item}
                          exploreData={exploreData}
                          setExploreData={setExploreData}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </InfiniteScroll>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>No Such Collection Found</div>
        )}
        <NewsLetter />
      </div>
    </>
  );
};

export default ExplorePage;
