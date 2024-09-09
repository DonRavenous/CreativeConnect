import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
    iconUrl: '/map-marker-icon.jpg', // Adjust the path as needed
    iconSize: [32, 32], // Size of the icon [width, height]
    iconAnchor: [16, 32], // Anchor point of the icon [x, y]
    popupAnchor: [0, -32], // Anchor point for the popup [x, y]
  });

function Map() {
    const artists = [
        { id: 1, name: 'Artist One', position: [51.505, -0.09] },
        { id: 2, name: 'Artist Two', position: [51.51, -0.1] },
        { id: 3, name: 'Artist Three', position: [51, -0.1] },
      ];
      return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {artists.map(artist => (
            <Marker key={artist.id} position={artist.position} icon={customIcon}>
              <Popup>
                {artist.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      );
    }
       

export default Map;

