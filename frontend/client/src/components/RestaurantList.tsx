'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import RestaurantCard from '@/components/restaurantCard';
import { Restaurant } from '@/components/data/restaurants';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRestaurantClick }) => {
  // State to keep track of favorite restaurants
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const { user } = useUser();
  const userId = user?.id;

  // Fetch favorite restaurants from the server when the component mounts
  useEffect(() => {
    if (userId) {
      axios.get(`http://127.0.0.1:3001/api/v1/favorites/${userId}`)
        .then((response) => {
          const data = response.data;
          if (Array.isArray(data.favorites)) {
            //const favoriteIds = data.favorites.map((fav: Restaurant) => fav.restaurantId);
            const favoriteIds = data.map((fav: { restaurantId: number }) => fav.restaurantId);
            setFavorites(new Set(favoriteIds));
          } else {
            setFavorites(new Set());
          }
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error);
          setFavorites(new Set());
        });
    }
  }, [userId]);

  // Ensure restaurants is an array before mapping
  if (!Array.isArray(restaurants)) {
    return <div>No restaurants available</div>; // Placeholder or error message
  }

  const handleFavoriteClick = async (restaurant: Restaurant) => {
    if (!userId) return; // Ensure userId is available

    const isFavorite = favorites.has(restaurant.restaurantId);

    // If it is a favorite, send a DELETE request to remove it from favorites
    if (isFavorite) {
      try {
        await axios.delete('http://127.0.0.1:3001/api/v1/favorites', {
          data: { restaurantId: restaurant.restaurantId, userId },   //
          headers: { 'Content-Type': 'application/json' }
        });
        // Remove the restaurant from the favorite set
        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(restaurant.restaurantId);
          return newFavorites;
        });
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
    } else {
      // If it is not a favorite, send a POST request to add it to favorites
      try {
        await axios.post('http://127.0.0.1:3001/api/v1/favorites', {
          restaurantId: restaurant.restaurantId, //
          userId
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        setFavorites((prev) => new Set(prev).add(restaurant.restaurantId));
      } catch (error) {
        console.error('Error adding favorite:', error);
      }
    }
  };
  return (
    // Render the restaurant list using antd's Row and Col components
    <Row gutter={[16, 16]} className="mt-10">
      {restaurants.map((restaurant) => (
        <Col xs={24} sm={12} md={8} key={restaurant.restaurantId}>
          <RestaurantCard
            restaurant={restaurant}
            onClick={() => onRestaurantClick(restaurant)}
            isFavorite={favorites.has(restaurant.restaurantId)}
            onFavoriteClick={() => handleFavoriteClick(restaurant)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default RestaurantList;
