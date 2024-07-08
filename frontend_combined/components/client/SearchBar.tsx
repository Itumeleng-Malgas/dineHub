"use client"
import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
import ResponsiveTitle from './ResponsiveTitle';

const { Title } = Typography;
const { Option } = Select;

interface DataState {
  countries: ICountry[];
  states: IState[];
  cities: ICity[];
}

const SearchBar = () => {
  const [data, setData] = useState<DataState>({
    countries: [],
    states: [],
    cities: []
  });

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      countries: Country.getAllCountries()
    }));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry);
      setData((prevState) => ({
        ...prevState,
        states,
        cities: [] // Reset cities when country changes
      }));
      setSelectedState(null); // Reset selected state
      setSelectedCity(null); // Reset selected city
    } else {
      setData((prevState) => ({
        ...prevState,
        states: [],
        cities: []
      }));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState(selectedCountry!, selectedState);
      setData((prevState) => ({
        ...prevState,
        cities
      }));
      setSelectedCity(null); // Reset selected city
    } else {
      setData((prevState) => ({
        ...prevState,
        cities: []
      }));
    }
  }, [selectedState, selectedCountry]);

  const { countries, states, cities } = data;

  return (
    <div style={{ width: '100%' }}>
        <ResponsiveTitle title="From Casual Eats to Fine Dining: Reserve Your Perfect Spot!" />
      <Row gutter={[16, 16]} className="mt-5" wrap={true}>
        <Col xs={24} lg={12} style={{ marginBottom: '16px' }}>
          <Input
            size="large"
            placeholder="Search for restaurants, cuisines, etc."
            className="w-full"
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col xs={24} lg={4} style={{ marginBottom: '16px' }}>
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
        <Col xs={24} lg={4} style={{ marginBottom: '16px' }}>
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
        <Col xs={24} lg={4} style={{ marginBottom: '16px' }}>
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
    </div>
  );
};

export default SearchBar;