import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { id } = useParams();
  const userId = id || localStorage.getItem('userId');
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    specialty: '',  // Using specialty instead of mediums
    servicesNeeded: '',
    partnershipOpportunities: '',
  });

  // Placeholder profiles for testing purposes
  const placeholderProfiles = useMemo(() => [
    {
      name: 'Artist One',
      specialty: 'Painting, Watercolor',
      bio: 'A skilled painter with a passion for landscapes.',
      role: 'artist',
      profilePic: null,
      portfolio: [
        '/uploads/artist1_hill.jpeg',
        '/uploads/artist1_shore.jpeg',
      ],
    },
  ], []);

  useEffect(() => {console.log('Fetching profile for userId:', userId);
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/users/profile/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch artist profile');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Could not load profile data.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchProfileData();
    else {
      setError('User ID not found.');
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`http://localhost:5001/api/users/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      const updatedData = await response.json();
      setProfileData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="profile-page container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">
        {isEditing ? 'Edit Profile' : profileData.name}
      </h2>

      {isEditing ? (
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
          />

          <label className="block font-semibold">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
          />

          {profileData.role === 'artist' && (
            <>
              <label className="block font-semibold">Specialty</label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
              />
            </>
          )}

          {profileData.role === 'business' && (
            <>
              <label className="block font-semibold">Services Needed</label>
              <input
                type="text"
                name="servicesNeeded"
                value={formData.servicesNeeded}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
              />

              <label className="block font-semibold">Partnership Opportunities</label>
              <input
                type="text"
                name="partnershipOpportunities"
                value={formData.partnershipOpportunities}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
              />
            </>
          )}

          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Save
          </button>
          <button onClick={handleEditToggle} className="bg-red-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg mb-4">{profileData.bio}</p>

          {profileData.role === 'artist' && (
            <div>
              <h3 className="text-xl font-semibold">Specialty</h3>
              <ul className="list-disc ml-5">
                <li>{profileData.specialty}</li>
              </ul>
            </div>
          )}

          {profileData.role === 'business' && (
            <>
              <h3 className="text-xl font-semibold">Services Needed</h3>
              <p>{profileData.servicesNeeded}</p>
              <h3 className="text-xl font-semibold">Partnership Opportunities</h3>
              <p>{profileData.partnershipOpportunities}</p>
            </>
          )}

          <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
