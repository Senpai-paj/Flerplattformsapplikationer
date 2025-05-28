"use client";

import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Search from "@/components/Search";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchUnsplashImages } from "@/utils/unsplash";
import { fetchDestinations } from "@/utils/destinations";
import { serializeUseCacheCacheStore } from "next/dist/server/resume-data-cache/cache-store";


export default function Home() {

  const router = useRouter();
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState(1);

  async function handleSearch(searchTerm) {
    setQuery(searchTerm);
    setPages(1)
    try {
      const data = await fetchDestinations(searchTerm);
      
      const results = await fetchUnsplashImages(searchTerm, 1);
      setImages(results);
      console.log(results);
    } catch (error) {
      console.error(error);
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

  return (
    <div >
      <NavBar
        onBrowseClick={() => router.push("/")}
        onMyTripsClick={() => router.push("/favorites")}
        handleSearch={handleSearch}
      />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-square">
              <img
                src={image.urls.regular}
                alt={image.alt_description || 'Unsplash image'}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
          {images.length > 0 && 
            <button
              onClick={getMore}
              className="mt-4 mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Load More
            </button>
          }
        </div>
    </div>
  );
}
