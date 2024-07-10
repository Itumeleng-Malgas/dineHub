"use client"
import WithSuspense from '@/components/WithSuspense';
import React, { useEffect, useState } from 'react';
import ProductsTable from '../../_component/ProductsTable';
import axios from 'axios';
import { BACKEND_URL } from '@/utils/configs';
import { Empty, message } from 'antd';
import { useSession } from 'next-auth/react';

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
  const restaurant_id = useSession().data?.user.id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/all_products/${restaurant_id}`);
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
  }, [restaurant_id]);

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