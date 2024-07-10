'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import { Restaurant } from '@/data/restaurants';
import { useSession } from 'next-auth/react';
import RestaurantCard from '@/components/client/restaurantCard';


const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Helper function to save favorites to local storage
  const saveFavoritesToLocal = (favorites: Restaurant[]) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  // Helper function to load favorites from local storage
  const loadFavoritesFromLocal = (): Restaurant[] => {
    const localFavorites = localStorage.getItem('favorites');
    return localFavorites ? JSON.parse(localFavorites) : [];
  };

  // Function to fetch favorites from the backend
  const fetchFavorites = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/api/v1/favorite/${userId}`);
        console.log('Fetched favorites:', response.data);

        if (Array.isArray(response.data)) {
          setFavorites(response.data);
          saveFavoritesToLocal(response.data); // Save fetched favorites to local storage
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error('Fetching favorites failed:', error);
        setFavorites(loadFavoritesFromLocal()); // Load favorites from local storage if fetch fails
      }
    }
  }, [userId]);

  // Function to add a restaurant to favorites
  const addToFavorites = async (restaurantId: string, userId: string) => {
    if (!userId) return;

    const dataToSend = {
      userId,
      restaurantId,
    };

    console.log('Adding to favorites:', dataToSend); // Log data being sent to the backend

    try {
      await axios.post('http://127.0.0.1:3001/api/v1/favorites', dataToSend, {
        headers: { 'Content-Type': 'application/json' }
      });
      await fetchFavorites(); // Refresh favorites after update
    } catch (error) {
      console.error('Adding to favorites failed:', error);
      // handle the error by notifying the user or retrying
    }
  };

  const handleFavoriteClick = async (restaurant: Restaurant) => {
    if (!userId) return;

    const isFavorite = favorites.some(fav => fav.restaurantId === restaurant.restaurantId);

    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.restaurantId !== restaurant.restaurantId);
      setFavorites(updatedFavorites);
      saveFavoritesToLocal(updatedFavorites); // Save updated favorites to local storage

      const dataToSend = {
        userId,
        restaurantId: restaurant.restaurantId,
      };

      console.log('Removing from favorites:', dataToSend); // Log data being sent to the backend

      try {
        await axios.delete('http://127.0.0.1:3001/api/v1/favorites', {
          data: dataToSend,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Removing favorite failed:', error);
        // Optionally, handle the error by notifying the user or retrying
      }
    } else {
      await addToFavorites(restaurant.restaurantId, userId);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId, fetchFavorites]);

  if (!userId) {
    return <div>Please log in to view your favorite restaurants.</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Favorite Restaurants</h1>
      <Row gutter={[16, 16]}>
        {favorites.map((restaurant) => (
          <Col xs={24} sm={12} md={8} key={restaurant.restaurantId}>
            <RestaurantCard
              restaurant={restaurant}
              onClick={() => {}}
              isFavorite={favorites.some(fav => fav.restaurantId === restaurant.restaurantId)}
              onFavoriteClick={() => handleFavoriteClick(restaurant)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FavoritesPage;
