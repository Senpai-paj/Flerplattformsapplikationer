import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
      {
        headers: {
          'Accept-Version': 'v1',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unsplash API error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
} 