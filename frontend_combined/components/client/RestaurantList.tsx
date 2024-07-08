'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { Restaurant } from '@/data/restaurants';
import { useSession } from 'next-auth/react';
import RestaurantCard from './restaurantCard';
import axios from 'axios';
import RestaurantModal from './restaurantModel';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRestaurantClick }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const { data: session } = useSession();
  const userId = session?.user.id;

  if (!Array.isArray(restaurants)) {
    return <div>No restaurants available</div>; // Placeholder or error message
  }

  const handleFavoriteClick = async (restaurant: Restaurant) => {
    const isFavorite = favorites.has(restaurant.id);

  };

  return (
    <Row gutter={[16, 16]} className="mt-10">
      {restaurants.map((restaurant) => (
        <Col xs={24} sm={12} md={8} key={restaurant.id}>
          <RestaurantCard
            restaurant={restaurant}
            onClick={() => onRestaurantClick(restaurant)}
            isFavorite={favorites.has(restaurant.id)}
            onFavoriteClick={handleFavoriteClick}
          />
        </Col>
      ))}
    </Row>
  );
};

export default RestaurantList;