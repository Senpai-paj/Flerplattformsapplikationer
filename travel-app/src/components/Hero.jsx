import React from "react";
import Search from "./Search";

export default function Hero({ onSearch, searchTerm, setSearchTerm }) {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-400/20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                        Hitta din
                        <span className="block bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                            drömdestination
                        </span>
                    </h1>

                    <search 
                        onSearch={onSearch}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>
            </div>
        </div>
    );
}