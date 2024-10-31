import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

function SearchBar({ artistData }) {
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
      {/* Only display the list if there is a query */}
      {query && (
        <ul className="space-y-4 max-h-60 overflow-y-auto">
          {filteredArtists.length > 0 ? (
            filteredArtists.map(artist => (
              <li key={artist.id} className="p-2 border-b">
                <Link to={`/artist/${artist.id}`} className="text-lg font-semibold hover:underline">
                  {artist.name}
                </Link>
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
