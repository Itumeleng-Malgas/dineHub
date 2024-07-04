"use client"

import React from "react";
import Link from 'next/link';
import { Layout, Typography, Button, Form, Input, Divider, FormProps } from "antd";
import SocialLogin from "@/components/authentication/SocialLogin";
import { registerValidationRules } from './_utils/validationRules';
import axios from "axios";
import { errorNotification, successNotification } from "./_utils/utils";
import { hashPass } from "@/lib/auth";
import { useRouter } from 'next/navigation'

export type RegisterFieldType = {
    name?: string;
    email?: string;
    password?: string;
};

const { Content } = Layout;
const { Title } = Typography;

const RegisterComponent = () => {
    const router = useRouter();

    const onFinish: FormProps<RegisterFieldType>['onFinish'] = async ({name, email, password}) => {
        try {
            const response = await axios.post('http://127.0.0.1:3001/api/v1/restaurants', {"name": name, "email": email, "password": await hashPass(password as string)});
            console.log(await hashPass(password as string))
            if (response.data.Message){
                successNotification(response.data.Message);
                router.push('/login')
            }
        } catch (error) {
            if (error instanceof Error){
                errorNotification(error.message)
            } 
        }        
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Content className="text-center">
            <Title>Register your restaurant</Title>
            <Typography.Paragraph>
                Your Restaurant. Our Platform. Unlimited Reach.
            </Typography.Paragraph>

            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="name"
                    rules={registerValidationRules.restaurantName}
                >
                    <Input placeholder="Restaurant Name" type="text" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={registerValidationRules.email}
                >
                    <Input placeholder="Email" type="email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={registerValidationRules.password}
                >
                    <Input placeholder="Password" type="password" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={registerValidationRules.confirmPassword}
                >
                    <Input placeholder="Confirm Password" type="password" />
                </Form.Item>
                <Form.Item>
                    <Button className="w-full" type="primary" htmlType="submit">Create Account</Button>
                </Form.Item>
            </Form>
            <Typography.Paragraph>
                <span className="text-gray-800 text-xs md:text-sm md:text-gray-500 text-center py-4 text-balance">
                    By continuing, you agree to the DineHub terms of use, and the Privacy Notice. This site uses essential cookies. See our Cookie Notice for more information.
                </span>
            </Typography.Paragraph>
            <Typography.Paragraph>
                Already have an account?{" "}
                <Link href="/login">Login</Link>
            </Typography.Paragraph>
            <Divider style={{ borderColor: '#BBBCBB' }}>or</Divider>
            <SocialLogin />
        </Content>
    );
};

export default RegisterComponent;