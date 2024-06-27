'use client';
import React from 'react';
import { Row, Col } from 'antd';
import RestaurantCard from '@/components/restaurantCard';
import { Restaurant } from '@/components/data/restaurants';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRestaurantClick }) => {
  return (
    <Row gutter={[16, 16]} className="mt-10">
      {restaurants.map((restaurant, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <RestaurantCard restaurant={restaurant} onClick={onRestaurantClick} />
        </Col>
      ))}
    </Row>
  );
};

export default RestaurantList;
