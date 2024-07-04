'use client';

import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Country, State, City } from 'country-state-city';
import RestaurantList from './RestaurantList';
import { Restaurant } from './data/restaurants';
import { mockRestaurants } from './data/restaurants';
import axios from 'axios';

const { Option } = Select;

export interface SearchCriteria {
  restaurantNameCuisine: string;
  location: {
    selectedCountry: string;
    selectedState: string;
    selectedCity: string;
  };
}

interface SearchBarProps {
  onSearch: (searchCriteria: SearchCriteria) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [restaurantNameCuisine, setRestaurantNameCuisine] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // Fills the states dropdown with the states of the selected country
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Fetches states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    }
  }, [selectedCountry]);

  // Fetches cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedCountry, selectedState]);

  const checkBackendAvailability = async () => {
    try {
      const response = await axios.get('/api/healthcheck'); // Replace with your backend health check endpoint
      return response.status === 200;
    } catch (error) {
      console.error('Backend is not available:', error);
      return false;
    }
  };

  // Handle search button click
  const handleSearch = async () => {
    const searchCriteria: SearchCriteria = {
      restaurantNameCuisine,
      location: { selectedCountry, selectedState, selectedCity }
    };

    const isBackendAvailable = await checkBackendAvailability();

    if (isBackendAvailable) {
      try {
        // Send search criteria to the server
        const response = await axios.post('/api/search', searchCriteria);
        const filteredRestaurants = response.data;

        setRestaurants(filteredRestaurants); // Update the state with the restaurants from the backend
        onSearch(searchCriteria); // Trigger the onSearch callback with search criteria
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    } else {
      console.warn('Using mock data due to backend unavailability');
      // Filter mock restaurants based on search criteria
      const filteredRestaurants = mockRestaurants.filter((restaurant) => {
        const matchesNameCuisine = restaurant.name
          .toLowerCase()
          .includes(restaurantNameCuisine.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(restaurantNameCuisine.toLowerCase());

        const matchesLocation = restaurant.city === selectedCity ||
          restaurant.state === selectedState ||
          restaurant.country === selectedCountry;

        return matchesNameCuisine && matchesLocation;
      });

      setRestaurants(filteredRestaurants); // Update the state with the filtered mock restaurants
      onSearch(searchCriteria); // Trigger the onSearch callback with search criteria
    }
  };

  // Define the function to handle restaurant clicks
  const handleRestaurantClick = (restaurant: Restaurant) => {
    console.log(`Restaurant with ID ${restaurant.id} clicked`);
    // Implement the logic for handling restaurant clicks, e.g., navigating to a restaurant detail page
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">From Casual Eats to Fine Dining: Reserve Your Perfect Spot!</h1>
      <Row gutter={[16, 16]} className="mt-5">
        <Col xs={24} md={12}>
          <Input
            size="large"
            placeholder="Search for restaurants, cuisines, etc."
            value={restaurantNameCuisine}
            onChange={(e) => setRestaurantNameCuisine(e.target.value)}
            className="w-full"
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col xs={24} md={4}>
          <Select
            showSearch
            placeholder="Country"
            size="large"
            value={selectedCountry}
            onChange={(value) => setSelectedCountry(value)}
            className="w-full"
          >
            {countries.map((country) => (
              <Option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={4}>
          <Select
            showSearch
            placeholder="State"
            size="large"
            value={selectedState}
            onChange={(value) => setSelectedState(value)}
            className="w-full"
            disabled={!selectedCountry}
          >
            {states.map((state) => (
              <Option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={4}>
          <Select
            showSearch
            placeholder="City"
            size="large"
            value={selectedCity}
            onChange={(value) => setSelectedCity(value)}
            className="w-full"
            disabled={!selectedState}
          >
            {cities.map((city) => (
              <Option key={city.name} value={city.name}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Button
        type="primary"
        size="large"
        className="mt-5"
        onClick={handleSearch}
        icon={<SearchOutlined />}
      >
        Search
      </Button>
      <RestaurantList
        restaurants={restaurants}
        onRestaurantClick={handleRestaurantClick}
      />
    </div>
  );
};

export default SearchBar;
