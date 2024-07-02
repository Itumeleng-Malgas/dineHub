// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import AddRestaurant from './components/AddRestaurant';

const App = () => {
  return (
    <Router>
      <div>
        <h1>DineHub</h1>
        <Routes>
          <Route exact path="/" element={<RestaurantList />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
