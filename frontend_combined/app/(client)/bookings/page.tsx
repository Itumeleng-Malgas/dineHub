'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { mockRestaurants } from '@/data/restaurants';
import RestaurantCard from '@/components/client/restaurantCard';

const BookingsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const bookedRestaurantId = searchParams.get('id');

  const restaurantsToShow = bookedRestaurantId
    ? mockRestaurants.filter(restaurant => restaurant.id === parseInt(bookedRestaurantId, 10))
    : mockRestaurants;

  const handleCardClick = (restaurant: any) => {
    // Navigate to restaurant details page
  };

  const handleFavoriteClick = (restaurant: any) => {
    // Implement favorite functionality here
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurantsToShow.map(restaurant => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onClick={handleCardClick}
          isFavorite={false} // Implement favorite logic
          onFavoriteClick={handleFavoriteClick}
        />
      ))}
    </div>
  );
};

export default BookingsPage;