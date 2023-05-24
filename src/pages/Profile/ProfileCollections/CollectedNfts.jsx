import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import NewsLetter from "../../../components/presentational/NewsLetter/NewsLetter";
import FeaturedCard from "../../../components/presentational/FeaturedCard/FeaturedCard";
import useWindowSize from "../../../helpers/hooks";
import { myCollectedNfts } from "../../../services/userServices";
import InfiniteScroll from "react-infinite-scroll-component";
import { openNotification } from "../../../components/Smart/Notification";
import FeaturedLoadingCard from "../../../components/presentational/FeaturedLoadingCard/FeaturedLoadingCard";
import "./CollectedNfts.scss";

const CollectedNfts = () => { 
  const arr = [0, 1];
  const [browserWidth] = useWindowSize();
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });
  const [collections, setCollections] = useState([]);
  const fetchCollections = async () => {
    try {
      const res = await myCollectedNfts(extraData?.next_page);

      setCollections([...collections, ...res?.data?.body?.data]);
      setExtraData({
        next_page: res?.data?.body?.next_page,
        has_more: res?.data?.body?.has_more,
      });
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
      //   setExploreData([]);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <>
      <div className="CollectedNftsCardGrid">
        <InfiniteScroll
          dataLength={collections.length} //This is important field to render the next data
          next={fetchCollections}
          hasMore={extraData?.has_more}
          loader={
            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              {arr?.map((item, index) => {
                return (
                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={8}
                    xxl={4}     
                    key={index}
                  >
                    <FeaturedLoadingCard isNft={true} />
                  </Col>
                );
              })}
            </Row>
          }
          endMessage={
            <p className="all_seen_txt" style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
            {collections?.map((item, index) => {
              return (
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={8}
                  xxl={4}     
                  key={index}
                >
                  <FeaturedCard data={item} isNft={true} />
                </Col>
              );
            })}
          </Row>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default CollectedNfts;
