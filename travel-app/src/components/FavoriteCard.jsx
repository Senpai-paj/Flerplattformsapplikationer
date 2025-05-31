import React, { useEffect, useState } from "react";

/* Utseende för favorit-cards plus "baksida" av kortet med info om resan */

export default function FavotiteCard() {
   
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
        setTrips(storedTrips);
    }, []);

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {trips.map((trip) => (

            <div
            key={trip.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden bg-blue-500">
                <figure>
                    <img
                    src={trip.images[0]}
                    alt={trip.title}
                    />
                </figure>

                <div className="card-body h-15">
                    <h2 className="card-title font-bold text-center text-xl">
                        {trip.title}
                    </h2>
                </div>

            </div>
            ))}
        </div>
    );
}