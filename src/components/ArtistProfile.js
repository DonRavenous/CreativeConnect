import React from 'react';
import { useParams } from 'react-router-dom';

function ArtistProfile() {
  const { id } = useParams();
  // Normally, you'd fetch artist details from an API. We'll use mock data for now.
  const artist = { id, name: 'Artist One', specialty: 'Painter', bio: 'A brief bio about the artist.' };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold">{artist.name}</h2>
      <p className="text-xl mb-4">{artist.specialty}</p>
      <p>{artist.bio}</p>
    </div>
  );
}

export default ArtistProfile;
