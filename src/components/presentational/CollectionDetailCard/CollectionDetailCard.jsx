import React from "react";
import { Card } from "antd";
import "./CollectionDetailCard.scss";

const { Meta } = Card;

const CollectionDetailCard = () => {
  return (
    <div className="CollectionDetailCard">
      <Card
        hoverable
        cover={
          <span className="CollectionDetailCardCoverWrapper">
            <span className="CollectionDetailCardCoverImage" >
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
             
            />
            </span>
          </span>
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </div>
  );
};

export default CollectionDetailCard;
