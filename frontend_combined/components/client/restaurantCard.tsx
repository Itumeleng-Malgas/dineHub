// src/components/restaurantCard.tsx
'use client';
import React from 'react';
import { Card, Button } from 'antd';
import Image from 'next/image';
import { EnvironmentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Restaurant } from '@/data/restaurants';

// Props interface for the RestaurantCard component
interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
  isFavorite: boolean;
  onFavoriteClick: (restaurant: Restaurant) => void;
}

// RestaurantCard component
const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick, isFavorite, onFavoriteClick }) => {
  const router = useRouter();

  // Handle "Book Now" button click
  const handleBookNowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent element
    router.push(`/booking/${restaurant.id}`);
  };

  return (
    <Card
      hoverable
      cover={
        <div className="relative">
          <Image alt={restaurant.name} src={restaurant.imageUrl} width={100} height={200} className="w-full h-48 object-cover" />
          <div onClick={(e) => { e.stopPropagation(); onFavoriteClick(restaurant); }}>
            {isFavorite ? (
              <HeartFilled className="absolute top-2 right-2 text-white text-2xl bg-white bg-opacity-50 rounded-full p-2 cursor-pointer" />
            ) : (
              <HeartOutlined className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2 cursor-pointer" />
            )}
          </div>
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
            <p className="text-gray-500 "><EnvironmentOutlined className="mr-1" /> {restaurant.location}</p>
          </div>
        }
      />
      <Button type="primary" className="mt-4 bg-indigo-900 border-indigo-900" onClick={handleBookNowClick}>
        Book Tonight
      </Button>
    </Card>
  );
};

export default RestaurantCard;