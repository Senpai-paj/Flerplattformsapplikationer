import React, { useState } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

/* grid layout och styling för hur fotona presenteras vid sök eller bland favoriter */

export default function PhotoGrid({ images, createTrip }) {
   
    const [liked, setLiked] = useState([]);

    const toggleLike = (url) => {
        setLiked(prev => {
            if (prev.includes(url)) {
                return prev.filter(u => u !== url);
            } else {
                return [...prev, url];
            }
        });
    };

    const handleCreateTrip = () => {
        createTrip(liked);
        setLiked([]);
    }



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {images.map((image) => (
                <div key={image.id} className="relative bg-white rounded-lg shadow-md overflow-hidden">

                <div
                    className="absolute top-2 right-2 z-10 cursor-pointer"
                    onClick={() => toggleLike(image.urls.regular)}
                >
                    {liked.includes(image.urls.regular) ? (
                    <HeartSolid className="w-6 h-6 text-red-500" />
                    ) : (
                    <HeartOutline className="w-6 h-6 text-gray-500" />
                    )}
                </div>

                <img
                    src={image.urls.regular}
                    alt={image.alt_description || "Unsplash image"}
                    className="w-full h-64 object-cover"
                />
                </div>
            ))}
            {liked.length > 0 && (
                <button
                    onClick={() => handleCreateTrip(liked)}
                    className="absolute bottom-0 fixed z-10 right-0 m-4 bg-[#BADFDC] hover:bg-[#539287] text-[#539287] hover:text-[#BADFDC] ease-in-out duration-300 cursor-pointer font-bold py-7 px-4 rounded-full"
                >
                    Create
                </button> 
            )}
            
        </div>
    );
}