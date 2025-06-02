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

        // Different types of attractions
        const radius = 8000; 
        const attractionTypes = [
            'museums,cultural,historic,religion,architecture',
            'interesting_places'
        ];

        let allAttractions = [];

        for (const kinds of attractionTypes) {
            try {
                const attractionsUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${geoData.lon}&lat=${geoData.lat}&kinds=${kinds}&format=json&limit=15&apikey=${process.env.OPENTRIPMAP_API_KEY}`;
                const attractionsResponse = await fetch(attractionsUrl);

                if (attractionsResponse.ok) {
                    const attractionsData = await attractionsResponse.json();
                    if (attractionsData && Array.isArray(attractionsData)) {
                        allAttractions.push(...attractionsData);
                    }
                }
                
                // Small delay
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                console.warn(`Failed to fetch attractions for ${kinds}:`, error.message);
            }
        }

        // Remove duplicates and sort by rating
        const uniqueAttractions = allAttractions.filter((attraction, index, self) => 
            index === self.findIndex(a => a.xid === attraction.xid)
        );

        const sortedAttractions = uniqueAttractions
            .filter(attraction => attraction.rate !== undefined && attraction.rate > 2) 
            .sort((a, b) => (b.rate || 0) - (a.rate || 0))
            .slice(0, 8); 

        const detailedAttractions = [];

        for (const attraction of sortedAttractions) {
            if (attraction.xid) {
                try {
                    const detailUrl = `https://api.opentripmap.com/0.1/en/places/xid/${attraction.xid}?apikey=${process.env.OPENTRIPMAP_API_KEY}`;
                    const detailResponse = await fetch(detailUrl);
                    
                    if (detailResponse.ok) {
                        const detailData = await detailResponse.json();
                        
                        
                        if (detailData.name && detailData.name.trim() && detailData.name.length > 3) {
                            
                            let description = 'No description available';
                            
                            // Try to get description from Wikipedia
                            if (detailData.wikipedia_extracts && detailData.wikipedia_extracts.text) {
                                description = detailData.wikipedia_extracts.text;
                            } else if (detailData.info && detailData.info.descr) {
                                description = detailData.info.descr;
                            }

                            detailedAttractions.push({
                                name: detailData.name,
                                description: description,
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
                    
                    // Add delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 150));
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
            totalAttractionsFound: uniqueAttractions.length
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