'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import RestaurantCard from '@/components/restaurantCard';
import { Restaurant } from '@/components/data/restaurants';
import { useUser } from '@clerk/nextjs';

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
    fetch('http://127.0.0.1:3001/api/v1/favorites',{method:"GET"})
      .then((res) => res.json())
      .then((data) => {
        if (data.favorites && Array.isArray(data.favorites)) {
          const favoriteIds = data.favorites.map((fav: Restaurant) => fav.id);
          setFavorites(new Set(favoriteIds));
        } else {
          setFavorites(new Set());
        }
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
        setFavorites(new Set());
      });
  }, []);

  
  // Ensure restaurants is an array before mapping
  if (!Array.isArray(restaurants)) {
    return <div>No restaurants available</div>; // Placeholder or error message
  }

  const handleFavoriteClick = async (restaurant: Restaurant) => {
    const isFavorite = favorites.has(restaurant.id);

    // If it is a favorite, send a DELETE request to remove it from favorites
    if (isFavorite) {
      await fetch('http://127.0.0.1:3001/api/v1/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'id': `${restaurant.id}` }),
      });
      // Remove the restaurant from the favorite set
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.delete(restaurant.id);
        return newFavorites;
      });
    } else {
      // If it is not a favorite, send a POST request to add it to favorites
      await fetch('http://127.0.0.1:3001/api/v1/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"restaurantId":"65ec072d-5463-40d4-830e-11c6b267afe8", "userId":userId}), // remember you hardcoded this line
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
