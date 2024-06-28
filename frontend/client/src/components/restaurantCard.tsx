'use client';
import React from 'react';
import { Card, Button } from 'antd';
import Image from 'next/image';
import { HeartOutlined } from '@ant-design/icons';
import { Restaurant } from '@/components/data/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <Card
      hoverable
      cover={
        <div className="relative">
          <Image alt={restaurant.name} src={restaurant.imageUrl} className="w-full h-48 object-cover" />
          <HeartOutlined className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2 cursor-pointer" />
        </div>
      }
      className="mb-5 shadow-md"
      onClick={() => onClick(restaurant)}
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
  );
};

export default RestaurantCard;
