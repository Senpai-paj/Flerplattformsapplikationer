"use client";

import FavotiteCard from "@/components/FavoriteCard";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
    
    const router = useRouter();

    return (
        
        <div >
            <NavBar
                onBrowseClick={() => router.push("/")}
                onMyTripsClick={() => router.push("/favorites")}
            />
        
            <FavotiteCard
            
            />


        
        </div>

        
    );
  }