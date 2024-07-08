"use client"
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import RestaurantList from './RestaurantList'
import { mockRestaurants, Restaurant } from '@/data/restaurants';
import RestaurantModal from './restaurantModel';
import { useRouter } from 'next/navigation';

export interface SearchCriteria {
    restaurantNameCuisine: string;
    location: {
      selectedCountry: string;
      selectedState: string;
      selectedCity: string;
    };
  }

const ClientContent = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);
    const router = useRouter()
  
    const showModal = (restaurant: Restaurant) => {
      //setSelectedRestaurant(restaurant);
      //setIsModalVisible(true);
      router.push(`/preview/${restaurant.id}`)

    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    const handleSearch = ({ restaurantNameCuisine, location }: SearchCriteria) => {
      const { selectedCountry, selectedState, selectedCity } = location;
      const filtered = mockRestaurants.filter((restaurant) => {
        return (
          (restaurantNameCuisine ? restaurant.name.toLowerCase().includes(restaurantNameCuisine.toLowerCase()) : true) &&
          (selectedCountry ? restaurant.country === selectedCountry : true) &&
          (selectedState ? restaurant.state === selectedState : true) &&
          (selectedCity ? restaurant.city === selectedCity : true)
        );
      });
      
      setFilteredRestaurants(filtered);
    };
  return (
    <div className='flex flex-col items-center'>
        <SearchBar />
        <RestaurantList restaurants={filteredRestaurants} onRestaurantClick={showModal} />
        {/*<RestaurantModal restaurant={selectedRestaurant} isVisible={isModalVisible} onClose={handleCancel} />*/}
    </div>
  )
}

export default ClientContent