import WithSuspense from '@/components/WithSuspense';
import ProductsTable from '@/components/adminPanel/ProductsTable'
import React, { Suspense } from 'react'

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

// Function to generate random string (for id)
const generateRandomString = (length: number) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

// Sample data generation
const products: Product[] = [
  {
    id: generateRandomString(10),
    key: generateRandomString(10),
    name: "Product 1",
    price: Math.floor(Math.random() * 10000), // price in cents
    imagePath: "/images/product1.jpg",
    description: "Description for Product 1",
    isAvailableForPurchase: Math.random() < 0.5,
    createdAt: new Date(),
  },
  {
    id: generateRandomString(10),
    key: generateRandomString(10),
    name: "Product 2",
    price: Math.floor(Math.random() * 10000), // price in cents
    imagePath: "/images/product2.jpg",
    description: "Description for Product 2",
    isAvailableForPurchase: Math.random() < 0.5,
    createdAt: new Date(),
  }
];

const ProductManagement = async () => {
  return ( 
    <WithSuspense>
      <ProductsTable products={products} />
    </WithSuspense>
  )
}

export default ProductManagement