import React, { useState } from 'react';

export default function Form({ likedImages, handleCancel }) {
    const [title, setTitle] = useState('');
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateClick = () => {
        handleCreate({ title, destination, description });
    };

    const sampleImages = [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
        'https://images.unsplash.com/photo-1533105079780-92b9be482077',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470'
    ];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-8 w-1/3 h-11/12 rounded-lg overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Create New Trip</h2>
                
                <div className="mb-6">
                    <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
                        {likedImages.map((image, index) => (
                            <div key={index} className="flex-none snap-center">
                                <img 
                                    src={image} 
                                    alt={`Travel destination ${index + 1}`}
                                    className="h-48 w-64 object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
                    <input type="text" id="destination" value={destination} 
                        onChange={e => setDestination(e.target.value)} 
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                        id="description" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300" 
                    />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleCancel} 
                        className="mr-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    <button onClick={handleCreateClick} 
                        className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
