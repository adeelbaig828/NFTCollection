import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import useWindowSize from "../../../helpers/hooks";
import { myFollowingCollectionsAPI } from "../../../services/userServices";
import InfiniteScroll from "react-infinite-scroll-component";
import { openNotification } from "../../../components/Smart/Notification";
import LoadingCard from "../../../components/presentational/LoadingCard/LoadingCard";
import ExploreCard from "../../../components/presentational/ExploreCard/ExploreCard";
import "./Followed.scss";
import FollowedExploreCard from "../../../components/presentational/FollowedExploreCard/FollowedExploreCard";


const Followed = ({setRefetchQuery}) => {
  const arr = [0, 1, 2];
  const [browserWidth] = useWindowSize();
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const res = await myFollowingCollectionsAPI(extraData?.next_page);
      setCollections([...collections, ...res?.body?.collections]);
      setExtraData({
        next_page: res?.body?.next_page,
        has_more: res?.body?.has_more,
      });
    } catch (error) {
      // openNotification("Oops", error?.response?.data?.message);
      //   setExploreData([]);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <>
      <div className="FollowedCardsGrid main_page_width">
       {collections?.length ?
       <>
        <InfiniteScroll
          dataLength={collections?.length} //This is important field to render the next data
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
                    <LoadingCard />
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
            {collections?.length &&  collections?.map((item, index) => {
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
                  <FollowedExploreCard data={item} collections={collections} setCollections={setCollections} setRefetchQuery={setRefetchQuery} />
                </Col>
              );
            })}
          </Row>
        </InfiniteScroll>
       </>
       :
       (
         <div>Follow Some Collections to see them here</div>
       )

       }
      </div>
    </>
  );
};

export default Followed;
