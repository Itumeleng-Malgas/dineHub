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

  // Function to fetch favorites from the backend
  const fetchFavorites = async () => {
    if (userId) {
      try {
        const response = await fetch(`http://127.0.0.1:3001/api/v1/favorite/${userId}`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Fetched favorites:', data); // Log the response
  
        if (Array.isArray(data)) {
          setFavorites(data);
          saveFavoritesToLocal(data); // Save fetched favorites to local storage
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error('Fetching favorites failed:', error);
        setFavorites(loadFavoritesFromLocal()); // Load favorites from local storage if fetch fails
      }
    }
  };
  

  // Function to add a restaurant to favorites
  const addToFavorites = async (restaurantId: number, userId: string) => {
    if (!userId) return;

    try {
      await fetch('http://127.0.0.1:3001/api/v1/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "restaurantId": restaurantId, "userId": userId }),
      });
      await fetchFavorites(); // Refresh favorites after update
    } catch (error) {
      console.error('Adding to favorites failed:', error);
      // handle the error by notifying the user or retrying
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
        await fetch('http://127.0.0.1:3001/api/v1/favorites', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
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

  useEffect(() => {
    if (userId) {
    fetchFavorites();
    }
  }, [userId]);

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
