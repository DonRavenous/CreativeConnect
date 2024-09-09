import React from 'react';
import { useParams } from 'react-router-dom';
import artistData from '../data/artists.json'; // Adjust the path as needed

function ArtistDetail() {
  const { id } = useParams();
  const artist = artistData.find(a => a.id === parseInt(id));

  if (!artist) return <div>Artist not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold">{artist.name}</h2>
      <p className="text-xl mb-4">{artist.specialty}</p>
      <p>{artist.bio}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {artist.portfolio.map((image, index) => (
          <img key={index} src={image} alt={`Portfolio ${index + 1}`} className="w-full h-auto rounded shadow" />
        ))}
      </div>
    </div>
  );
}

export default ArtistDetail;
