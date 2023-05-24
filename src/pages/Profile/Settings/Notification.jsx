import { Form, Switch, Button, Input, Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spin from "../../../components/presentational/Spin";
import { openNotification } from "../../../components/Smart/Notification";
import { VerifyUser } from "../../../services/authServices";
import { codesAPI } from "../../../services/createCollectionServices";
import { updateProfileAPI } from "../../../services/userServices";
import { setProfile } from "../../../store/auth/authActions";

const Notification = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);
  const [coinType, setCoinType] = useState([]);
  const [itemSold, setItemSold] = useState(user?.notification_item_sold);
  const [bidActivity, setBidActivity] = useState(
    user?.notification_bid_activity
  );
  const [priceChange, setPriceChange] = useState(
    user?.notification_price_change
  );
  const [auctionExpired, setAuctionExpired] = useState(
    user?.notification_auction_expired
  );
  const [outBid, setOutBid] = useState(user?.notification_out_bid);
  const [itemUpdated, setItemUpdated] = useState(
    user?.notification_owned_item_updated
  );
  const [purcshaseSuccessfull, setPurcshaseSuccessfull] = useState(
    user?.notification_purchase_successful
  );
  const [newsLetter, setNewsLetter] = useState(user?.notification_marketing);

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    const updatedData = {
      ...user,
      notification_auction_expired: auctionExpired ? 1 : 0,
      notification_bid_activity: bidActivity ? 1 : 0,
      notification_marketing: newsLetter ? 1 : 0,
      notification_item_sold: itemSold ? 1 : 0,
      notification_owned_item_updated: itemUpdated ? 1 : 0,
      notification_bid_minimum_met_amount: values?.minimumMetAmount,
      notification_bid_minimum_met_coin_type: values?.minimumMetCoinType,
      notification_out_bid: outBid ? 1 : 0,
      notification_price_change: priceChange ? 1 : 0,
      notification_purchase_successful: purcshaseSuccessfull ? 1 : 0,
    };

    try {
      const res = await updateProfileAPI(updatedData);
      setLoading(false);
      dispatch(setProfile(updatedData));
      const userData=await VerifyUser();
      dispatch(setProfile(userData));
      openNotification("Success", "Data Updated Successfully");
    } catch (e) {
      setLoading(false);
      openNotification("Oops", e?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const coinTypes = async () => {
      const respons = await codesAPI("Minting Coin");
      setCoinType(respons?.data);
    };
    coinTypes();
  }, []);

  return (
    <div className="notificationWrapper">
      <Form
        name="basic"
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          minimumMetAmount: user?.notification_bid_minimum_met_amount,
          minimumMetCoinType: user?.notification_bid_minimum_met_coin_type,
        }}
      >
        <div className="deactivate_acc_last">
          <div className="switch_antd _space_inner_de">
            <div className="switch_antd_subscription">
              <p>Your subscriptions</p>
            </div>
          </div>
          <hr />
          <div className="switch_antd _space_inner_de">
            <div className="outer_layer_select">
              <div>
                <Form.Item
                  label="Newsletter"
                  labelAlign="left"
                  className="firstSwitch"
                  name="newsLetter"
                >
                  <Switch
                    size="small"
                    checked={newsLetter}
                    onChange={setNewsLetter}
                  />
                </Form.Item>
                <p className="passInfo">
                  I would like to receive NewsLetter and Notifications from Nft
                  Depot.
                </p>
              </div>
              <Form.Item
                label="Item Sold"
                labelAlign="left"
                className="firstSwitch"
                name="itemSold"
              >
                <Switch
                  size="small"
                  checked={itemSold}
                  onChange={setItemSold}
                />
              </Form.Item>
              <Form.Item
                label="Bid Activity"
                labelAlign="left"
                className="firstSwitch"
                name="bidActivity"
              >
                <Switch
                  size="small"
                  checked={bidActivity}
                  onChange={setBidActivity}
                />
              </Form.Item>
              <Form.Item
                label="Price Change"
                labelAlign="left"
                className="firstSwitch"
                name="priceChange"
              >
                <Switch
                  size="small"
                  checked={priceChange}
                  onChange={setPriceChange}
                />
              </Form.Item>
              <Form.Item
                label="Auction Expired"
                labelAlign="left"
                className="firstSwitch"
                name="auctionExpired"
              >
                <Switch
                  size="small"
                  checked={auctionExpired}
                  onChange={setAuctionExpired}
                />
              </Form.Item>
              <Form.Item
                label="Out Bid"
                labelAlign="left"
                className="firstSwitch"
                name="outBid"
              >
                <Switch size="small" checked={outBid} onChange={setOutBid} />
              </Form.Item>
              <Form.Item
                label="Owned Item Updated"
                labelAlign="left"
                className="firstSwitch"
                name="itemUpdated"
              >
                <Switch
                  size="small"
                  checked={itemUpdated}
                  onChange={setItemUpdated}
                />
              </Form.Item>
              <Form.Item
                label="Purchase SuccessFull"
                labelAlign="left"
                className="firstSwitch"
                name="purcshaseSuccessfull"
              >
                <Switch
                  size="small"
                  checked={purcshaseSuccessfull}
                  onChange={setPurcshaseSuccessfull}
                />
              </Form.Item>
              <div className="bidAmount">
                <Form.Item
                  label="Minimum Bid Amount:"
                  labelAlign="left"
                  className="firstSwitch"
                  name="minimumMetAmount"
                >
                  <Input size="small" />
                </Form.Item>
              </div>
              <div className="minimumMetCoinType">
                <Form.Item
                  label="Coin Type"
                  labelAlign="left"
                  className="firstSwitch"
                  name="minimumMetCoinType"
                >
                  <Select placeholder="Minting Coin">
                    {coinType?.body?.slice(0, 2)?.map((item, index) => {
                      return (
                        <Select.Option value={item?.code} key={item + index}>
                          {item?.description}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <span className="nextButton">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {loading ? <Spin /> : "Save Changes"}
                </Button>
              </Form.Item>
            </span>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Notification;
