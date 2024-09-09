import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">CreativeConnect</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link to="/search" className="hover:text-gray-400">Search</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
