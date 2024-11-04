import React, { useState, useEffect } from 'react';
import './Search.css';

function SearchBar({ artistData, onSelectArtist }) {
  const [query, setQuery] = useState('');
  const [filteredArtists, setFilteredArtists] = useState([]);

  useEffect(() => {
    const results = artistData.filter(artist =>
      artist.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArtists(results);
  }, [query, artistData]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleArtistSelect = (artist) => {
    onSelectArtist(artist); // Trigger the callback to parent
  };

  return (
    <div className="w-90 p-4 bg-white rounded shadow-lg relative z-10">
      <h2 className="text-xl font-bold mb-4">Search Artists</h2>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by artist name"
        className="p-2 border rounded w-full mb-4"
      />
      {query && (
        <ul className="space-y-4 max-h-60 overflow-y-auto">
          {filteredArtists.length > 0 ? (
            filteredArtists.map(artist => (
              <li
                key={artist.id}
                onClick={() => handleArtistSelect(artist)}
                className="p-2 border-b cursor-pointer hover:bg-gray-100"
              >
                {artist.name}
              </li>
            ))
          ) : (
            <li>No artists found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;