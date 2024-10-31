import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, handleLogout }) {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">CreativeConnect</Link>
        </h1>
        <nav>
          <Link to="/account" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
            Account
          </Link>
        </nav>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
