import React, { useEffect, useState, useMemo } from 'react';
import { useParams} from 'react-router-dom';

function ProfilePage() {
  const { id } = useParams();
  const userId = id || localStorage.getItem('userId'); // Use route ID or fallback to stored user ID
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    mediums: '',
    servicesNeeded: '',
    partnershipOpportunities: '',
  });

  // Define placeholder profiles for use when no userId is found
  const placeholderProfiles = useMemo(() => [
    {
      name: 'Artist One',
      specialty: 'Painter',
      bio: 'A skilled painter with a passion for landscapes.',
      role: 'artist',
      profilePic: null,
      mediums: ['Oil Painting', 'Watercolor'],
      portfolio: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
    },
    {
      name: 'Artist Two',
      specialty: 'Sculptor',
      bio: 'An experienced sculptor specializing in marble.',
      role: 'artist',
      profilePic: null,
      mediums: ['Marble', 'Bronze'],
      portfolio: [
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
      ],
    },
  ],[]);

  useEffect(() => {
    // Fetch data or perform actions relying on `placeholderProfiles`
    if (!userId) {
      setError('User ID not found.');
      setLoading(false);
      return;
    }

    

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

    fetchProfileData();
  }, [userId, placeholderProfiles]); // Include or exclude `placeholderProfiles` based on its use


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
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    try {
      const response = await fetch(`http://localhost:5001/api/users/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
           'x-auth-token': token  }, // Attach token for authorization
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

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-page container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">
        {isEditing ? 'Edit Profile' : profileData.name}
      </h2>

      {/* Edit mode */}
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

          {/* Artist-specific fields */}
          {profileData.role === 'artist' && (
            <>
              <label className="block font-semibold">Mediums of Art</label>
              <input
                type="text"
                name="mediums"
                value={formData.mediums}
                onChange={handleChange}
                placeholder="Separate with commas"
                className="border p-2 rounded w-full mb-4"
              />
            </>
          )}

          {/* Business-specific fields */}
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

          {/* Save and Cancel Buttons */}
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={handleEditToggle}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        // View mode
        <div>
          <p className="text-lg mb-4">{profileData.bio}</p>

          {/* Render Artist-specific details */}
          {profileData.role === 'artist' && (
            <div>
              <h3 className="text-xl font-semibold">Mediums of Art</h3>
              <ul className="list-disc ml-5">
                {profileData.mediums.map((medium, index) => (
                  <li key={index}>{medium}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Render Business-specific details */}
          {profileData.role === 'business' && (
            <>
              <h3 className="text-xl font-semibold">Services Needed</h3>
              <p>{profileData.servicesNeeded}</p>
              <h3 className="text-xl font-semibold">Partnership Opportunities</h3>
              <p>{profileData.partnershipOpportunities}</p>
            </>
          )}

          {/* Edit Button */}
          <button
            onClick={handleEditToggle}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
