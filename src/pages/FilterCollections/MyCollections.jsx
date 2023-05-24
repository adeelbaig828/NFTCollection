import { Col, Row } from "antd";
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import ExploreCard from "../../components/presentational/ExploreCard/ExploreCard";
import PAGE_HEADER_IMG from "../../images/PageHeader.png";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import CategoryFlicker from "./CategoryFlicker";
import "./MyCollections.scss";
import useWindowSize from "../../helpers/hooks";
import { myCollectionsAPI } from "../../services/userServices";
import { openNotification } from "../../components/Smart/Notification";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCard from "../../components/presentational/LoadingCard/LoadingCard";

const MyCollections = () => {
  const arr = [1, 2, 3];
  const [category,setCategory]=useState('');
    
  const [browserWidth] = useWindowSize();

  const [myCollections, setMyCollections] = useState([]);
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });

  const fetchMyCollections = async () => {
    try {
      const res = await myCollectionsAPI(extraData?.next_page);
      setMyCollections([...myCollections, ...res?.body?.data]);
      setExtraData({
        next_page: res?.body?.next_page,
        has_more: res?.body?.has_more,
      });
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
      // setExploreData([]);
    }
  };

  useEffect(() => {
    fetchMyCollections();
  }, []);

  const filterExplore = (exploreData) => {
    if (exploreData?.image_large_location?.includes("https")) {
      const check = exploreData?.image_large_location?.lastIndexOf(".");
      const extension = exploreData?.image_large_location.slice(check);
      if (extension !== ".svg") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  
  const filterCategory = (data) => {
    if (category==='') {
      return true
    }
    else{
      return data?.category_code===category
    }
  };

  return (
    <div className="FilterCollectionsPageWrapper">
      <div className="FilterCollectionsPageHeader">
        <img
          src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER_IMG}
          alt={"PAGE_HEADER_IMG"}
        />
        <div className="FilterCollectionsHeadingSection">
          <span className="FilterCollectionsText">
            FIND, EXPLORE & FOLLOW DIGITAL ART NFTS.
          </span>
          <span className="FilterCollectionsHeading">
            Find your favorite collections
          </span>
        </div>
      </div>
      <CategoryFlicker category={category} setCategory={setCategory} />
      <div className="filterCollectionscardGrid main_page_width">
        <InfiniteScroll
          dataLength={myCollections?.length} //This is important field to render the next data
          next={fetchMyCollections}
          hasMore={extraData?.has_more}
          loader={
            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              {arr?.map((item, index) => {
                return (
                  <Col
                    className="gutter-row"
                    span={browserWidth < 620 ? 24 : 8}
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
            {myCollections?.filter(filterExplore)?.filter(filterCategory)?.map((item, index) => {
              return (
                <Col
                  className="gutter-row"
                  span={browserWidth < 620 ? 24 : 8}
                  key={index}
                >
                    <ExploreCard data={item} showFollowIcon={false}/>
                </Col>
              );
            })}
          </Row>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MyCollections;
