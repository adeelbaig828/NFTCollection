import React from "react";
import Top_IMAGE from "../../../images/footer_top_image.svg";
import HEADER_LOGO from "../../../images/headerLogo.svg";
import FB from "../../../images/facebook.svg";
import TWITTER from "../../../images/twitter.svg";
import INSTAGRAM from "../../../images/instagram.svg";
import LINKEDIN from "../../../images/linkedin.svg";
import YOUTUBE from "../../../images/youtube.svg";
import "./Footer.scss";

const AppFooter = () => {
  return (
    <div>
      <div className="footerWrapper">
        <span className="footerTopImage">
          <img src={Top_IMAGE} alt="Top_IMAGE" />
        </span>
        <div className="footerContent">
          <span className="footerLogo">
            <img src={HEADER_LOGO} alt="HEADER_LOGO" />
          </span>
          <span className="footerDesc">
            Explore a collection of entertaining animations, comics and anime of
            talented artists from around the world. Purchase artwork or start
            publishing now
          </span>
          <span className="socialIcons">
            <span className="socialIcon">
              <img src={FB} alt="FB" />
            </span>
            <span className="socialIcon">
              <img src={TWITTER} alt="TWITTER" />
            </span>
            <span className="socialIcon">
              <img src={INSTAGRAM} alt="INSTAGRAM" />
            </span>
            <span className="socialIcon">
              <img src={LINKEDIN} alt="LINKEDIN" />
            </span>
            <span className="socialIcon">
              <img src={YOUTUBE} alt="LINKEDIN" />
            </span>
          </span>
        </div>
        <div className="footerLastSection">
          <span className="footertabs">Browse</span>
          <span className="footertabs ML">Features</span>
          <span className="footertabs ML">Publish</span>
          <span className="footertabs ML">Stats</span>
        </div>
        <div className="bottomSection">
          <span className="copyRight">© copyright 2022 nftdepot.art</span>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
