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
      <div>
        <h1>Testing Unsplash</h1>
        {/*images.map(()=>{

        })*/}
      </div>
    </div>
  );
}
