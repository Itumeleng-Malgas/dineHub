"use client"
import { Product } from '@/app/(adminPanel)/admin/products/page';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button,  Dropdown, MenuProps, Table, message } from 'antd'
import React from 'react'

interface ProductsTableProps {
    products: Product[];
  }

  const handleEdit = (key: string) => {
    console.log('Edit:', key);
    // Add your Edit logic here use
  };
  
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button icon={<EditOutlined/>} type='link'>Edit</Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button icon={<CheckCircleOutlined />} type='link'>Activate</Button>
      ),
    },
    {
      key: '3',
      label: (
        <Button danger icon={<DeleteOutlined />} type='link'>Delete</Button>
      ),
    },
  ];

  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.createdAt.getTime() - b.createdAt.getTime(),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, record: any) => {
        //console.log(text, record.key)
        return(
          <Dropdown className='text-2xl' menu={{ items }} placement="bottomLeft">
            <MoreOutlined />
          </Dropdown>
        )
      }
    },
  ];

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
    return (
        <Table
          style={{ flex: 1 }}
          columns={columns}
          dataSource={products}
          pagination={{
            defaultPageSize: 6,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
          }}
        />
    )
}

export default ProductsTable