import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ArtistDetail() {
  const { id } = useParams(); // Get artist ID from URL
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch('/artists.json');
        const data = await response.json();
        const selectedArtist = data.find(artist => artist.id === parseInt(id));
        setArtist(selectedArtist);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) return <p>Loading artist details...</p>;
  if (!artist) return <p>Artist not found.</p>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>Specialty: {artist.specialty}</p>
      {/* Additional artist details here */}
    </div>
  );
}

export default ArtistDetail;
