import React, { useEffect, useState } from 'react';
import RIGHT_ARROW from '../../images/right_arrow.svg';
import { Row, Col, Carousel } from 'antd';
import NftCard from '../../components/presentational/Card/Card';
import './TopHits.scss';
import { getTopHitsAPI } from '../../services/homePageServices';
import { Link } from 'react-router-dom';
import useWindowSize from '../../helpers/hooks';
import { openNotification } from '../../components/Smart/Notification';
import LoadingCard from '../../components/presentational/LoadingCard/LoadingCard';
import { mynftGet } from '../../pinata';
const TopHits = () => {
  const [topHits, setTopHits] = useState([]);
  const [mintedNfts, setMintedNfts] = useState([]);
  console.log('mintedNfts', mintedNfts);
  console.log('topHits', topHits);
  const arr = [0, 1, 2, 3];
  const [browserWidth] = useWindowSize();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const topHits = async () => {
      try {
        setLoading(true);
        const res = await getTopHitsAPI();
        setTopHits(res?.data?.body);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openNotification('Oops Error in getting Top Hits', error?.response?.data?.message);
      }
    };
    topHits();
    mynftGet(setMintedNfts);
  }, []);

  const filterTopHits = (topHits) => {
    if (topHits?.image_large_location?.includes('https')) {
      const check = topHits?.image_large_location?.lastIndexOf('.');
      const extension = topHits?.image_large_location.slice(check);
      if (extension !== '.svg') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  return (
    <div className='TopHits main_page_width'>
      <div className='heading'>
        <span className='topHits'>Top Hits</span>
        <span>
          <span className='discover'>Discover</span>
          <Link to={'/explore'}>
            <img src={RIGHT_ARROW} alt={'RIGHT_ARROW'} />
          </Link>
        </span>
      </div>
      <div className='cardGrid'>
        <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
          {loading
            ? arr?.map((item, index) => {
                return (
                  <Col className='gutter-row' span={6} key={index}>
                    <LoadingCard />
                  </Col>
                );
              })
            : topHits
                ?.filter(filterTopHits)
                ?.slice(0, 8)
                ?.map((item, index) => {
                  return (
                    <Col className='gutter-row' span={6} key={index}>
                      <NftCard data={item} showFollowIcon={false} />
                    </Col>
                  );
                })}
        </Row>
      </div>
      {browserWidth < 821 && (
        <Carousel dotPosition={'bottom'}>
          {loading ? (
            <LoadingCard />
          ) : (
            topHits
              ?.filter(filterTopHits)
              ?.slice(0, 8)
              ?.map((item, index) => {
                return (
                  <div key={index}>
                    <NftCard data={item} showFollowIcon={false} />
                  </div>
                );
              })
          )}
        </Carousel>
      )}
    </div>
  );
};

export default TopHits;
