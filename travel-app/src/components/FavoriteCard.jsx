import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function FavoriteCard({ trip, setTrips }) {
    const [expandedCard, setExpandedCard] = useState(null);

    const carouselSettings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const toggleDescription = (tripId) => {
        setExpandedCard(expandedCard === tripId ? null : tripId);
    };

    const handleDelete = (tripId, e) => {
        e.stopPropagation(); // Prevent card expansion when clicking delete
        setTrips(prevTrips => {
            const updatedTrips = prevTrips.filter(t => t.id !== tripId);
            localStorage.setItem('trips', JSON.stringify(updatedTrips));
            return updatedTrips;
        });
    };

    return trip && (
        <div
            onClick={() => toggleDescription(trip.id)}
            className="relative bg-white rounded-lg shadow-md overflow-hidden bg-blue-500"
        >
            <button
                onClick={(e) => handleDelete(trip.id, e)}
                className="absolute top-2 right-2 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-all duration-300 shadow-md"
            >
                <TrashIcon className="w-5 h-5 text-red-500" />
            </button>
            <figure className="w-full h-64 mb-5">
                {trip.images.length > 1 ? (
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
                ) : (
                    <img
                        src={trip.images[0]}
                        alt={`Trip ${trip.title}`}
                        className="w-full h-64 object-cover"
                    />
                )}
            </figure>

            <div className="card-body flex flex-col justify-center items-center text-center w-full">
                <h2 
                    className="card-title font-bold text-xl cursor-pointer hover:text-pink-500 transition-colors duration-300"
                >
                    {trip.title}
                </h2>
                <div 
                    className={`overflow-hidden text-justify transition-all ease-in-out absolute bg-white bottom-0 duration-300 overflow-y-auto cursor-default w-full ${
                        expandedCard === trip.id ? ' max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <h2 className="mx-4 mt-2 font-bold">
                        {trip.destination}
                    </h2>
                    <p className="text-gray-700 px-4">
                        {trip.description}
                    </p>
                </div>
            </div>
        </div>
    );
}