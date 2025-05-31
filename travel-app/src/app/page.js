"use client";

import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Search from "@/components/Search";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchUnsplashImages } from "@/utils/unsplash";
import { fetchDestinations } from "@/utils/destinations";
import { serializeUseCacheCacheStore } from "next/dist/server/resume-data-cache/cache-store";
import PhotoGrid from "@/components/PhotoGrid";


export default function Home() {

  const router = useRouter();
  const [images, setImages] = useState([]);
  const [likedImages, setLikedImages] = useState([]);
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState(1);

  async function handleSearch(searchTerm) {
    setQuery(searchTerm);
    setPages(1)
    try {
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

  const openForm = (liked) => {
    setLikedImages(liked);
    console.log(liked);
    //add display styiling when form added
  }

  return (
    <div >
      <NavBar
        onBrowseClick={() => router.push("/")}
        onMyTripsClick={() => router.push("/favorites")}
        handleSearch={handleSearch}
      />

      <PhotoGrid images={images} createTrip={openForm} />
        
      {images.length > 0 && (
        <div className="flex justify-center mb-10">
          <button
            onClick={getMore}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Load More
          </button>
        </div>
      )}

    </div>
  );
}
