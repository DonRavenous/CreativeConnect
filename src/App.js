import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ArtistDetail from './components/ArtistDetail';
import Header from './components/Header';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import AccountAccess from './components/AccountAccess';

function App() {
  return (
    <div className="App h-screen w-screen flex flex-col"> {/* Main container takes up the full viewport */}
      <Header /> {/* Header at the top */}

      <main className="flex-grow relative h-screen w-screen"> {/* Ensure main content takes full space */}
        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
        </Routes>

        {/* Fullscreen map */}
        <div className="absolute inset-0 h-full w-full z-0">
          <Map />
        </div>

        {/* Floating components */}
        <div className="absolute top-24 left-4 z-10">
          <SearchBar />
        </div>
        <div className="absolute top-24 right-4 z-10">
          <AccountAccess />
        </div>
      </main>
    </div>
  );
}

export default App;

