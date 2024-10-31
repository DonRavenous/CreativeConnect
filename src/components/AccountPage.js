// src/components/AccountPage.js
import React, { useState } from 'react';

function AccountPage() {
  const [formData, setFormData] = useState({
    name: '',
    skill: '',
    areaOfWork: '',
    // Add any other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Account Data:", formData);
    // Here you would send `formData` to your backend to save updates
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Skill</label>
          <input
            type="text"
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Area of Work</label>
          <input
            type="text"
            name="areaOfWork"
            value={formData.areaOfWork}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        {/* Add more fields as necessary */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AccountPage;
