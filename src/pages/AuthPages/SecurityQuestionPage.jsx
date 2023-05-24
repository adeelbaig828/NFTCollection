import React, { useState } from "react";
import PAGE_HEADER from "../../images/PageHeader.png";
import AUTH_ICON from "../../images/auth_icon.svg";
import { Input, Form, Button } from "antd";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import Spin from "../../components/presentational/Spin";
import { openNotification } from "../../components/Smart/Notification";
import {
  getRandomSecurityQuestionsAPI,
  verifyQuestionAPI,
} from "../../services/userServices";
import "./ResetPassword.scss";
import useWindowSize from "../../helpers/hooks";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { codesAPI } from "../../services/createCollectionServices";

const SecurityQuestion = ({ user_guid }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [question, setQuestion] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = {
        email: userDetails?.user_email,
        token: userDetails?.token,
        question: userDetails?.question,
        answer: values?.answer,
      };

      const res = await verifyQuestionAPI(data);
      if (res?.data?.body) {
        history.push(`/auth/reset-password?token=${res?.data?.body?.token}`);
      } else {
        openNotification(
          "Incorrect Answer",
          "Kindly Contact Us incase you forgot the answer!"
        );
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      openNotification("Oops", e?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [browserWidth] = useWindowSize();

  useEffect(() => {
    const getRandomSecurityQuestion = async () => {
      try {
        const res = await getRandomSecurityQuestionsAPI(
          "15fc3743-866d-4529-9674-e7f464bd230e"
        );
        const questionDetails = await codesAPI("Security Questions");
        const question = questionDetails?.data?.body?.find(
          (item) => item?.code == res?.data?.body?.question
        );
        setQuestion(question?.description);
        console.log("res", res);
        setUserDetails(res?.data?.body);
      } catch (e) {
        console.log(e);
      }
    };
    getRandomSecurityQuestion();
  }, []);

  return (
    <>
      <div className="ChangePasswordWrapper">
        <div className="ChangePasswordPageHeader">
          <img
            src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER}
            alt={"PAGE_HEADER"}
          />
        </div>
        <div className="ChangePasswordFormWrapper">
          <div className="ChangePasswordForm">
            <div className="form">
              <span className="formHeadingWrapper">
                <span className="ChangePasswordAcc">
                  Please Answer this question to verify your identity
                </span>
                <span className="ChangePasswordIcon">
                  <img src={AUTH_ICON} alt={"AUTH_ICON"} />
                </span>
              </span>

              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
              >
                <Form.Item
                  name="answer"
                  label={question}
                  rules={[
                    {
                      required: true,
                      message: "Please answer!",
                    },
                  ]}
                >
                  <Input placeholder="Type Your Answer here" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {loading ? <Spin /> : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityQuestion;
