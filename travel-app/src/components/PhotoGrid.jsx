import React, { useState } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

/* grid layout och styling för hur fotona presenteras vid sök eller bland favoriter */

export default function PhotoGrid({ images }) {
   
    const [liked, setLiked] = useState({});

    const toggleLike = (id) => {
        setLiked((prev) => ({
        ...prev,
        [id]: !prev[id],
        }));
    };

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {images.map((image) => (
                <div key={image.id} className="relative bg-white rounded-lg shadow-md overflow-hidden">

                <div
                    className="absolute top-2 right-2 z-10 cursor-pointer"
                    onClick={() => toggleLike(image.id)}
                >
                    {liked[image.id] ? (
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
            {Object.keys(liked).some(id => liked[id]) && (
                <button
                className="absolute bottom-0 fixed z-10 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create
                </button> 
            )}
            
        </div>
    );
}