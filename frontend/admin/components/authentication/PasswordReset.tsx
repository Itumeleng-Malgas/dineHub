"use client"
import React from 'react';
import { Layout, Typography, Button, Form, Input } from "antd";
import { passwordResetValidationRules } from './_utils/validationRules';
import Link from 'next/link';

const { Content } = Layout;
const { Title } = Typography;

const PasswordResetComponent = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Content className="text-center">
            <Title>Password Reset</Title>
            <Typography.Paragraph>
                Please enter your email to reset your password.
            </Typography.Paragraph>

            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="email"
                    rules={passwordResetValidationRules.email}
                >
                    <Input placeholder="Email" type="email" />
                </Form.Item>
                <Form.Item>
                    <Button className="w-full" type="primary" htmlType="submit">Reset Password</Button>
                </Form.Item>
            </Form>
            <Typography.Paragraph>
                Goto login?{" "}
                <Link href="/login">Login</Link>
            </Typography.Paragraph>
        </Content>
    );
};

export default PasswordResetComponent;