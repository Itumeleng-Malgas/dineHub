"use client";
import { Layout, Input, Button, Row, Col, Card } from 'antd';
import { EnvironmentOutlined, SearchOutlined, HeartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import FooterComponent from '@/components/Layout/Footer';
import { UploadButton } from '@/utils/uploadthing';
import Image from 'next/image';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const mockRestaurants = [
    {
        name: "House of Grill",
        description: "Best BBQ in town",
        location: "123 Main St, Sandton",
        imageUrl: "/sushi.jpeg",
    },
    {
        name: "Solo Pizza",
        description: "Authentic Italian pizza and pasta",
        location: "456 Maple St, Sandton",
        imageUrl: "/th.jpeg",
    },
    {
        name: "Sushi Spot",
        description: "Fresh sushi rolls and sashimi",
        location: "78 jan St, Sandton",
        imageUrl: "/mainpic.jpeg",
    },
    {
        name: "Pasta Paradise",
        description: "Delicious Italian pasta",
        location: "456 Elm St, Sandton",
        imageUrl: "/wine.jpeg",
    },
    {
        name: "Sushi World",
        description: "Fresh sushi and sashimi",
        location: "789 Oak St, Sandton",
        imageUrl: "th.jpeg",
    },
];

export default function Home() {
    return (
        <Layout className="min-h-screen">
            <Header className="flex justify-between items-center bg-white shadow-md p-4 z-10">
                <div className="text-indigo-900 font-bold text-xl">Restaurant Reservation</div>
                <Button type="primary" shape="round" icon={<HeartOutlined />} className="bg-indigo-900 border-indigo-900">
                    Favorites
                </Button>
            </Header>
            <Content className="p-12 text-center z-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4 text-indigo-900">From Casual Eats to Fine Dining: Reserve Your Perfect Spot!</h1>
                    <Row gutter={[16, 16]} className="mt-5">
                        <Col xs={24} md={8}>
                            <Input
                                size="large"
                                placeholder="Sandton"
                                prefix={<EnvironmentOutlined />}
                                className="w-full bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </Col>
                        <Col xs={24} md={16}>
                            <Search
                                size="large"
                                placeholder="Cuisine, restaurant name..."
                                enterButton={<Button type="primary" icon={<SearchOutlined />} className="bg-indigo-900 border-indigo-900" />}
                                className="w-full bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </Col>
                    </Row>
                </div>
                <Row gutter={[16, 16]} className="mt-10">
                    {mockRestaurants.map((restaurant, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card
                                hoverable
                                cover={<Image alt={restaurant.name} src={restaurant.imageUrl} />}
                                className="mb-5 shadow-md"
                            >
                                <Card.Meta
                                    title={restaurant.name}
                                    description={
                                        <div>
                                            <p className="text-gray-500">{restaurant.description}</p>
                                            <p className="text-gray-500">{restaurant.location}</p>
                                        </div>
                                    }
                                />
                                <Button type="primary" className="mt-4 bg-indigo-900 border-indigo-900">
                                    Book Tonight
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
            <Footer className="text-center bg-indigo-900 text-white p-4">
                <FooterComponent />
            </Footer>
        </Layout>
    );
}