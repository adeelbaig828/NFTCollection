import React,{useState,useEffect} from "react";
import BG_IMGAGE from "../../images/HomePageHeader.svg";
import IMAGE_FOOTER from "../../images/imageFooter.svg";
import MOBILE_HEADER_IMG from "../../images/mobile_header_img.png";
import NftCard from "../../components/presentational/Card/Card";
import CreateandSellNft from "./CreateandSellNft";
import MyNftScreen from './myNftScreen'
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";
import { Link } from "react-router-dom";
import "./index.scss";
import useWindowSize from "../../helpers/hooks";
import { openNotification } from "../../components/Smart/Notification";

const MyNfts = ({match}) => {
  const [browserWidth] = useWindowSize();
  const [topPick,setTopPick] = useState([]);
  // useEffect(() => {
  //   const topHits = async () => {
  //     try{
  //     const res = await getTopHitsAPI();
  //     setTopPick(res?.data?.body);
  //     }
  //     catch(error){
  //       openNotification("Oops",error?.response?.data?.message)
  //     }
  //   };

  //   topHits();
  // }, []);


  return (
    <div className="homePage">
      <div className="subHeader">
        <div
          className="bgImage"
          style={{
            background: `url(${
              browserWidth < 821 ? MOBILE_HEADER_IMG : BG_IMGAGE
            }) no-repeat`,
            width: "100%",
          }}
        >
          <div className="main_banner1 dispay_flex_c1 align_items_c1 justify_content_c1 main_page_width padding_add">
            <div className="leftSide">
              <span className="leftHeading">
                Purchase artwork or start publishing now
              </span>
              <span className="leftSubHeading">
                Explore a collection of entertaining animations, comics and
                anime of talented artists from around the world
              </span>
              <span className="btnSection">
                <a href="/explore" target={"_self"} className="link">
                  {" "}
                  <span className="explore">Explore</span>
                </a>
                <Link to="/createCollection" className="link">
                  <span className="create">Create</span>
                </Link>
              </span>
            </div>
            {browserWidth > 821 && (
              <div className="rightSide">
                <span className="leftHeading">
                  <NftCard
                    showTopPick={true}
                    data={topPick[0]}
                    showFollowIcon={false}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
        <img src={IMAGE_FOOTER} alt={"IMAGE_FOOTER"} className="footerImage" />
      </div>
      {browserWidth < 821 && (
        <div className="rightSide">
          <span className="leftHeading">
            <NftCard showTopPick={true} data={topPick[0]} />
          </span>
        </div>
      )}
      <MyNftScreen />
      <CreateandSellNft />
      <NewsLetter />
    </div>
  );
};

export default MyNfts;
