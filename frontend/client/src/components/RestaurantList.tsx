'use client';
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import RestaurantCard from '@/components/restaurantCard';
import { Restaurant } from '@/components/data/restaurants';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRestaurantClick }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const handleFavoriteClick = (restaurant: Restaurant) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(restaurant.id)) {
        newFavorites.delete(restaurant.id);
      } else {
        newFavorites.add(restaurant.id);
      }
      return newFavorites;
    });
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
