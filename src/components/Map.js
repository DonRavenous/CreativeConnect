import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getDistance } from '../utils/distanceUtils';

const customIcon = new L.Icon({
    iconUrl: '/map-marker-icon.jpg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

function Map({ artistData }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [nearbyArtists, setNearbyArtists] = useState([]);

  // Log artistData to confirm it’s loaded
  useEffect(() => {
    console.log("Artist Data Loaded:", artistData);
  }, [artistData]);

  useEffect(() => {
    if (markerPosition && artistData) {
      const radius = 5;
      const nearby = artistData.filter(artist => {
        const distance = getDistance(markerPosition[0], markerPosition[1], artist.lat, artist.lng);
        return distance <= radius;
      });
      setNearbyArtists(nearby);

      // Log nearbyArtists to debug if filtering is working
      console.log("Nearby Artists:", nearby);
    }
  }, [markerPosition, artistData]);

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

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} className="h-screen w-full z-0">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <MapClickHandler />
      {markerPosition && (
        <Marker position={markerPosition} icon={customIcon}>
          <Popup>Selected Location</Popup>
        </Marker>
      )}
      {nearbyArtists.map(artist => (
        <Marker key={artist.id} position={[artist.lat, artist.lng]} icon={customIcon}>
          <Popup>
            <strong>{artist.name}</strong><br />
            {artist.specialty}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
