'use client';
import React from 'react';
import { Input, Row, Col } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">From Casual Eats to Fine Dining: Reserve Your Perfect Spot!</h1>
      <Row gutter={[16, 16]} className="mt-5">
        <Col xs={24} md={8}>
          <Input
            size="large"
            placeholder="Sandton"
            prefix={<EnvironmentOutlined />}
            className="w-full"
          />
        </Col>
        <Col xs={24} md={16}>
          <Search
            size="large"
            placeholder="Cuisine, restaurant name..."
            enterButton="Search"
            className="w-full"
          />
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
