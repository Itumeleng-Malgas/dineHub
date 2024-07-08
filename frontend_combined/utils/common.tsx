import { notification } from "antd";

export const successNotification = (message: string, description: string) => {
    notification.success({
        message: message,
        description: description,
        duration: 5,
        placement: 'topRight',
    });
};

export const errorNotification = (message: string, description: string) => {
    notification.error({
        message: message,
        description: description,
        duration: 5,
        placement: 'topRight',
    });
};
