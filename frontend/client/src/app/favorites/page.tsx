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

  // Helper function to save favorites to local storage
  const saveFavoritesToLocal = (favorites: Restaurant[]) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  // Helper function to load favorites from local storage
  const loadFavoritesFromLocal = (): Restaurant[] => {
    const localFavorites = localStorage.getItem('favorites');
    return localFavorites ? JSON.parse(localFavorites) : [];
  };

  // Fetch favorites on page load from the backend or local storage
  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        try {
          const response = await fetch('/api/favorites', {
            headers: { 'user-id': userId }
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setFavorites(data.favorites);
          saveFavoritesToLocal(data.favorites); // Save fetched favorites to local storage
        } catch (error) {
          console.error('Fetching favorites failed:', error);
          setFavorites(loadFavoritesFromLocal()); // Load favorites from local storage if fetch fails
        }
      }
    };

    fetchFavorites();
  }, [userId]);

  const addToFavorites = async (restaurantId: number, userId: string) => {
    if (!userId) return;

    try {
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
      saveFavoritesToLocal(data.favorites); // Save updated favorites to local storage
    } catch (error) {
      console.error('Updating favorites failed:', error);
      // Optionally, handle the error by notifying the user or retrying
    }
  };

  const handleFavoriteClick = async (restaurant: Restaurant) => {
    if (!userId) return;

    const isFavorite = favorites.some(fav => fav.id === restaurant.id);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== restaurant.id);
      setFavorites(updatedFavorites);
      saveFavoritesToLocal(updatedFavorites); // Save updated favorites to local storage

      try {
        await fetch('/api/favorites', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'user-id': userId
          },
          body: JSON.stringify({ id: restaurant.id }),
        });
      } catch (error) {
        console.error('Removing favorite failed:', error);
        // Optionally, handle the error by notifying the user or retrying
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
