'use client'
import { Layout, Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import FooterComponent from '@/components/Layout/Footer';
import SearchBar from '@/components/SearchBar';
import RestaurantList from '@/components/RestaurantList';
import RestaurantModal from '@/components/restaurantModel';
import { Restaurant } from '../components/data/restaurants';
import { mockRestaurants } from '../components/data/restaurants';
import NavBar from '@/components/Layout/navBar';

const { Header, Content, Footer } = Layout;

export default function Home() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Content style={{ padding: '50px', textAlign: 'center', zIndex: 10, position: 'relative', marginTop: '64px' }}>
        <SearchBar />
        <RestaurantList restaurants={mockRestaurants} onRestaurantClick={showModal} />
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#41467e', color: 'white' }}>
        <FooterComponent />
      </Footer>
      <RestaurantModal restaurant={selectedRestaurant} isVisible={isModalVisible} onClose={handleCancel} />
    </Layout>
  );
}