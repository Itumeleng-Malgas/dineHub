'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { mockRestaurants } from '@/data/restaurants';
import Image from 'next/image';
import { message } from 'antd';
//import RestaurantCard from '@/components/restaurantCard';

const RestaurantPage: React.FC = () => {
  const { id } = useParams();
  const restaurantId = Array.isArray(id) ? id[0] : id;
  const restaurant = mockRestaurants.find(r => r.id === parseInt(restaurantId, 10));

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('booking') === 'success') {
      message.success('Your booking was successful!');
    }
  }, []);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-48 md:h-auto">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              style={{ objectFit: 'cover' }}
              className='rounded-t-lg md:rounded-l-lg md:rounded-t-none'
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl mb-4 font-bold text-black">{restaurant.name}</h1>
            <p className="text-black">{restaurant.description}</p>
            <p className="text-black"><strong>Location:</strong> {restaurant.location}</p>
            <p className="text-black"><strong>Contact:</strong> {restaurant.contact}</p>
            
            {/* Add more details about the restaurant */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
