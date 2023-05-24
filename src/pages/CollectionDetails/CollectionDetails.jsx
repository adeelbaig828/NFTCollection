import React,{useEffect,useState} from "react";
import FeaturedCard from "../../components/presentational/FeaturedCard/FeaturedCard";
import PAGE_HEADER_IMG from "../../images/collection_detail_header.svg";
import FILTER_IMG from "../../images/filter_icon.svg";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";
import { Row, Col, Input, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "./CollectionDetails.scss";
import { collectionDetailsApi } from "../../services/collectionServices";

const CollectionDetails = ({match}) => {

  const [colectionDetails,setCollectionsDetails]=useState([]);

  useEffect(()=>{
    const getCollectionDetails = async () => {
      try{
      const res=await collectionDetailsApi(match.params.id);
      setCollectionsDetails(res?.data?.body);
      }catch(error){
      console.log("err",error?.response?.data?.message);
      }
    }
    getCollectionDetails();
  },[])


  return (
    <div className="CollectionPageWrapper">
      <div className="CollectionPageHeader">
        <img src={PAGE_HEADER_IMG} alt={"PAGE_HEADER_IMG"} />
      </div>
      <div className="selectedCollection">
        <div className="CollectionDetailsSubHeader">
          <LeftSection data={colectionDetails} />
          <RightSection data={colectionDetails}  />
        </div>
      </div>
      <div className="searchBar">
        <div className="inputSection">
          <div className="searchInput">
           <Input/>
          </div>
          <div className="filterDropdown">
            <Dropdown overlay={''} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <span>
                  Click me
                  <DownOutlined />
                </span>
              </a>
            </Dropdown>
          </div>
          <div className="filterImage">
            <img src={FILTER_IMG} alt={"FILTER_IMG"} />
          </div>
        </div>
        <div className="reset">RESET FILTERS</div>
      </div>
      <div className="resultCardsGrid">
        <div className="heading">
          <span className="resultCount">Showing 54 results</span>
        </div>
        <div className="cardGrid">
          <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }} >
            <Col className="gutter-row" span={12}>
              <FeaturedCard />
            </Col>
            <Col className="gutter-row" span={12}>
              <FeaturedCard />
            </Col>
            <Col className="gutter-row" span={12}>
              <FeaturedCard />
            </Col>
          </Row>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default CollectionDetails;
