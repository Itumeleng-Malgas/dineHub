// src/app/favorites/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import RestaurantCard from '@/components/restaurantCard';
import { Restaurant } from '@/components/data/restaurants';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await fetch('/api/favorites');
      const data = await response.json();
      setFavorites(data.favorites);
    };

    fetchFavorites();
  }, []);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    // Handle restaurant card click, if needed
  };

  const handleFavoriteClick = async (restaurant: Restaurant) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== restaurant.id);
    setFavorites(updatedFavorites);

    await fetch('/api/favorites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: restaurant.id }),
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Favorite Restaurants</h1>
      <Row gutter={[16, 16]}>
        {favorites.map((restaurant) => (
          <Col xs={24} sm={12} md={8} key={restaurant.id}>
            <RestaurantCard
              restaurant={restaurant}
              onClick={handleRestaurantClick}
              isFavorite={true}
              onFavoriteClick={() => handleFavoriteClick(restaurant)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FavoritesPage;
