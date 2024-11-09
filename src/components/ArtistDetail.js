import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ArtistDetail() {
  const { id } = useParams(); // Get artist ID from URL
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/artists/${id}`);
        if (!response.ok) throw new Error('Failed to fetch artist information');
        const data = await response.json();
        setArtistData(data);
      } catch (error) {
        console.error('Error fetching artist details:', error);
        setError('Could not load artist details.');
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
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
        <>
          {/* Artist-specific Information */}
          <div>
            <h3 className="text-xl font-semibold">Specialty</h3>
            <p>{artistData.specialty || "No specialty listed."}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Portfolio</h3>
            <div className="grid grid-cols-2 gap-4">
              {artistData.portfolio && artistData.portfolio.length > 0 ? (
                artistData.portfolio.map((pic, index) => (
                  <img key={index} src={`http://localhost:5001${pic}`} alt={`Portfolio ${index + 1}`} className="w-full h-auto rounded" />
                ))
              ) : (
                <p>No portfolio images available.</p>
              )}
            </div>
          </div>
        </>
      ) : artistData.role === 'business' ? (
        <>
          {/* Business-specific Information */}
          <div>
            <h3 className="text-xl font-semibold">Services Needed</h3>
            <p>{artistData.servicesNeeded || "No services listed yet."}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Partnership Opportunities</h3>
            <p>{artistData.partnershipOpportunities || "No partnership opportunities listed yet."}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}


export default ArtistDetail;
