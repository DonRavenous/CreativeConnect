import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import ArtistDetail from './components/ArtistDetail';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import LoginModal from './components/LoginModal';
import './App.css';

function App() {
  const [artistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null); // State to track selected artist

  const location = useLocation();
  const navigate = useNavigate();

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => {
    setLoginModalOpen(false);
    const token = localStorage.getItem('authToken');
    if (token) setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch('/artists.json');
        const data = await response.json();
        setArtistData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    };
    fetchArtistData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleArtistSelect = (artist) => {
    setSelectedArtist(artist); // Update selected artist for map
    navigate('/map'); // Navigate to the map
  };

  if (loading) return <p>Loading artists...</p>;

  return (
    <div className="App h-screen w-screen flex flex-col">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      {isLoginModalOpen && <LoginModal closeLoginModal={closeLoginModal} />}

      <main className="flex-grow relative h-full w-full">
        {isLoggedIn ? (
          <>
            {/* Conditionally render the search bar only on specific pages */}
            {(location.pathname === '/' || location.pathname === '/map') && (
              <div className="search-bar">
                <SearchBar artistData={artistData} onSelectArtist={handleArtistSelect} />
              </div>
            )}
            <Routes>
              <Route path="/" element={<Home artistData={artistData} />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/map" element={<Map artistData={artistData} selectedArtist={selectedArtist} />} />
              <Route path="/artist/:id" element={<ArtistDetail />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <div className="welcome-screen">
            <h1>Welcome to Creative Connect!</h1>
            <p>Please log in to access the map and other features.</p>
            <button onClick={openLoginModal} className="bg-blue-500 text-white p-2 rounded">
              Log In
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
