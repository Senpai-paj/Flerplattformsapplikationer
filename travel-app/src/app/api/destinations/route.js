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

        let destinationDescription = null;

        try {
            const destinationSearchUrl = `https://api.opentripmap.com/0.1/en/places/autosuggest?name=${encodeURIComponent(query)}&radius=50000&lon=${geoData.lon}&lat=${geoData.lat}&kinds=countries,administrative,cities&limit=5&apikey=${process.env.OPENTRIPMAP_API_KEY}`;
            const destinationSearchResponse = await fetch(destinationSearchUrl);

            if (destinationSearchResponse.ok) {
                const destinationSearchData = await destinationSearchResponse.json();
                
                if (destinationSearchData.features && destinationSearchData.features.length > 0) {
                    const firstResult = destinationSearchData.features[0];
                    if (firstResult.properties && firstResult.properties.xid) {
                        const detailUrl = `https://api.opentripmap.com/0.1/en/places/xid/${firstResult.properties.xid}?apikey=${process.env.OPENTRIPMAP_API_KEY}`;
                        const detailResponse = await fetch(detailUrl);

                        if (detailResponse.ok) {
                            const detailData = await detailResponse.json();

                            if (detailData.wikipedia_extracts && detailData.wikipedia_extracts.text) {
                                destinationDescription = detailData.wikipedia_extracts.text;
                            } else if (detailData.info && detailData.info.descr) {
                                destinationDescription = detailData.info.descr;
                            }
                        }
                    }
                }
            }
        } catch (error) {

        }


        const radius = 5000; // 5km radius
        const attractionsUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${geoData.lon}&lat=${geoData.lat}&kinds=interesting_places&format=json&limit=20&apikey=${process.env.OPENTRIPMAP_API_KEY}`;

        const attractionsResponse = await fetch(attractionsUrl);

        if (!attractionsResponse.ok) {
            console.warn(`Failed to fetch attractions: ${attractionsResponse.status}`);
            // Return response with basic info but empty attractions array
            return NextResponse.json({
                name: geoData.name || query,
                country: geoData.country || 'Unknown',
                coordinates: {
                    lat: geoData.lat,
                    lon: geoData.lon
                },
                searched: query,
                attractions: [],
                totalAttractionsFound: 0,
                message: 'Location found but attractions data unavailable'
            });
    }   

        const attractionsData = await attractionsResponse.json();
        const detailedAttractions = [];
        const topAttractions = attractionsData.slice(0, 10); 


        for (const attraction of topAttractions) {
            if (attraction.xid) {
                try {
                    const detailUrl = `https://api.opentripmap.com/0.1/en/places/xid/${attraction.xid}?apikey=${process.env.OPENTRIPMAP_API_KEY}`;
                    const detailResponse = await fetch(detailUrl);
                    
                    if (detailResponse.ok) {
                        const detailData = await detailResponse.json();
                        
                        if (detailData.name && detailData.name.trim()) {
                            detailedAttractions.push({
                                name: detailData.name,
                                description: detailData.wikipedia_extracts?.text || detailData.info?.descr || 'No description available',
                                category: detailData.kinds || 'attraction',
                                coordinates: {
                                    lat: attraction.point?.lat || attraction.lat,
                                    lon: attraction.point?.lon || attraction.lon
                                },
                                rating: detailData.rate || 0,
                                wikipedia: detailData.wikipedia || null,
                                image: detailData.preview?.source || null
                            });
                        }
                    }
                    
                    // Add small delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 100));
                } catch (error) {
                    console.warn(`Failed to fetch details for attraction ${attraction.xid}:`, error.message);
                }
            }
        }


        const detailedResponse = {
            name: geoData.name || query,
            country: geoData.country || 'Unknown',
            coordinates: {
                lat: geoData.lat,
                lon: geoData.lon
            },
            searched: query,
            attractions: detailedAttractions,
            totalAttractionsFound: attractionsData.length
        };


        return NextResponse.json(detailedResponse);


    } catch (error) {
        console.error('An error for destinations API occurred', error);
        return NextResponse.json({
            error: 'Failed to fetch destination data',
            message: error.message,
            searched: query
        }, { status: 500 });
    }           
}
