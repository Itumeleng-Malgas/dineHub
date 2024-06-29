'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, DatePicker, TimePicker } from 'antd';

const BookingPage: React.FC = () => {
  const router = useRouter();

  const handleBooking = (values: any) => {
    console.log('Booking Details:', values);
    // Add logic to send booking details to the backend when it's ready
    router.push('/confirmation'); // Redirect to a confirmation page after booking
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Book a Table</h1>
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Book Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingPage;
