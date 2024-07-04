import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), 'data', 'restaurantProfile.json');

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    return NextResponse.json(parsedData, { status: 200 });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}