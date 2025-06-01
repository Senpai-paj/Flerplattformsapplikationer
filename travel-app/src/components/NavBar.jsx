import React from "react";
import SearchBar from "./Search";
import { usePathname } from "next/navigation";

/* Navbar till både home page och favorites page */

export default function NavBar({ onMyTripsClick, onBrowseClick, handleSearch}) {
    const pathname = usePathname();

    return (
        <nav className="w-full bg-pink-500 text-pink-100 py-4 px-6 shadow-lg">
            <div className="max-w-screen-xl mx-auto">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between gap-6">
                    <div className="text-2xl font-semibold">
                        DreamTrip
                    </div>

                    <div className={`w-full max-w-lg flex items-center
                        ${pathname === "/favorites" ? "invisible" : ""}`
                        }>
                        <SearchBar handleSearch={handleSearch}/>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBrowseClick}
                            className="text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm h-[48px] px-6 transition-all duration-300 shadow-md"
                        >
                            Browse
                        </button>
                        <button
                            onClick={onMyTripsClick}
                            className="text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm h-[48px] px-6 transition-all duration-300 shadow-md"
                        >
                            My Trips
                        </button>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-4">
                    
                    <div className="flex justify-center">
                        <div className="text-2xl font-semibold">
                            DreamTrip
                        </div>
                    </div>

                   
                    <div className={`w-full ${pathname === "/favorites" ? "invisible" : ""}`}>
                        <SearchBar handleSearch={handleSearch}/>
                    </div>

                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <button
                            onClick={onBrowseClick}
                            className="text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm h-[48px] px-6 transition-all duration-300 shadow-md"
                        >
                            Browse
                        </button>
                        <button
                            onClick={onMyTripsClick}
                            className="text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm h-[48px] px-6 transition-all duration-300 shadow-md"
                        >
                            My Trips
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}