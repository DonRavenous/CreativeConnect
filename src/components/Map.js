import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getDistance } from '../utils/distanceUtils';

const customIcon = new L.Icon({
  iconUrl: '/map-marker-icon.jpg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function Map({ artistData, selectedArtist, mapCenter }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [nearbyArtists, setNearbyArtists] = useState([]);
  const navigate = useNavigate();

  // Function to handle artist link click
  const handleArtistClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  // Map click handler for placing a marker at clicked location
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        console.log("Marker Position Set:", [lat, lng]);
      },
    });
    return null;
  };

  // Center map based on initial selectedArtist or mapCenter
  const MapCenterHandler = () => {
    const map = useMap();
    useEffect(() => {
      if (mapCenter) {
        map.setView(mapCenter, 13); // Center map on initial mapCenter
      } else if (selectedArtist) {
        map.setView([selectedArtist.lat, selectedArtist.lng], 13); // Center map on selected artist
      }
    }, [map]); // Only depend on `map` to run once on mount
    return null;
  };

  // Filter nearby artists based on markerPosition
  useEffect(() => {
    if (markerPosition && artistData) {
      const radius = 5;
      const nearby = artistData.filter(artist => {
        const distance = getDistance(markerPosition[0], markerPosition[1], artist.lat, artist.lng);
        return distance <= radius;
      });
      setNearbyArtists(nearby);
      console.log("Nearby Artists:", nearby);
    }
  }, [markerPosition, artistData]);

  // Update marker position when selected artist changes
  useEffect(() => {
    if (selectedArtist) {
      setMarkerPosition([selectedArtist.lat, selectedArtist.lng]);
    }
  }, [selectedArtist]);

  return (
    <MapContainer center={mapCenter || [51.505, -0.09]} zoom={13} className="h-screen w-full z-0">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <MapClickHandler />
      <MapCenterHandler />

      {/* Marker for selected location or clicked location */}
      {markerPosition && (
        <Marker position={markerPosition} icon={customIcon}>
          <Popup>Selected Location</Popup>
        </Marker>
      )}

      {/* Markers for nearby artists */}
      {nearbyArtists.map(artist => (
        <Marker key={artist.id} position={[artist.lat, artist.lng]} icon={customIcon}>
          <Popup>
            <strong
              onClick={() => handleArtistClick(artist.id)}
              className="cursor-pointer text-blue-600 underline"
            >
              {artist.name}
            </strong><br />
            {artist.specialty}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
