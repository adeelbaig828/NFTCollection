import React, { useRef } from "react";
import Flicking from "@egjs/react-flicking";
import FlickerCard from "../../components/presentational/FlickerCard/FlickerCard";
import LEFT_ARROW from "../../images/left_sign_arrow.svg";
import RIGHT_ARROW from "../../images/right_sign_arrow.svg";

import "@egjs/react-flicking/dist/flicking.css";
import "./Flicker.scss";
import { useEffect } from "react";
import { getCollectionRarityData } from "../../services/collectionServices";
import { useState } from "react";

const FlickerComp = ({ collectionId }) => {
  const flickinfRef = useRef();
  const [rarityData, setRarityData] = useState([]);

  const onClickLeft = () => {
    flickinfRef.current.prev();
  };

  const onClickRight = () => {
    flickinfRef.current.next();
  };

  useEffect(() => {
    const getRarityData = async () => {
      try {
        const res = await getCollectionRarityData(collectionId);
        setRarityData(res?.data?.body?.length ? res?.data?.body : []);
      } catch (e) {
        console.log("error", e?.response?.data?.message);
      }
    };
    getRarityData();
  }, [collectionId]);

  return (
    <div className="flickerWrapper main_page_width">
      {rarityData?.length ? (
        <>
          <div onClick={onClickLeft} className="arrow leftArrow">
            <img src={LEFT_ARROW} alt={"LEFT_ARROW"} />
          </div>
          <Flicking
            horizontal
            bound
            viewportTag={"div"}
            defaultIndex={0}
            align={"prev"}
            circular={true}
            ref={flickinfRef}
          >
            {rarityData?.map((item, index) => {
              return (
                <div key={index}>
                  <FlickerCard data={item} />
                </div>
              );
            })}
          </Flicking>
          <div onClick={onClickRight} className="arrow rightArrow">
            <img src={RIGHT_ARROW} alt={"RIGHT_ARROW"} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FlickerComp;
