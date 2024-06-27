'use client';
import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { Country, State, City } from 'country-state-city';

const { Option } = Select;

export interface SearchCriteria {
  restaurantName: string;
  cuisine: string;
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedState]);

  const handleSearch = () => {
    onSearch({ restaurantName: searchQuery, cuisine: searchQuery, location: { selectedCountry, selectedState, selectedCity } });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">From Casual Eats to Fine Dining: Reserve Your Perfect Spot!</h1>
      <Row gutter={[16, 16]} className="mt-5">
        <Col xs={24} md={12}>
          <Input
            size="large"
            placeholder="Search for restaurants, cuisines, etc."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
    </div>
  );
};

export default SearchBar;