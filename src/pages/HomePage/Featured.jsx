import React, { useState, useEffect } from "react";
import FeaturedCard from "../../components/presentational/FeaturedCard/FeaturedCard";
import RIGHT_ARROW from "../../images/right_arrow.svg";

import { Row, Col, Carousel } from "antd";
import "./Featured.scss";
import { getFeaturedAPI } from "../../services/homePageServices";
import { Link } from "react-router-dom";
import useWindowSize from "../../helpers/hooks";
import FeatureMobileCard from "../../components/presentational/FeatureMobileCard/FeatureMobileCard";
import { openNotification } from "../../components/Smart/Notification";
import FeaturedLoadingCard from "../../components/presentational/FeaturedLoadingCard/FeaturedLoadingCard";
import LoadingCard from "../../components/presentational/LoadingCard/LoadingCard";

const Featured = () => {
  const [featured, setFeatured] = useState([]);
  const arr = [0, 1];
  const [loading, setLoading] = useState(false);
  const [browserWidth] = useWindowSize();
  useEffect(() => {
    const featured = async () => {
      try {
        setLoading(true);
        const res = await getFeaturedAPI();
        setFeatured(res?.data?.body);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openNotification("Oops Error in getting Featured", error?.response?.data?.message);
      }
    };

    featured();
  }, []);

  const filterFeatured = (featured) => {
    if (featured?.image_large_location?.includes("https")) {
      const check = featured?.image_large_location?.lastIndexOf(".");
      const extension = featured?.image_large_location.slice(check);
      if (extension !== ".svg") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  return (
    <div className="featured">
      <div className="main_page_width">
      <div className="heading">
        <span className="feature">Featured</span>
        <span>
          <span className="discover">Discover</span>
          <Link to={"/explore"}>
            <img src={RIGHT_ARROW} alt={"RIGHT_ARROW"} />
          </Link>
        </span>
      </div>
      <div className="cardGrid">
        <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
          {loading
            ? arr.map((item, index) => {
                return (
                  <Col className="gutter-row" span={12} key={index}>
                    <FeaturedLoadingCard isNft={false} />
                  </Col>
                );
              })
            : featured
                ?.filter(filterFeatured)
                ?.slice(0, 8)
                ?.map((item, index) => {
                  return (
                    <Col className="gutter-row" span={12} key={index}>
                      <FeaturedCard data={item} showFollowIcon={false} />
                    </Col>
                  );
                })}
        </Row>
      </div>
      </div>
      {browserWidth < 821 && (
        <Carousel dotPosition={"bottom"}>
          {loading ? (
            <LoadingCard />
          ) : (
            featured
              ?.filter(filterFeatured)
              ?.slice(0, 8)
              ?.map((item, index) => {
                return (
                  <div key={index}>
                    <FeatureMobileCard data={item} showFollowIcon={false} />
                  </div>
                );
              })
          )}
        </Carousel>
      )}
    </div>
  );
};

export default Featured;
