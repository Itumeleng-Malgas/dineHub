'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form, Input, DatePicker, TimePicker, InputNumber, message } from 'antd';
import { mockRestaurants } from '@/data/restaurants';
import Image from 'next/image';
import axios from 'axios';

const BookingPage: React.FC = () => {
  const { restaurantId } = useParams();
  const router = useRouter();
  const id = Array.isArray(restaurantId) ? restaurantId[0] : restaurantId;
  const restaurant = mockRestaurants.find(r => r.id === parseInt(id, 10));

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  // Handle the booking form submission
  const handleBooking = async (values: any) => {
    try {
      console.log('handleBooking called with values:', values);
      
      // Send booking details to the backend
      await axios.post('/api/booking', {
        ...values,
        restaurantId: id,
      });

      // Simulate a successful booking without making a network request
      message.success('Booking successful');
      
      // Redirect to the restaurant's page after booking
      router.push(`/restaurants/${id}?booking=success`);
    } catch (error) {
      console.error('Error booking:', error);
      message.error('Error booking');
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white dark:gl-state-dark shadow-lg rounded-lg w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-48 md:h-auto">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              style={{ objectFit: 'cover' }}
              className='rounded-t-lg md:rounded-l-lg md:rounded-t-none'
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl mb-4 font-bold text-black">Book a Table at {restaurant.name}</h1>
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
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
