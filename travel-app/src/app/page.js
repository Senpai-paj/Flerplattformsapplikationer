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
import Form from "@/components/Form";


export default function Home() {

  const router = useRouter();
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

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

      <PhotoGrid images={images} />
        
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

      {isVisible && <Form likedImages={likedImages}/>}

    </div>
  );
}
