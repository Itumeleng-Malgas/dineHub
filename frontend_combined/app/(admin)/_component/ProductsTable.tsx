"use client";
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Empty, MenuProps, Table, message } from 'antd';
import React, { useState } from 'react';
import { Product } from '../admin/products/page';
import { useToggle } from '@/context/toggleContext';
import AddFormModal from '@/components/admin/AddFormModal';

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const { isTrue, toggleState } = useToggle();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditMode(true);
    toggleState();
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button icon={<EditOutlined />} type='link' onClick={() => handleEdit(selectedProduct as Product)}>Edit</Button>
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
      render: (text: any, record: Product) => {
        return (
          <Dropdown className='text-2xl' menu={{ items }} placement="bottomLeft">
            <MoreOutlined onClick={() => setSelectedProduct(record)} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => { setEditMode(false); toggleState(); }} style={{ marginBottom: 16 }}>
        Add New Product
      </Button>
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
      <AddFormModal editMode={editMode} initialValues={editMode ? selectedProduct : null} />
    </>
  );
};

export default ProductsTable;