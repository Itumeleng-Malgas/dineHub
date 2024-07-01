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
   // State to keep track of favorite restaurants
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Fetch favorite restaurants from the server when the component mounts
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

     // If it is a favorite, send a DELETE request to remove it from favorites
    if (isFavorite) {
      await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: restaurant.id }),
      });
       // Remove the restaurant from the favorite set
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.delete(restaurant.id);
        return newFavorites;
      });
    } else {
      // If it is not a favorite, send a POST request to add it to favorites
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: restaurant.id }),
      });
      setFavorites((prev) => new Set(prev).add(restaurant.id));
    }
  };

  return (
    // Render the restaurant list using antd's Row and Col components
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
