import React, { useState } from 'react';
import './LoginModal.css';

function LoginModal({ closeLoginModal }) {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint;
    const body = JSON.stringify(formData);

    if (activeTab === 'login') {
      endpoint = 'http://localhost:5001/api/users/login';
    } else if (activeTab === 'register') {
      endpoint = 'http://localhost:5001/api/users/register';
    } else if (activeTab === 'forgot') {
      endpoint = 'http://localhost:5001/api/users/reset-password';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await response.json();

      if (response.ok) {
        if (activeTab === 'login') {
          localStorage.setItem('authToken', data.token);
          closeLoginModal(); 
          window.location.href = '/Home'; 
        } else if (activeTab === 'register') {
          console.log("Registration successful:", data);
          closeLoginModal();
        } else if (activeTab === 'forgot') {
          alert("Password reset email sent, please check your inbox.");
        }
      } else {
        console.error("Error:", data.errors || data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeLoginModal}>X</button>
        
        <div className="tab-header">
          <button onClick={() => setActiveTab('login')} className={activeTab === 'login' ? 'active' : ''}>Login</button>
          <button onClick={() => setActiveTab('register')} className={activeTab === 'register' ? 'active' : ''}>Register</button>
          <button onClick={() => setActiveTab('forgot')} className={activeTab === 'forgot' ? 'active' : ''}>Forgot Password</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'login' && (
            <>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="p-2 border rounded w-full"
                required
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Login
              </button>
            </>
          )}
          
          {activeTab === 'register' && (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="p-2 border rounded w-full"
                minLength="6"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              >
                <option value="">Select Role</option>
                <option value="creative">Creative</option>
                <option value="business">Business</option>
              </select>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Register
              </button>
            </>
          )}
          
          {activeTab === 'forgot' && (
            <>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border rounded w-full"
                required
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
