import { notification } from "antd";
import axios from "axios";

export const openNotification = (message: string) => {
    notification.error({
      message: 'Login error',
      description: message,
      duration: 5,
      placement: 'topRight',
    });
  };


  export const Register = async () => {
    const response = await axios.post('http://127.0.0.1:3001/api/v1/restaurants', {"name":"Alibaba", "email":"alibaba@gmail.com", "password":"12345"});
    return response;
  } 