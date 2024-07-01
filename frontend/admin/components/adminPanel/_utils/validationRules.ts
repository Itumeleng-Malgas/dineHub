import { Rule } from 'antd/lib/form';

type ValidationRules = {
    [key: string]: Rule[];
};

export const restaurantProfileValidationRules: ValidationRules = {
    restaurantName: [
        { required: true, message: 'Please input your Restaurant Name!' },
    ],
    email: [
        { required: true, message: 'Please input your Email!' },
        { type: 'email', message: 'The input is not valid E-mail!' },
    ],
    address: [
        { required: true, message: 'Please input your Address!' },
    ],
    phone: [
        { required: true, message: 'Please input your Phone Number!' },
        { pattern: /^\+\d{1,3}\d{1,14}$/, message: 'Please input a valid phone number in the format +27636994946!' },
    ],
    cuisine: [
        { required: true, message: 'Please select the cuisine type!' },
    ],
    description: [
        { required: true, message: 'Please input your Description!' },
    ],
};