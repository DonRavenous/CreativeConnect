import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ArtistDetail from './components/ArtistDetail';
import Search from './components/Search';
import Header from './components/Header';
import Map from './components/Map';


function App() {
  return (
    <div className="App">
      <Header /> {/* Include the Header component */}
      <main>
        <Routes> {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/map" element={<Map />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
          {/* Add other routes as needed */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
