import { Button, Modal } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export const confirm = (title, description, okText = "Ok", cancelText = "Cancel", onOk = () => {}, onCancel = () => {}) => {
  Modal.confirm({
    title: title,
    // icon: <SmileOutlined />,
    content: description,
    okText: okText,
    cancelText: cancelText,
    onOk: () => { 
      onOk();
    },
    onCancel: () => {
      onCancel();
    }
  });
};