import React from "react";
import PAGE_HEADER from "../../images/PageHeader.png";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import "./EditCollection.scss";
import EditCollectionForm from "./EditCollectionForm";
import useWindowSize from "../../helpers/hooks";

const EditCollection = ({match}) => {
  const [browserWidth]=useWindowSize()
  return (
    <>
      <div className="EditCollectionWrapper">
        <div className="EditCollectionHeader">
          <img src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={"PAGE_HEADER"} />
          <div className="EditCollectionHeadingSection">
            <span className="EditCollectionText">
              Become an NFT artist with NFTdepot
            </span>
            <span className="EditCollectionHeading">Edit your Collection</span>
          </div>
        </div>
        <EditCollectionForm collectionId={match?.params?.id}/>
      </div>
    </>
  );
};

export default EditCollection;
