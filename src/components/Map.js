import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the custom icon for the markers
const customIcon = new L.Icon({
    iconUrl: '/map-marker-icon.jpg', // Adjust the path to your custom marker icon image
    iconSize: [32, 32], // Adjust the size of the icon [width, height]
    iconAnchor: [16, 32], // Anchor the icon properly [x, y]
    popupAnchor: [0, -32] // Popup anchor position [x, y]
});

function Map() {
    const artists = [
        { id: 1, name: 'Artist One', position: [51.505, -0.09] },
        { id: 2, name: 'Artist Two', position: [51.51, -0.1] },
        { id: 3, name: 'Artist Three', position: [51, -0.1] },
    ];

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full w-full">
            {/* Tile Layer for OpenStreetMap */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
            />

            {/* Add artist markers on the map */}
            {artists.map(artist => (
                <Marker key={artist.id} position={artist.position} icon={customIcon}>
                    <Popup>
                        <strong>{artist.name}</strong><br />
                        {/* You can add more artist information here */}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;


