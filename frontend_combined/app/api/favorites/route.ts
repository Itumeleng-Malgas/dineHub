
import { NextRequest, NextResponse } from 'next/server';
import { mockRestaurants } from '@/data/restaurants';
import { useSession } from 'next-auth/react';

let userFavorites: { [key: string]: Set<number> } = {}; // Object to store user favorites

// 1. GET /api/favorites
export async function GET(request: NextRequest) {
  const { data: session } = useSession()
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: 'You must be logged in to view your favorites.' }, { status: 401 });
  }

  const favorites = userFavorites[userId] || new Set<number>();
  const favoriteRestaurants = mockRestaurants.filter((restaurant) => favorites.has(restaurant.id));
  return NextResponse.json({ favorites: favoriteRestaurants });
}

// 2. POST /api/favorites
export async function POST(request: NextRequest) {
  const { data: session } = useSession()
  const userId = session?.user.id;
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
  const { data: session } = useSession()
  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json({ error: 'You must be logged in to remove favorites.' }, { status: 401 });
  }

  const { id } = await request.json();
  if (userFavorites[userId]) {
    userFavorites[userId].delete(id);
  }

  return NextResponse.json({ success: true });
}
