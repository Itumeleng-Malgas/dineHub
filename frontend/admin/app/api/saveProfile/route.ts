import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const filePath = path.join(process.cwd(), 'data', 'restaurantProfile.json');

  try {
    const data = await request.json();
    console.log(data)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ message: 'Profile saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
