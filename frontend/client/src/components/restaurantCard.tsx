'use client';
import React from 'react';
import { Card, Button } from 'antd';
import Image from 'next/image';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Restaurant } from '@/components/data/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavoriteClick: (restaurant: Restaurant) => void;
  onClick: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, isFavorite, onFavoriteClick, onClick }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick(restaurant);
  };
  
  return (
    <Card
      hoverable
      cover={
        <div className="relative">
          <Image alt={restaurant.name} src={restaurant.imageUrl} width={300}
            height={200}  className="w-full h-48 object-cover" />
          {isFavorite ? (
            <HeartFilled
              className="absolute top-2 right-2 text-red-500 text-2xl bg-white bg-opacity-75 rounded-full p-2 cursor-pointer"
              onClick={handleFavoriteClick}
            />
          ) : (
            <HeartOutlined
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2 cursor-pointer"
              onClick={handleFavoriteClick}
            />
          )}
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
