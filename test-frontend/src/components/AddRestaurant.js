// src/components/AddRestaurant.js
import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact_info, setContactInfo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/restaurants', {
      name,
      location,
      contact_info
    })
      .then(response => {
        console.log('Restaurant added:', response.data);
      })
      .catch(error => {
        console.error('There was an error adding the restaurant!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label>Contact Info</label>
        <input
          type="text"
          value={contact_info}
          onChange={(e) => setContactInfo(e.target.value)}
        />
      </div>
      <button type="submit">Add Restaurant</button>
    </form>
  );
}

export default AddRestaurant;
