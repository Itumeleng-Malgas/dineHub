import React from 'react';
import { Table, Button, Dropdown, Menu, Space, Empty } from 'antd';
import { Order } from '@/types/orderTypes';
import { CheckOutlined, CloseOutlined, MoreOutlined } from '@ant-design/icons';

interface OrdersTableProps {
  data: Order[];
  loading: boolean;
  onAcceptOrder: (order: Order) => void;
  onRejectOrder: (order: Order) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ data, loading, onAcceptOrder, onRejectOrder }) => {
  const columns = [
    {
      title: 'Order No',
      dataIndex: 'order_no',
      key: 'order_no',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Order) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="accept" onClick={() => onAcceptOrder(record)}>
                  <Button type="link" icon={<CheckOutlined />}>
                    Accept
                  </Button>
                </Menu.Item>
                <Menu.Item key="reject" onClick={() => onRejectOrder(record)}>
                  <Button type="link" icon={<CloseOutlined />}>
                    Reject
                  </Button>
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type='default' size="large">
              <MoreOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <div className='initial__loading'/>;
  }

  if (data.length === 0) {
    return <Empty/>;
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
      }}
    />
  );
};

export default OrdersTable;
