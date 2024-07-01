import React from 'react';
import OrdersTable from './OrdersTable';
import { Order } from '@/types/orderTypes';

const hardcoded: Order[] = [
  {
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
  },
];

async function getOrders() {
  let orders: Order[] = [];
  let loading = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //const response = await axios.get('https://api.example.com/orders');
    //orders = response.data.map((order: any, index: number) => ({
    orders = hardcoded.map((order: any, index: number) => ({
      order_no: order.order_no,
      key: String(index + 1),
      customer: order.customer,
      total: order.total,
      status: order.status,
      items: order.items,
    }));
    loading = false;

  } catch (error) {
    console.error('Error fetching the orders:', error);
    orders = [];
    loading = false;
  }
  
  return {
    orders,
    loading
  }
}

const DashboardComponent = async () => {
  const orders = await getOrders()
  
  return(<>
  <OrdersTable data={orders.orders} loading={orders.loading} />
  </>)
};

export default DashboardComponent;