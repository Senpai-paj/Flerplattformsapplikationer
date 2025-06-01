import React, { useState } from 'react';

export default function Form({ likedImages, handleCancel, destination }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateClick = () => {
        const savedTrip = {
            id: Date.now(),
            title: title,
            destination: destination,
            images: likedImages,
            description: description
        };

        const existedTrips = JSON.parse(localStorage.getItem('trips')) || [];
        existedTrips.push(savedTrip)
        localStorage.setItem('trips', JSON.stringify(existedTrips));
        handleCancel();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white p-4 sm:p-6 md:p-8 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-4xl mx-auto h-5/6 sm:h-11/12 max-h-screen rounded-lg overflow-y-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-orange-500 text-center sm:text-left">
                    Create New Trip
                </h2>
                
                <div className="mb-4 sm:mb-6">
                    <div className="flex overflow-x-auto gap-2 sm:gap-4 pb-4 snap-x snap-mandatory">
                        {likedImages.map((image, index) => (
                            <div key={index} className="flex-none snap-center">
                                <img 
                                    src={image} 
                                    alt={`Travel destination ${index + 1}`}
                                    className="h-32 w-40 sm:h-40 sm:w-52 md:h-48 md:w-64 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-3 sm:mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        className="mt-1 p-2 sm:p-3 block w-full text-sm sm:text-base rounded-md border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors duration-200" 
                        placeholder="Enter trip title..."
                    />
                </div>

                <div className="mb-4 sm:mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea 
                        id="description" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        className="mt-1 p-2 sm:p-3 h-24 sm:h-32 md:h-40 block w-full text-sm sm:text-base rounded-md border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none resize-none transition-colors duration-200" 
                        placeholder="Describe your trip..."
                    />
                </div>

                {/* Mobile-first button layout */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-center sm:justify-end">
                    <button 
                        onClick={handleCancel} 
                        className="w-full sm:w-auto order-2 sm:order-1 bg-pink-100 hover:bg-pink-200 text-pink-500 font-bold py-3 sm:py-2 px-6 sm:px-4 rounded-full transition-colors duration-200 text-sm sm:text-base"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleCreateClick} 
                        className="w-full sm:w-auto order-1 sm:order-2 bg-pink-500 hover:bg-pink-700 text-pink-50 font-bold py-3 sm:py-2 px-6 sm:px-4 rounded-full transition-colors duration-200 text-sm sm:text-base"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}