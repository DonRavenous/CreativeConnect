import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginModal({ closeLoginModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User ID received from response:', data.id);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('authToken', data.token);
        closeLoginModal();
        navigate(`/profile/${data.id}`);
      } else {
        setError(data.msg || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition-colors mb-2"
        >
          Log In
        </button>
        
        <button
          onClick={closeLoginModal}
          className="w-full bg-gray-500 text-white py-2 rounded font-semibold hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
