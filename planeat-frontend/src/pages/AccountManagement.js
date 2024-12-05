// planeat-frontend\src\pages\AccountManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';

function AccountManagement() {
  const auth = getAuth();
  const database = getDatabase();
  const storage = getStorage();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImageUrl: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isSavedDropdownOpen, setIsSavedDropdownOpen] = useState(false);
  const [isFavoritesDropdownOpen, setIsFavoritesDropdownOpen] = useState(false);

  const [tier, setTier] = useState('Bronze');
  const [tierImage, setTierImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/other%2FBronze.png?alt=media&token=8a20691b-4e58-4b8c-aa75-cf519115299c'
  );

  useEffect(() => {
    const fetchUserDetailsAndOrders = async () => {
      if (!user) {
        setErrorMessage('User is not logged in.');
        return;
      }

      try {
        const userDetailsResponse = await axios.get(`http://localhost:5000/api/users/details/${user.uid}`);
        setFormData({
          name: userDetailsResponse.data.name,
          email: userDetailsResponse.data.email,
          phone: userDetailsResponse.data.phone || '',
          address: userDetailsResponse.data.address || '',
          profileImageUrl: userDetailsResponse.data.profileImageUrl || '',
        });

        const ordersRef = ref(database, `orders/${user.uid}`);
        let totalItems = 0;

        onValue(ordersRef, (snapshot) => {
          if (snapshot.exists()) {
            const orders = snapshot.val();
            Object.values(orders).forEach((order) => {
              order.items.forEach((item) => {
                totalItems += item.quantity;
              });
            });

            let badge = 'Bronze';
            let badgeImage =
              'https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/other%2FBronze.png?alt=media&token=8a20691b-4e58-4b8c-aa75-cf519115299c';

            if (totalItems > 10) {
              badge = 'Silver';
              badgeImage =
                'https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/other%2FSilver.png?alt=media&token=11575893-e074-4dcb-8b60-f16e198249bd';
            }
            if (totalItems > 20) {
              badge = 'Gold';
              badgeImage =
                'https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/other%2FGold.png?alt=media&token=eb4af040-9c81-4c89-bb52-213c3b3e5f03';
            }

            setTier(badge);
            setTierImage(badgeImage);
          }
        });
      } catch (error) {
        setErrorMessage('Failed to load account details or orders.');
      }
    };

    const fetchSavedRecipes = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/users/saved-recipes/${user.uid}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        setErrorMessage('Failed to load saved recipes.');
      }
    };

    const fetchFavoriteRecipes = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/users/favorites/${user.uid}`);
        setFavoriteRecipes(response.data.favorites);
      } catch (error) {
        setErrorMessage('Failed to load favorite recipes.');
      }
    };

    fetchUserDetailsAndOrders();
    fetchSavedRecipes();
    fetchFavoriteRecipes();
  }, [user, database]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const uploadProfileImage = async () => {
    if (!profileImage || !user) {
      setErrorMessage('Please select an image and ensure you are logged in.');
      return;
    }

    try {
      const uploadRef = storageRef(storage, `profileimage/${user.uid}/${profileImage.name}`);
      const uploadTask = uploadBytesResumable(uploadRef, profileImage);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setErrorMessage(`Failed to upload: ${error.message}`);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData((prev) => ({ ...prev, profileImageUrl: downloadURL }));

          try {
            await axios.put(`http://localhost:5000/api/users/details/${user.uid}`, {
              profileImageUrl: downloadURL,
            });
            setSuccessMessage('Profile image uploaded and updated successfully!');
          } catch (error) {
            setErrorMessage('Failed to update profile image URL in the database.');
          }
        }
      );
    } catch (error) {
      setErrorMessage('An error occurred while uploading the image.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage('User is not logged in.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/users/details/${user.uid}`, {
        phone: formData.phone,
        address: formData.address,
      });
      setSuccessMessage('Account details updated successfully!');
    } catch {
      setErrorMessage('Failed to update account details.');
    }
  };

  const toggleSavedDropdown = () => {
    setIsSavedDropdownOpen((prev) => !prev);
  };

  const toggleFavoritesDropdown = () => {
    setIsFavoritesDropdownOpen((prev) => !prev);
  };

  return (
    <div className="container mt-5">
      <div
        className="membership-tag"
        style={{
          position: 'absolute',
          top: '70px',
          right: '20px',
          background: '#fff',
          padding: '10px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img src={tierImage} alt={`${tier} Badge`} style={{ width: '40px', marginRight: '10px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{tier} Member</span>
      </div>
      <h2 className="text-center mb-4">Account Management</h2>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <div className="row">
        <div className="col-md-4 text-center">
          <div className="profile-image-container">
            {formData.profileImageUrl ? (
              <img
                src={formData.profileImageUrl}
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  border: '2px solid #ccc',
                  marginBottom: '10px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: '#f0f0f0',
                  border: '2px solid #ccc',
                  lineHeight: '200px',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                No Image
              </div>
            )}
          </div>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button
            type="button"
            className="btn btn-dark mt-3"
            onClick={uploadProfileImage}
          >
            Upload Image
          </button>
          {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
        </div>
        <div className="col-md-8">
          <form onSubmit={handleUpdate}>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                name="name"
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                name="email"
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={formData.phone}
                name="phone"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Address</label>
              <textarea
                className="form-control"
                value={formData.address}
                name="address"
                rows="3"
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: '#734F96', color: 'white', width: '100%' }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <div className="mt-5">
        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-outline-primary w-100"
              onClick={toggleSavedDropdown}
            >
              {isSavedDropdownOpen ? 'Hide Saved Recipes' : 'View Saved Recipes'}
            </button>
            {isSavedDropdownOpen && (
              <div className="mt-3">
                {savedRecipes.length === 0 ? (
                  <p>No saved recipes yet.</p>
                ) : (
                  savedRecipes.map((recipe) => (
                    <div key={recipe._id} className="mb-3">
                      <h5>{recipe.title}</h5>
                      <p>{recipe.description}</p>
                      <Link to={`/recipes/${recipe._id}`} className="btn btn-outline-primary btn-sm">
                        View Recipe
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-outline-success w-100"
              onClick={toggleFavoritesDropdown}
            >
              {isFavoritesDropdownOpen ? 'Hide Favorite Recipes' : 'View Favorite Recipes'}
            </button>
            {isFavoritesDropdownOpen && (
              <div className="mt-3">
                {favoriteRecipes.length === 0 ? (
                  <p>No favorite recipes yet.</p>
                ) : (
                  favoriteRecipes.map((recipe) => (
                    <div key={recipe._id} className="mb-3">
                      <h5>{recipe.title}</h5>
                      <p>{recipe.description}</p>
                      <Link to={`/recipes/${recipe._id}`} className="btn btn-outline-success btn-sm">
                        View Recipe
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
