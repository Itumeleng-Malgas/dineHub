import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, date, time, guests, restaurantId } = await req.json();

    // Here add code to save the booking to your database.
    // This is just a placeholder example.
    console.log('Booking details:', { name, email, date, time, guests, restaurantId });

    return NextResponse.json({ message: 'Booking successful' }, { status: 200 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ message: 'Booking failed' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'POST'
    }
  });
}