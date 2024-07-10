"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { Layout, Typography, Button, Form, Input, Divider, FormProps, Select, Spin } from "antd";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { errorNotification, successNotification } from "@/utils/common";
import { registerValidationRules } from "@/utils/validationRules";
import SocialLogin from "./SocialLogin";

export type RegisterFieldType = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    restaurantName?: string;
};

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const RegisterComponent = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<string>("customer");

    const onFinish = async (values: RegisterFieldType) => {
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:3001/api/v1/restaurants', {
                "name": values.name,
                "email": values.email,
                "password": values.password,
                "role": values.role,
            });
            setLoading(false);
            if (response.status == 200) {
                successNotification("Registered", response.data.Message);
                router.push('/')
            }
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                errorNotification("Error Occurred", error.message)
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleRoleChange = (value: string) => {
        setSelectedRole(value);
    };

    return (
        <Content className="text-center">
            <Title>Create DineHub Account</Title>
            <Typography.Paragraph>
                Your Restaurant. Our Platform. Unlimited Reach.
            </Typography.Paragraph>

            <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="role"
                    rules={[{ required: true, message: 'Please select your role' }]}
                >
                    <Select placeholder="Select Role" onChange={handleRoleChange}>
                        <Option value="restaurant_owner">Restaurant Owner</Option>
                        <Option value="customer">Customer</Option>
                    </Select>
                </Form.Item>

                {(selectedRole === "restaurant_owner" || selectedRole === "customer") && (
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: selectedRole === "restaurant_owner" ? 'Please enter your restaurant name' : 'Please enter your name',
                            }
                        ]}
                    >
                        <Input
                            placeholder={selectedRole === "restaurant_owner" ? "Restaurant Name" : "Customer Name"}
                        />
                    </Form.Item>
                )}

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
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input placeholder="Confirm Password" type="password" />
                </Form.Item>

                <Form.Item>
                    <Button className="w-full" type="primary" htmlType="submit" disabled={loading}>
                        {loading ? <Spin /> : 'Create Account'}
                    </Button>
                </Form.Item>
            </Form>

            <Typography.Paragraph>
                <span className="text-gray-800 text-xs md:text-sm md:text-gray-500 text-center py-4 text-balance">
                    By continuing, you agree to the DineHub terms of use, and the Privacy Notice. This site uses essential cookies. See our Cookie Notice for more information.
                </span>
            </Typography.Paragraph>

            <Typography.Paragraph>
                Already have an account?{' '}
                <Link href="/api/auth/signin">Login</Link>
            </Typography.Paragraph>

            <Divider style={{ borderColor: '#BBBCBB' }}>or</Divider>
            <SocialLogin />
        </Content>
    );
};

export default RegisterComponent;