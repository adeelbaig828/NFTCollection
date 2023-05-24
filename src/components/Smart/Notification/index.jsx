import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export const openNotification = (message, description) => {
  notification.open({
    message,
    description,
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
  });
};