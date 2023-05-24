import React from "react";
import TEST_ICON from "../../images/test_footer.svg";
import DISCORD_ICON from "../../images/discord_icon.svg";
import M_ICON from "../../images/M_icon.svg";
import TWITTER_ICON from "../../images/twitter_icon.svg";
import WHITE_FRAME_ICON from "../../images/white_frame_icon.svg";
import SHARE_ICON from "../../images/share.svg";
import EYE_ICON from "../../images/eye_icon.svg";
import ORANGE_FRAME from "../../images/orange_frame.svg";

import { Tooltip } from "antd";

import "./RightSection.scss";

const RightSection = () => {
  return (
    <div className="rightSectionWrapper">
      <div className="RightHeader">
        <div className="leftSideWithImage">
          <div className="creatorDetails">
          <span className="imageSection">
            <img src={TEST_ICON} alt={"TEST_ICON"} />
          </span>
          <span className="textSection">
            <span className="createdBy">created by</span>
            <span className="creatorName">Phil Lee</span>
          </span>
          </div>
          <div className="socialIcons">
            <span className="socialIconImage">
              <img src={DISCORD_ICON} alt={"DISCORD_ICON"} />
            </span>
            <span className="socialIconImage">
              <img src={M_ICON} alt={"M_ICON"} />
            </span>
            <span className="socialIconImage">
              <img src={TWITTER_ICON} alt={"TWITTER_ICON"} />
            </span>
            <span className="socialIconImage changebg">
              <img src={SHARE_ICON} alt={"SHARE_ICON"} />
            </span>
            <Tooltip
              title="Add to favourites"
              color={"#303549"}
              overlayClassName="favouriteToolTip"
            >
              <span className="socialIconImage changebgColor ">
                <img src={WHITE_FRAME_ICON} alt={"WHITE_FRAME_ICON"} />
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="itemInfo">
          <span className="noOfItems">345 items</span>
          <span className="infoIcon">
            <img src={EYE_ICON} alt={"EYE_ICON"} />
            <span className="infoText">456</span>
          </span>
          <span className="infoIcon">
            <img src={ORANGE_FRAME} alt={"ORANGE_FRAME"} />
            <span className="infoText">33</span>
          </span>
        </div>
        <div className="itemDetails">
          <span className="detail">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur.
          </span>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
