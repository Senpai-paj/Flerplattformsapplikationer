"use client";

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
        </div>
    );
  }