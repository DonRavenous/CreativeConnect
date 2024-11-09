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
  popupAnchor: [0, -32],
});

function Map({ artistData, selectedArtist, mapCenter }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [nearbyArtists, setNearbyArtists] = useState([]);
  const navigate = useNavigate();

  // Handle click on artist to navigate to details
  const handleArtistClick = (id) => {
    if (id) {
      navigate(`/artist/${id}`);
    } else {
      console.warn("Artist ID is undefined.");
    }
  };

  // Map click handler
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

  // Map center handling
  const MapCenterHandler = () => {
    const map = useMap();
    useEffect(() => {
      if (mapCenter) {
        map.setView(mapCenter, 13);
      } else if (selectedArtist) {
        map.setView([selectedArtist.lat, selectedArtist.lng], 13);
      }
    }, [map]);
    return null;
  };

  // Filter nearby artists based on the marker position
  useEffect(() => {
    if (markerPosition && artistData) {
      const radius = 100; // km
      const nearby = artistData.filter((artist) => {
        const distance = getDistance(markerPosition[0], markerPosition[1], artist.lat, artist.lng);
        return distance <= radius;
      });
      setNearbyArtists(nearby);
      console.log("Nearby Artists:", nearby);
    }
  }, [markerPosition, artistData]);

  // Update marker position for selected artist
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

      {/* Selected location marker */}
      {markerPosition && (
        <Marker position={markerPosition} icon={customIcon}>
          <Popup>Selected Location</Popup>
        </Marker>
      )}

      {/* Nearby artists markers */}
      {nearbyArtists.map((artist) => (
        <Marker key={artist._id} position={[artist.lat, artist.lng]} icon={customIcon}>
          <Popup>
            <strong
              onClick={() => handleArtistClick(artist._id)}
              className="cursor-pointer text-blue-600 underline"
            >
              {artist.name}
            </strong>
            <br />
            {artist.specialty}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
