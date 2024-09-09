import React, { useState } from 'react';
import artistData from '../data/artists.json'; // Adjust path if needed
import { Link } from 'react-router-dom';
import './Search.css'; // Ensure Search.css has the correct styles

function Search() {
  const [query, setQuery] = useState('');
  const [filteredArtists, setFilteredArtists] = useState(artistData);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);
    const results = artistData.filter(artist =>
      artist.name.toLowerCase().includes(searchQuery)
    );
    setFilteredArtists(results);
  };

  return (
    <div className="container mx-auto p-4 relative z-10\"> {/* Ensure this div stays on top */}
      <h2 className="text-2xl font-bold mb-4">Search Artists</h2>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by artist name"
        className="p-2 border rounded w-full mb-4"
      />
      <ul className="space-y-4">
          <li>No artists found</li>
      </ul>
    </div>
  );
}

export default Search;


