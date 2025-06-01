"use client";

import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchUnsplashImages } from "@/utils/unsplash";
import { fetchDestinations } from "@/utils/destinations";
import { serializeUseCacheCacheStore } from "next/dist/server/resume-data-cache/cache-store";
import PhotoGrid from "@/components/PhotoGrid";
import Form from "@/components/Form";


export default function Home() {

  const router = useRouter();
  const [images, setImages] = useState([]);
  const [likedImages, setLikedImages] = useState([]);
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  //For destinations  
  const [destinationData, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Handeling both destinations and images
  async function handleSearch(searchTerm) {
    setQuery(searchTerm);
    setPages(1);
    setLoading(true);
    setError(null);

    try {
      const [destinationResult, imageResults] = await Promise.all([
        fetchDestinations(searchTerm, true),
        fetchUnsplashImages(searchTerm, 1)
      ]);

      setDestinationData(destinationResult);
      setImages(imageResults);


      console.log('Destination data:', destinationResult);
      console.log('Images:', imageResults);
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message);

      //If destination API fails, get images anyway 
      try {
        const results = await fetchUnsplashImages(searchTerm, 1);
        setImages(results);
        console.log('Fallback images loaded:', results);
      } catch (imageError) {
        console.error('Image fetch also failed:', imageError);
        setImages([]);
      }
    } finally {
      setLoading(false);
    }
  }
  

  async function getMore() {
    let number = pages + 1;
    setPages(number);
    
    try {
      const results = await fetchUnsplashImages(query, number);
      setImages((prev) => [...prev, ...results]);
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  }

  const openForm = (liked) => {
    setLikedImages(liked);
    console.log(liked);
    setIsVisible(true);
    //add display styiling when form added
  }

  const closeForm = () => {
    setLikedImages([]);
    setIsVisible(false);
  }

  return (
    <div >
      <NavBar
        onBrowseClick={() => router.push("/")}
        onMyTripsClick={() => router.push("/favorites")}
        handleSearch={handleSearch}
      />

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-lg text-gray-600">Searching for destination and images...</div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
            <strong className="font-bold">Search Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}

      {destinationData && (
        <div className="max-w-4xl mx-auto px-4 py-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg shadow-md my-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {destinationData.name}
            {destinationData.country && destinationData.country !== 'Unknown' && (
              <span className="text-lg text-gray-600 ml-2">({destinationData.country})</span>
            )}
          </h2>

          {destinationData.attractions && destinationData.attractions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Top Attractions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destinationData.attractions.slice(0, 4).map((attraction, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-1">{attraction.name}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {attraction.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <PhotoGrid images={images} createTrip={openForm} />
        
      {images.length > 0 && (
        <div className="flex justify-center mb-10">
          <button
            onClick={getMore}
            className="text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm h-[48px] px-6 transition-all duration-300 shadow-md"
          >
            Load More
          </button>
        </div>
      )}

      {isVisible &&
      <Form
        likedImages={likedImages}
        destination={query}
        handleCancel={closeForm}
      />}

    </div>
  );
}
