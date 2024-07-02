// src/app/favorites/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import RestaurantCard from '@/components/restaurantCard';
import { Restaurant } from '@/components/data/restaurants';
import { useUser } from '@clerk/nextjs';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const { user } = useUser();
  const userId = user?.id;

  // fetch favorites on page load from the backend
  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        const response = await fetch('/api/favorites', {
          headers: { 'user-id': userId }
        });

        const data = await response.json();
        setFavorites(data.favorites);
      }
    };

    fetchFavorites();
  }, [userId]);

  const addToFavorites = async (restaurantId: number, userId: string) => {
    if (!userId) return;

    await fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId,
      },
      body: JSON.stringify({ id: restaurantId }),
    });
    const response = await fetch('/api/favorites', {
      headers: { 'user-id': userId }
    });

    const data = await response.json();
    setFavorites(data.favorites);
  };
  
  const handleFavoriteClick = async (restaurant: Restaurant) => {
    if (!userId) return;
    
    const isFavorite = favorites.some(fav => fav.id === restaurant.id);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== restaurant.id);
      setFavorites(updatedFavorites);

      if (userId) {
        await fetch('/api/favorites', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'user-id': userId
          },
          body: JSON.stringify({ id: restaurant.id }),
        });
      }
    } else {
      await addToFavorites(restaurant.id, userId);
    }
  };

  if (!userId) {
    return <div>Please log in to view your favorite restaurants.</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Favorite Restaurants</h1>
      <Row gutter={[16, 16]}>
        {favorites.map((restaurant) => (
          <Col xs={24} sm={12} md={8} key={restaurant.id}>
            <RestaurantCard
              restaurant={restaurant}
              onClick={() => {}}
              isFavorite={favorites.some(fav => fav.id === restaurant.id)}
              onFavoriteClick={handleFavoriteClick}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FavoritesPage;
