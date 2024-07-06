import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Define the type for product data
interface ProductData {
  name: string;
  price: number;
  description: string;
  // Add more fields as needed
}

// Exported POST method for handling POST requests
export async function POST(request: NextRequest) {
  const method = request.method;

  if (method === 'POST') {
    return saveProduct(request);
  }

  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

// Function to save product data locally based on user's email
async function saveProduct(request: NextRequest) {
  // Assuming userEmail is retrieved from NextAuth or similar authentication mechanism
  const userEmail = request.headers.get('userEmail') || ''; // Replace with actual retrieval method

  // File path where product data will be stored
  const filePath = path.join(process.cwd(), 'data', 'products.json');

  try {
    // Read existing products from file or initialize an empty object
    let products: Record<string, ProductData[]> = {};
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      products = JSON.parse(fileData);
    }

    // Parse incoming product data from request body
    const productData: ProductData = await request.json();

    // Store product data in the hash table based on userEmail
    if (!products[userEmail]) {
      products[userEmail] = [];
    }
    products[userEmail].push(productData);

    // Write updated product data back to file
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Product saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}