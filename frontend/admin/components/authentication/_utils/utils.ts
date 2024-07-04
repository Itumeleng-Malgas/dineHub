import { notification } from "antd";
import axios from "axios";
import { RegisterFieldType } from "../Register";
import { LoginFieldType } from "../Login";
import { hashPass } from "@/lib/auth";

export const openNotification = (message: string) => {
    notification.error({
      message: 'Login error',
      description: message,
      duration: 5,
      placement: 'topRight',
    });
  };

  export const successNotification = (message: string) => {
    notification.success({
      message: 'Registed',
      description: message,
      duration: 5,
      placement: 'topRight',
    });
  };

  export const errorNotification = (message: string) => {
    notification.error({
      message: 'Error occured',
      description: message,
      duration: 5,
      placement: 'topRight',
    });
  };


  export const Register = async (values: RegisterFieldType) => {
    const response = await axios.post('http://127.0.0.1:3001/api/v1/restaurants', values);
    return response;
  }

  export const Login = async (values: LoginFieldType) => {
    const user = await axios.post('http://localhost:3001/api/v1/auth/login', {"email":"1@gmail.com", "password": await hashPass('1')});
    console.log(user)
    return user;
  }
  
  