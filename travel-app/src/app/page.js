"use client";

import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Search from "@/components/Search";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  const handleSearch = (searchTerm) => {
    /* Implementera logik här sedan för både search och  Random Destination */
  }

  return (
    <div >
      <NavBar
        onBrowseClick={() => router.push("/")}
        onMyTripsClick={() => router.push("/favorites")}
      />
    </div>
  );
}
