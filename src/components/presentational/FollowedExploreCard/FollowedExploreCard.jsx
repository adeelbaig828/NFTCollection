// import React, { useEffect, useState } from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import EYE_ICON from "../../../images/eye_icon.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import { Tooltip } from "antd";
import "./FollowedExploreCard.scss";
import { useHistory } from "react-router-dom";
import {
  followCollection,
  unFollowCollection,
} from "../../../services/collectionServices";
import { openNotification } from "../../Smart/Notification";
import { truncate } from "../../../helpers/utils";
import { useSelector } from "react-redux";

const { Meta } = Card;

const FollowedExploreCard = ({
  data,
  collections,
  setCollections,
  setRefetchQuery,
}) => {
  const history = useHistory();

  const user = useSelector((state) => state?.auth?.user);

  const handleClick = () => {
    history.push(`/collectionView/${data?.guid}`);
  };
  const unFollowCollections = async (e) => {
    e.stopPropagation();
    try {
      const res = await unFollowCollection(data?.guid);
      const dataManipulated = collections.map((el) => {
        if (el.guid !== data.guid) {
          return el;
        }
      });
      const rawData = dataManipulated.filter(function (element) {
        return element !== undefined;
      });
      setCollections(rawData);
      setRefetchQuery((prev) => !prev);
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
    }
  };

  const handleCreatedBy = (e) => {
    e.stopPropagation();
    if (user?.username === data?.created_by) {
      history.push(`/profile`);
    } else {
      history.push(`/creatorDetails/${data?.created_by}`);
    }
  };

  return (
    <div className="FollowedExploreCard" onClick={handleClick}>
      <Card
        hoverable
        cover={
          <span className="ExploreCardWrapper">
            <span className="ExploreCardImage">
              <img alt="example" src={data?.image_large_location} />
            </span>
            <Tooltip title={"UnFollow"} color={"#303549"}>
              <span
                className={"orangeFrame"}
                onClick={(e) => unFollowCollections(e)}
              >
                <img src={FRAME_ICON} alt={"FRAME_ICON"} />
              </span>
            </Tooltip>

            <span
              className="footer"
              style={{
                background: `url(${data?.image_small_location}) no-repeat`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            ></span>
          </span>
        }
      >
        <Meta
          title={data?.store_name}
          description={truncate(data?.description_short)}
        />
        <div className="exploreCardFooter">
          {/* <span className="priceHeading">Price <span className="priceHeading">$$ ETH</span></span> */}
          <span className="rightSection">
            <span>
              <img src={EYE_ICON} alt={"EYE_ICON"} />
              <span className="beliefPrice">{data?.views}</span>
            </span>
            <span className="tagImage">
              <Tooltip title={"Followers"} color={"#303549"}>
                <img src={ORANGE_FRAME} alt={"ORANGE_FRAME"} />
              </Tooltip>
              <span className="tagPrice">{data?.followers_count}</span>
            </span>
          </span>
        </div>
        <div className="idSection"># {data?.guid}</div>
        <div className="createdBy" onClick={(e) => handleCreatedBy(e)}>
          <span>Created By: </span>
          <span className="textStyle">{data?.created_by}</span>
        </div>
      </Card>
    </div>
  );
};

export default FollowedExploreCard;
