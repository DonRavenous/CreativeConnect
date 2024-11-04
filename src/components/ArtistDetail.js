import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ArtistDetail() {
  const { id } = useParams(); // Get artist ID from URL
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch('/artists.json'); // Adjust path if needed
        const data = await response.json();

        // Find the artist by id
        const selectedArtist = data.find(artist => artist.id === parseInt(id));
        setArtistData(selectedArtist || null);
      } catch (error) {
        console.error('Error fetching artist data:', error);
        setError('Failed to load artist information.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [id]);

  if (loading) return <p>Loading artist information...</p>;
  if (error) return <p>{error}</p>;
  if (!artistData) return <p>Artist not found.</p>;

  return (
    <div className="artist-details container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Artist Information</h2>

      {/* Common Information */}
      <div>
        <h3 className="text-xl font-semibold">Name</h3>
        <p>{artistData.name || "Unknown"}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Bio</h3>
        <p>{artistData.bio || "No bio available"}</p>
      </div>

      {/* Conditional Rendering for Artist and Business */}
      {artistData.role === 'artist' ? (
        // Artist-specific Information
        <>
          <div>
            <h3 className="text-xl font-semibold">Mediums of Art</h3>
            <ul className="list-disc ml-5">
              {artistData.mediums && artistData.mediums.length > 0 ? (
                artistData.mediums.map((medium, index) => (
                  <li key={index}>{medium}</li>
                ))
              ) : (
                <p>No mediums listed.</p>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Portfolio</h3>
            <div className="grid grid-cols-2 gap-4">
              {artistData.portfolio && artistData.portfolio.length > 0 ? (
                artistData.portfolio.map((pic, index) => (
                  <img key={index} src={pic} alt={`Portfolio ${index + 1}`} className="w-full h-auto rounded" />
                ))
              ) : (
                <p>No portfolio images available.</p>
              )}
            </div>
          </div>
        </>
      ) : artistData.role === 'business' ? (
        // Business-specific Information
        <>
          <div>
            <h3 className="text-xl font-semibold">Services Needed</h3>
            <p>{artistData.servicesNeeded || "No services listed yet."}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Partnership Opportunities</h3>
            <p>{artistData.partnershipOpportunities || "No partnership opportunities listed yet."}</p>
          </div>
        </>
      ) : (
        <p>Role not specified.</p>
      )}
    </div>
  );
}

export default ArtistDetail;
