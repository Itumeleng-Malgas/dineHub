'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import RestaurantCard from '@/components/restaurantCard';
import { Restaurant } from '@/components/data/restaurants';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRestaurantClick }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch('/api/favorites')
      .then((res) => res.json())
      .then((data) => {
        const favoriteIds = data.favorites.map((fav: Restaurant) => fav.id);
        setFavorites(new Set(favoriteIds));
      });
  }, []);

  const handleFavoriteClick = async (restaurant: Restaurant) => {
    const isFavorite = favorites.has(restaurant.id);

    if (isFavorite) {
      await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: restaurant.id }),
      });
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.delete(restaurant.id);
        return newFavorites;
      });
    } else {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: restaurant.id }),
      });
      setFavorites((prev) => new Set(prev).add(restaurant.id));
    }
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
