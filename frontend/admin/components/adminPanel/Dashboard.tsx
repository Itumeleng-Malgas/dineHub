"use client"
import React, { useEffect, useState } from 'react';
import OrdersTable from './OrdersTable';
import { Order } from '@/types/orderTypes';

const hardcoded: Order[] = [
  /*{
    order_no: 1,
    key: '1',
    customer: 'John Doe',
    total: '100',
    status: 'Pending',
    items: [
      { name: 'Item 1', quantity: 1 },
      { name: 'Item 2', quantity: 2 },
    ],
  },
  {
    order_no: 2,
    key: '2',
    customer: 'John Doe',
    total: '100',
    status: 'Pending',
    items: [
      { name: 'Item 1', quantity: 1 },
      { name: 'Item 2', quantity: 2 },
    ],
  },*/
];

const getOrders = async () => {
  let orders: Order[] = [];
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    orders = hardcoded.map((order: any, index: number) => ({
      order_no: order.order_no,
      key: String(index + 1),
      customer: order.customer,
      total: order.total,
      status: order.status,
      items: order.items,
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

  return (
    <>
      <OrdersTable data={orders} loading={loading} onAcceptOrder={function (order: Order): void {
        throw new Error('Function not implemented.');
      } } onRejectOrder={function (order: Order): void {
        throw new Error('Function not implemented.');
      } } />
    </>
  );
};

export default DashboardComponent;
