"use client";
import React, { useEffect, useState } from 'react';
import OrdersTable from './OrdersTable';
import { Order } from '@/types/orderTypes';

const hardcoded: Order[] = [
  {
    order_no: 1,
    key: '1',
    customer: 'John Doe',
    time: '15:00',
    status: 'Pending',
    items: [
      { name: 'Item 1', quantity: 1 },
      { name: 'Item 2', quantity: 2 },
    ],
    booking_date: '2023-07-01',
    num_guests: 4,
  },
  {
    order_no: 2,
    key: '2',
    customer: 'Jane Doe',
    time: '15:00',
    status: 'Pending',
    items: [
      { name: 'Item 3', quantity: 1 },
      { name: 'Item 4', quantity: 2 },
    ],
    booking_date: '2023-07-02',
    num_guests: 2,
  },
];

const getOrders = async () => {
  let orders: Order[] = [];
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    orders = hardcoded.map((order: any, index: number) => ({
      ...order,
      key: String(index + 1),
    }));
  } catch (error) {
    console.error('Error fetching the orders:', error);
    orders = [];
  }
  return orders;
};

const DashboardComponent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getOrders();
      setOrders(ordersData);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleAcceptOrder = (order: Order) => {
    console.log('Accepted order:', order);
    // Add logic to handle accepting the order
  };

  const handleRejectOrder = (order: Order) => {
    console.log('Rejected order:', order);
    // Add logic to handle rejecting the order
  };

  return (
    <>
      <OrdersTable
        data={orders}
        loading={loading}
        onAcceptOrder={handleAcceptOrder}
        onRejectOrder={handleRejectOrder}
      />
    </>
  );
};

export default DashboardComponent;
