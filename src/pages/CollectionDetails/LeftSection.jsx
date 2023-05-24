import React from 'react'
import CollectionDetailCard from '../../components/presentational/CollectionDetailCard/CollectionDetailCard';
import PRICE_ICON from "../../images/price_icon.svg";

import './LeftSection.scss';

const LeftSection = () => {
  return (
    <div className="leftSideSection">
          <span className="searchedCard">
            <CollectionDetailCard />
          </span>
          <div className="cardFotterSection">
            <span className="flexStyle">
              <span className="key">Owners</span>
              <span className="value">21</span>
            </span>
            <span className="flexStyle">
              <span className="key"> Floor Price</span>
              <span className="value">
                <span className="dFlex">
                  <img src={PRICE_ICON} alt={"PRICE_ICON"} />
                </span>{" "}
                21
              </span>
            </span>
            <span className="flexStyle">
              <span className="key"> Volume Traded</span>
              <span className="value">51.3k</span>
            </span>
            <span className="flexStyle unsetBorder">
              <span className="key"> Website</span>
              <span className="value">www.nft.com</span>
            </span>
          </div>
        </div>
  )
}

export default LeftSection