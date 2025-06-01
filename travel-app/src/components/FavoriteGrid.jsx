import React, { useEffect, useState } from "react";
import FavoriteCard from "./FavoriteCard";

export default function FavotiteGrid() {
   
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
        setTrips(storedTrips);
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {trips.length > 0 ? (
                trips.map((trip) => (
                    <FavoriteCard trip={trip} setTrips={setTrips}/>
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">No Trips Yet</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mb-6">
                        Start creating your dream trips! Go to the main page to search for destinations and create your first trip.
                    </p>
                    <a 
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold rounded-full transition-all duration-300 shadow-md"
                    >
                        Create Your First Trip
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            )}
        </div>
    );
}