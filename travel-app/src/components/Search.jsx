"use client";

import React, { useState } from 'react';

/* komponent för sökruta. till att söka efter destinationer eller söka bland favoriter */

export default function Search({ onSearch, handleSearch }) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyDown = async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        try {
          handleSearch(searchTerm);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const randomize = () => {
      const destinations = require('../data/destinations.json');
      const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
      setSearchTerm(randomDestination);
      handleSearch(randomDestination)
    }


    return (
      <div className="w-full flex items-center justify-center max-w-2xl mx-auto">
        <div className="w-full">
          <label htmlFor="default-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="search" 
              id="default-search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="block w-full p-4 ps-10 text-sm text-slate-800 border border-orange-200 rounded-full bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 shadow-lg placeholder-orange-300"
              placeholder="Sök efter din drömdestination.." 
            />
            <button
            onClick={randomize}
            className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm px-6 py-2 transition-all duration-300 shadow-md"
            >
              Random
            </button>
          </div>
        </div>
      </div>
  );
}