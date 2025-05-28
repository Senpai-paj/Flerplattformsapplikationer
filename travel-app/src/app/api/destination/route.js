import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get ('q');
    const getDetails = searchParams.get('details') === 'true';


    if (!query) {
        return NextResponse.json({error: 'Query parameter is required'}, { status: 400 });        
    }


    try {
        //Get the place and recieve the coordinates
        const geoUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(query)}&apikey=${process.env.OPENTRIPMAP_API_KEY}`;
        const geoResponse = await fetch(geoUrl);

        if (!geoResponse.ok) {
            throw new Error(`Failed to fetch from OpenTripMap`);
        }

        const geoData = await geoResponse.json();
       

        if (!geoData.lat || !geoData.lon) {
            return NextResponse.json({
                error: 'Location not found',
                searched: query,
            }, { status: 404 });
        }

    }
}
