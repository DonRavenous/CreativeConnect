import React from 'react';
import { Link } from 'react-router-dom';

function ArtistList() {
  const artists = [
    { id: 1, name: 'Artist One', specialty: 'Painter' },
    { id: 2, name: 'Artist Two', specialty: 'Sculptor' },
    { id: 3, name: 'Artist Three', specialty: 'Digital Artist' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Artists</h2>
      <ul className="space-y-4">
        {artists.map(artist => (
          <li key={artist.id} className="p-4 border rounded shadow">
            <Link to={`/artist/${artist.id}`} className="text-xl font-semibold hover:underline">
              {artist.name}
            </Link>
            <p>{artist.specialty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistList;
