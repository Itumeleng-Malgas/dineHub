"use client";

import React from 'react';
import { Table, Button, Space } from 'antd';
import { OrdersTableProps, Order, OrderedItem } from '@/types/orderTypes';

const columns: any = [
  {
    title: 'ORDER',
    dataIndex: 'order_no',
    key: 'order_no',
    sorter: (a: Order, b: Order) => a.order_no - b.order_no,
  },
  {
    title: 'ORDERED ITEMS',
    dataIndex: 'items',
    key: 'items',
    responsive: ['lg'],
    render: (items: OrderedItem[]) => (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} (x{item.quantity})
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'ACTIONS',
    key: 'actions',
    render: (_: any, record: Order) => (
      <Space size="middle">
        <Button type="primary" onClick={() => handleAccept(record.key)}>Accept</Button>
        <Button danger onClick={() => handleCancel(record.key)}>Cancel</Button>
        <Button style={{background: '#7AE582'}} type='default' onClick={() => handleReady(record.key)}>Ready</Button>
      </Space>
    ),
  },
];

const handleAccept = (key: string) => {
  console.log('Accepted order with key:', key);
  // Add your accept logic here
};

const handleCancel = (key: string) => {
  console.log('Cancelled order with key:', key);
  // Add your cancel logic here
};

const handleReady = (key: string) => {
  console.log('Ready order with key:', key);
  // Add your cancel logic here
};

const OrdersTable: React.FC<OrdersTableProps> = ({ data, loading }) => {
  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <Table
        style={{ flex: 1 }}
        columns={columns}
        loading={loading}
        dataSource={data}
        pagination={{
          defaultPageSize: 6,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15', '20'],
        }}
      />
    </div>
  );
};

export default OrdersTable;