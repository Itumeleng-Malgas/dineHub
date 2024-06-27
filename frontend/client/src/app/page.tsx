'use client';
import { Layout } from 'antd';
import React, { useState } from 'react';
import FooterComponent from '@/components/Layout/Footer';
import SearchBar, { SearchCriteria } from '@/components/SearchBar';
import RestaurantList from '@/components/RestaurantList';
import RestaurantModal from '@/components/restaurantModel';
import { Restaurant } from '../components/data/restaurants';
import { mockRestaurants } from '../components/data/restaurants';

const { Header, Content, Footer } = Layout;

export default function Home() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);

  const showModal = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = ({ restaurantName, cuisine, location }: SearchCriteria) => {
    const { selectedCountry, selectedState, selectedCity } = location;
    const filtered = mockRestaurants.filter((restaurant) => {
      return (
        (restaurantName ? restaurant.name.toLowerCase().includes(restaurantName.toLowerCase()) : true) &&
        (cuisine ? restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase()) : true) &&
        (selectedCountry ? restaurant.country === selectedCountry : true) &&
        (selectedState ? restaurant.state === selectedState : true) &&
        (selectedCity ? restaurant.city === selectedCity : true)
      );
    });
    setFilteredRestaurants(filtered);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Content style={{ padding: '50px', textAlign: 'center', zIndex: 10, position: 'relative', marginTop: '64px' }}>
        <SearchBar onSearch={handleSearch} />
        <RestaurantList restaurants={filteredRestaurants} onRestaurantClick={showModal} />
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#41467e', color: 'white' }}>
        <FooterComponent />
      </Footer>
      <RestaurantModal restaurant={selectedRestaurant} isVisible={isModalVisible} onClose={handleCancel} />
    </Layout>
  );
}
