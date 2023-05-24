import React from "react";
import { Card } from "antd";
import "./LoadingCard.scss";

const { Meta } = Card;

const LoadingCard = () => {
  return (
    <div className="LoadingCard">
      <Card
        cover={
          <div className="LoadingCardWrapper">
            <div
              className="footer"
              style={{ background: `linear-gradient(270deg, #F2FAFC 0%, #E1ECEF 100%)` }}
            ></div>
          </div>
        }
      >
        <Meta title={<div className="title"></div>} description={<div className="desc"></div>} />
        <div className="LoadingCardFooter">
            <span className="priceHeading"></span>
            <span className="rightSection" >
                <span className="beliefPrice"></span>
                <span className="tagImage">
                <span className="tagPrice"></span>
                </span>
            </span>
        </div>
      </Card>
    </div>
  );
};

export default LoadingCard;
