// validationRules.ts
import { Rule } from 'antd/lib/form';

type ValidationRules = {
    [key: string]: Rule[];
};

export const loginValidationRules: ValidationRules = {
    email: [
        { required: true, message: 'Please input your Email!' },
        { type: 'email', message: 'The input is not valid E-mail!' },
    ],
    password: [
        { required: true, message: 'Please input your Password!' },
    ],
};

export const registerValidationRules: ValidationRules = {
    restaurantName: [
        { required: true, message: 'Please input your Restaurant Name!' },
    ],
    email: [
        { required: true, message: 'Please input your Email!' },
        { type: 'email', message: 'The input is not valid E-mail!' },
    ],
    password: [
        { required: true, message: 'Please input your Password!' },
    ],
    confirmPassword: [
        { required: true, message: 'Please confirm your Password!' },
        ({ getFieldValue }) => ({
            validator(_: any, value: string) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
            },
        }),
    ],
};

export const passwordResetValidationRules: ValidationRules = {
    email: [
        { required: true, message: 'Please input your Email!' },
        { type: 'email', message: 'The input is not valid E-mail!' },
    ],
};