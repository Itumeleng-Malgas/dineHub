// app/client/restaurants/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import RestaurantList from '@/components/client/RestaurantList';
import { Restaurant } from '@/data/restaurants';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/restaurants')
      .then((response) => setRestaurants(response.data))
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
