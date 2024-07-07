// src/app/restaurants/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import RestaurantList from '@/components/RestaurantList';
import { Restaurant } from '@/components/data/restaurants';
import { useRouter } from 'next/navigation';

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const router = useRouter();
  

  useEffect(() => {
    fetch('/api/restaurants')
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    router.push(`/restaurant/${restaurant.id}`);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Restaurants</h1>
      <RestaurantList restaurants={restaurants} onRestaurantClick={handleRestaurantClick} />
    </div>
  );
};

export default RestaurantsPage;
