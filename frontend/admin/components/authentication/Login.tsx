"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Layout, Typography, Button, Form, Input, Divider, Checkbox, Spin } from "antd";
import SocialLogin from "@/components/authentication/SocialLogin";
import { FaLock } from "react-icons/fa";
import { loginValidationRules } from './_utils/validationRules';

import type { FormProps } from 'antd';
import { Login, openNotification } from './_utils/utils';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export type LoginFieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const { Content } = Layout;
const { Title } = Typography;

const LoginComponent = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish: FormProps<LoginFieldType>['onFinish'] = async (values) => {
        setLoading(true);
        const result = await signIn("credentials", { ...values, redirect: false });
        setLoading(false);
        if (result?.error) {
            openNotification(result.error);
        }
        if (result?.ok) {
            router.push('/admin');
        }
    };

    const onFinishFailed: FormProps<LoginFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Content className="text-center">
            <Title>Restaurant Login</Title>
            <Typography.Paragraph>
                Your Restaurant. Our Platform. Unlimited Reach.
            </Typography.Paragraph>

            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="email"
                    rules={loginValidationRules.email}
                >
                    <Input placeholder="Email" type="email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={loginValidationRules.password}
                >
                    <Input placeholder="Password" type="password" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <div className="flex justify-between">
                        <Checkbox>Remember me</Checkbox>
                        <Link href="/password">
                            <div className="flex items-center">
                                <FaLock /><span className="ml-1">Forgot password?</span>
                            </div>
                        </Link>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button className="w-full" type="primary" htmlType="submit" disabled={loading}>
                        {loading ? <Spin /> : 'Login'}
                    </Button>
                </Form.Item>
            </Form>
            <Typography.Paragraph>
                Don&apos;t have an account?{" "}
                <Link href="/register">Register</Link>
            </Typography.Paragraph>
            <Divider style={{ borderColor: '#BBBCBB' }}>login with</Divider>
            <SocialLogin />
        </Content>
    );
};

export default LoginComponent;