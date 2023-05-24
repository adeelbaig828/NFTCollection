import React, { useRef } from "react";
import Flicking from "@egjs/react-flicking";
import LEFT_ARROW from "../../images/left_icon_gray.svg";
import RIGHT_ARROW from "../../images/right_icon_gray.svg";
import "@egjs/react-flicking/dist/flicking.css";
import "./ProfileCollectionsFlicker.scss";

const ProfileCollectionsFlicker = ({ currentTab, setCurrentTab }) => {
  const flickinfRef = useRef();
  const arr = [
    {
      name: "MY COLLECTION",
      value: 52,
    },
    {
      name: "CREATED",
      value: 52,
    },
    {
      name: "COLLECTED Nfts",
      value: 52,
    },
    {
      name: " FOLLOWED",
      value: 52,
    },
    {
      name: "ACTIVITY",
      value: 52,
    },
  ];

  const onClickLeft = () => {
    flickinfRef.current.prev();
  };

  const onClickRight = () => {
    flickinfRef.current.next();
  };

  return (
    <div className="ProfileCollectionsFlickerWrapper">
      <div onClick={onClickLeft} className="arrow leftArrow">
        <img src={LEFT_ARROW} alt={"LEFT_ARROW"} />
      </div>
      <Flicking
        horizontal
        bound
        viewportTag={"div"}
        defaultIndex={0}
        align={"prev"}
        circular
        ref={flickinfRef}
      >
        {arr.map((item, index) => {
          return (
            <div key={index} className="dFlex">
              <div
                className={
                  currentTab == item?.name ? "selected" : "notSelected"
                }
                onClick={() => setCurrentTab(item?.name)}
              > {item?.name}</div>
              <span>{item.value}</span>
            </div>
          );
        })}
      </Flicking>
      <div onClick={onClickRight} className="arrow rightArrow">
        <img src={RIGHT_ARROW} alt={"RIGHT_ARROW"} />
      </div>
    </div>
  );
};

export default ProfileCollectionsFlicker;
