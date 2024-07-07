import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, date, time, guests, restaurantId } = req.body;

      // Here add code to save the booking to your database.
      // This is just a placeholder example.
      console.log('Booking details:', { name, email, date, time, guests, restaurantId });

      res.status(200).json({ message: 'Booking successful' });
    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({ message: 'Booking failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
