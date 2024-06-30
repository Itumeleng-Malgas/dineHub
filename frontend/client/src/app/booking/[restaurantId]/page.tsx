// src/app/booking/[restaurantId]/page.tsx
'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Button, Form, Input, DatePicker, TimePicker, InputNumber } from 'antd';
import { mockRestaurants } from '@/components/data/restaurants';

const BookingPage: React.FC = () => {
  const { restaurantId } = useParams();
  const id = Array.isArray(restaurantId) ? restaurantId[0] : restaurantId;
  const restaurant = mockRestaurants.find(r => r.id === parseInt(id, 10));

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }
  const handleBooking = async (values: any) => {
    try {
      console.log('handleBooking called with values:', values);
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        // Booking successful, you can display a success message or redirect the user to a confirmation page
        console.log('Booking successful');
      } else {
        console.error('Booking failed');
      }
    } catch (error) {
      console.error('Error booking:', error);
    }
  };
 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Book a Table at {restaurant.name}</h1>
      <Form onFinish={handleBooking}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please select a time' }]}>
          <TimePicker use12Hours format="h:mm a" />
        </Form.Item>
        <Form.Item name="guests" label="Guests" rules={[{ required: true, message: 'Please enter the number of guests' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4 bg-indigo-900 text-white p-2 rounded">
            Book Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingPage;
