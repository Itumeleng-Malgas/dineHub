import { notification } from "antd";

export const openNotification = (message: string) => {
    notification.error({
      message: 'Login error',
      description: message,
      duration: 5,
      placement: 'topRight',
    });
  };