import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ArtistDetail from './components/ArtistDetail';
import Header from './components/Header';
import Map from './components/Map';
import SearchBar from './components/SearchBar'; // New component
import AccountAccess from './components/AccountAccess'; // New component

function App() {
  return (
    <div className="App relative h-screen w-screen">
      <Header /> {/* Include the Header component */}
      
      {/* Main content */}
      <main className="absolute inset-0">
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/map" element={<Map />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

