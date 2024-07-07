import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Country, State, City } from 'country-state-city';
import RestaurantList from './RestaurantList';
import RestaurantModal from './restaurantModel';
import { Restaurant } from './data/restaurants';
import { mockRestaurants } from './data/restaurants';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const router = useRouter();

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
      const response = await axios.get('/api/healthcheck'); 
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
        const response = await axios.post('/api/search', searchCriteria);
        const filteredRestaurants = response.data;
        setRestaurants(filteredRestaurants);
        onSearch(searchCriteria);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    } else {
      console.warn('Using mock data due to backend unavailability');
      const filteredRestaurants = mockRestaurants.filter((restaurant) => {
        const matchesNameCuisine = restaurant.name.toLowerCase().includes(restaurantNameCuisine.toLowerCase()) || restaurant.cuisine.toLowerCase().includes(restaurantNameCuisine.toLowerCase());
        const matchesLocation = restaurant.city === selectedCity || restaurant.state === selectedState || restaurant.country === selectedCountry;
        return matchesNameCuisine && matchesLocation;
      });
      setRestaurants(filteredRestaurants);
      onSearch(searchCriteria);
    }
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
    setIsModalVisible(false);
  };

  return (
    <div className="max-w-4xl mx-auto search-container">
      <h1 className="text-3xl text-black font-bold search-header ">
        From Casual Eats to Fine Dining: Reserve Your Perfect Spot!
      </h1>
      <Row gutter={[16, 16]} className="mt-5">
        <Col xs={24} md={12}>
          <Input
            size="large"
            placeholder="Search for restaurants, cuisines, etc."
            value={restaurantNameCuisine}
            onChange={(e) => setRestaurantNameCuisine(e.target.value)}
            className="w-full search-input"
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
            className="w-full search-select"
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
            className="w-full search-select"
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
            className="w-full search-select"
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
      <div className="search-button">
        <Button
          type="primary"
          size="large"
          onClick={handleSearch}
          icon={<SearchOutlined />}
        >
          Search
        </Button>
      </div>
      <RestaurantList
        restaurants={restaurants}
        onRestaurantClick={handleRestaurantClick}
      />
      <RestaurantModal
        restaurant={selectedRestaurant}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SearchBar;
