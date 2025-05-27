"use client";

import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Search from "@/components/Search";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchUnsplashImages } from "@/utils/unsplash";


export default function Home() {

  const router = useRouter();
  const [images, setImages] = useState([]);

  async function handleSearch (searchTerm) {
    try {
      const results = await fetchUnsplashImages(searchTerm);
      setImages(results);
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
        </div>

    </div>
  );
}
