// src/components/RestaurantList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/restaurants')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the restaurants!', error);
      });
  }, []);

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            {restaurant.name} - {restaurant.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
