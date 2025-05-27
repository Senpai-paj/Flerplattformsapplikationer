import React from "react";
import SearchBar from "./Search";

/* Navbar till både home page och favorites page */

export default function NavBar({ onMyTripsClick, onBrowseClick }) {
    
    return (
        <nav className="w-full bg-pink-500 text-pink-100 py-4 px-6 shadow-lg">
            <div className="flex items-center justify-between gap-6 max-w-screen-xl mx-auto">
                
                <div className="text-2xl font-semibold">
                    DreamTrip {/* Byt text till projektets titel senare */}
                </div>


                    <SearchBar />


                <div className="flex items-center">
                    <button
                        onClick={onBrowseClick}
                        className="text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm h-[48px] px-6 transition-all duration-300 shadow-md"
                    >
                        Browse
                    </button>
                </div>
                <div>
                    <button
                        onClick={onMyTripsClick}
                        className="text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm h-[48px] px-6 transition-all duration-300 shadow-md"
                    >
                        My Trips
                    </button>
                </div>
            </div>
        </nav>
    );
}

