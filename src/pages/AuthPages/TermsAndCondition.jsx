import React from "react";
import { Row, Col } from "antd";
import PAGE_HEADER from "../../images/PageHeader.png";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import "./TermsAndCondition.scss";
import AppFooter from "../../components/Layout/Footer/Footer";
import AppHeader from "../../components/Layout/Header/Header";

const TermsAndCondition = () => {

  return (
    <>
      <AppHeader />
      <div className="termsWrapper">
        <div className="TermsAndConditionHeader">
          <img src={HEADER_IMAGE_MOBILE} alt={"PAGE_HEADER"} />
        </div>
      </div>
      <iframe
        src="https://app.termly.io/document/terms-of-use-for-website/815902d6-4654-4423-b671-bb7f1eee6468"
        width={"100%"}
      ></iframe>
      <AppFooter />
    </>
  );
};

export default TermsAndCondition;
