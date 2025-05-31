import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


/* Utseende för favorit-cards plus "baksida" av kortet med info om resan */

export default function FavotiteCard() {
   
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
        setTrips(storedTrips);
    }, []);

    const carouselSettings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {trips.map((trip) => (
                <div
                    key={trip.id}
                    className="relative bg-white rounded-lg shadow-md overflow-hidden bg-blue-500">
                    <figure className="w-full h-64">
                        <Slider {...carouselSettings}>
                            {trip.images.map((url, idx) => (
                            <div key={idx}>
                                <img
                                src={url}
                                alt={`Trip ${trip.title} - ${idx}`}
                                className="w-full h-64 object-cover"
                                />
                            </div>
                            ))}
                        </Slider>
                    </figure>

                    <div className="card-body h-15 text-center">
                        <h2 className="card-title font-bold text-xl">
                            {trip.title}
                        </h2>
                    </div>

                </div>
            ))}
        </div>
    );
}