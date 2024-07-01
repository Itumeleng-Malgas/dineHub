// pages/api/restaurant-profile.ts

import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch the restaurant profile from your database
    const restaurantProfile = {
      restaurantName: 'Test Restaurant',
      email: 'test@example.com',
      address: '123 Main St',
      phone: '123-456-7890',
      cuisine: 'italian',
      description: 'A great place to eat!',
    };
    res.status(200).json(restaurantProfile);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'PUT') {
    const { restaurantName, email, address, phone, cuisine, description } = req.body;

    // Update the restaurant profile in your database
    // Example: await updateRestaurantProfile({ restaurantName, email, address, phone, cuisine, description });

    res.status(200).json({ message: 'Profile updated successfully' });
  } else if (req.method === 'GET') {
    // Fetch the restaurant profile from your database
    const restaurantProfile = {
      restaurantName: 'Test Restaurant',
      email: 'test@example.com',
      address: '123 Main St',
      phone: '123-456-7890',
      cuisine: 'italian',
      description: 'A great place to eat!',
    };
    res.status(200).json(restaurantProfile);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;