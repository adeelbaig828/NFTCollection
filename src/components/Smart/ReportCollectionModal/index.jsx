import { Form, Modal, Select, Input, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { reportCollectionAPI } from "../../../services/collectionServices";
import { codesAPI } from "../../../services/createCollectionServices";
import Spin from "../../presentational/Spin";
import { openNotification } from "../Notification";
import "./ReportCollectionModal.scss";

const ReportCollectionModal = ({ visible, setVisible, collectionId }) => {
  const [reportingCodes, setReportingCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const [form] = useForm();
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const data = {
        store_front_guid: collectionId,
        message: values?.message,
        reporting_code: values?.reportingCode,
      };
      const res = await reportCollectionAPI(data);
      onReset();
      setLoading(false);
      setVisible(false);
      openNotification("Success", "Collection Reported Successfully");
    } catch (e) {
      setLoading(false);
      console.log("e", e);
    }
  };
  const onFinishFailed = (error) => {
    console.log("error", error);
  };
  useEffect(() => {
    const getReportingCodes = async () => {
      try {
        const res = await codesAPI("ReportingCode");
        setReportingCodes(res?.data?.body);
      } catch (e) {
        console.log("e", e);
      }
    };
    getReportingCodes();
  }, []);

  return (
    <div>
      <Modal
        visible={visible}
        footer={null}
        title={<div className="title">Report This Collection</div>}
        onOk={handleOk}
        onCancel={handleCancel}
        className="reportWrapper"
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          ref={formRef}
          form={form}
        >
          <Form.Item
            name="reportingCode"
            label="This Collection is..."
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please select any option",
              },
            ]}
          >
            <Select placeholder="Select a reason">
              {reportingCodes?.map((item, index) => {
                return (
                  <Select.Option value={item?.code} key={item + index}>
                    {item?.description}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="message"
            label="Your Message"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please enter your message!",
              },
            ]}
          >
            <Input.TextArea placeholder="Enter Your Message to Admin" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <Spin />
                </div>
              ) : (
                "Report"
              )}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReportCollectionModal;
