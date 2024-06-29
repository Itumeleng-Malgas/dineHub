
import { NextRequest, NextResponse } from 'next/server';
import { mockRestaurants } from '@/components/data/restaurants';

let favorites = new Set<number>();

export async function GET() {
  const favoriteRestaurants = mockRestaurants.filter((restaurant) => favorites.has(restaurant.id));
  return NextResponse.json({ favorites: favoriteRestaurants });
}

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  favorites.add(id);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  favorites.delete(id);
  return NextResponse.json({ success: true });
}
