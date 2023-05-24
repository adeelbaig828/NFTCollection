import React from "react";
import { Card } from "antd";
import TEST_ICON from "../../../images/test_footer.svg";
import TEST_IMG from "../../../images/test_img.png";
import ORANGE_DOT from "../../../images/orange_dot.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import { Tooltip } from "antd";
import "./FeaturedLoadingCard.scss";

const FeaturedLoadingCard = ({ isNft }) => {
  return (
    <div className="featuredLoadingCard">
      <Card>
        <div className="cardContent">
          <div
            className="coverImageWrapper"
            style={{
              background: `linear-gradient(270deg, #F2FAFC 0%, #E1ECEF 100%)`,
              height: "172px",
            }}
          >
            {!isNft && (
              <div
                className="tagImage"
                style={{
                  background: `linear-gradient(270deg, #F2FAFC 0%, #E1ECEF 100%)`,
                  borderRadius:'50%',
                }}
              ></div>
            )}
          </div>
          <div className="content">
            <div className="description">
              <span className="StatsSection">
                <span className="avgSection">
                  <span className="avg"></span>
                </span>
                <span className="floorSection">
                  <span className="floor"></span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedLoadingCard;
