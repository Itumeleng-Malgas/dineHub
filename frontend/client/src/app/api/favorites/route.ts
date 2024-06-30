
import { NextRequest, NextResponse } from 'next/server';
import { mockRestaurants } from '@/components/data/restaurants';
import { auth } from '@clerk/nextjs/server';

let userFavorites: { [key: string]: Set<number> } = {}; // Object to store user favorites

export async function GET(request: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'You must be logged in to view your favorites.' }, { status: 401 });
  }

  const favorites = userFavorites[userId] || new Set<number>();
  const favoriteRestaurants = mockRestaurants.filter((restaurant) => favorites.has(restaurant.id));
  return NextResponse.json({ favorites: favoriteRestaurants });
}

export async function POST(request: NextRequest) {

  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'You must be logged in to add favorites.' }, { status: 401 });
  }

  const { id } = await request.json();
  if (!userFavorites[userId]) {
    userFavorites[userId] = new Set<number>();
  }
  userFavorites[userId].add(id);

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'You must be logged in to remove favorites.' }, { status: 401 });
  }

  const { id } = await request.json();
  if (userFavorites[userId]) {
    userFavorites[userId].delete(id);
  }

  return NextResponse.json({ success: true });
}
