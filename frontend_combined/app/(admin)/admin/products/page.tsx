"use client"
import WithSuspense from '@/components/WithSuspense';
import React, { useEffect, useState } from 'react';
import ProductsTable from '../../_component/ProductsTable';
import axios from 'axios';
import { BACKEND_URL } from '@/utils/configs';
import { Empty, message } from 'antd';

export interface Product {
  id: string;
  key: string;
  name: string;
  price: number;
  imagePath: string;
  description: string;
  isAvailableForPurchase: boolean;
  createdAt: Date;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/products/9151309c-d9f7-466b-bb41-eb44331c7ce6`);
        if (response.status === 200) {
          const fetchedProducts = response.data.map((product: any) => ({
            ...product,
            key: product.id,
          }));
          setProducts(fetchedProducts);
        } else {
          message.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Empty />;
  }

  return (
    <WithSuspense>
      <ProductsTable products={products} />
    </WithSuspense>
  );
}

export default ProductManagement;