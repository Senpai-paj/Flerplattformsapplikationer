import React from "react";
import SearchBar from "./SearchBar";

/* Navbar till både home page och favorites page */

export default function NavBar() {
    return (
        <nav className="w-full bg-blue-500 text-white py-4 px-6 shadow-lg">
            <div className="flex items-center justify-between gap-6 max-w-screen-xl mx-auto">
                
                <div className="text-2xl font-semibold">
                    Title Here {/* Byt text till projektets titel senare */}
                </div>

                <div className="w-full max-w-lg">
                    <SearchBar />
                </div>

                {/* lägg till knappar för randomize destination och favorites page här senare */}

            </div>
        </nav>
    );
}

