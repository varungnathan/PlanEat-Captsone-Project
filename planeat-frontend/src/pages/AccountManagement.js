import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';
 
function AccountManagement() {
  const auth = getAuth();
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user) {
        setErrorMessage('User is not logged in.');
        return;
      }
 
      try {
        const response = await axios.get(`http://localhost:5000/api/users/details/${user.uid}`);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone || '',
          address: response.data.address || '',
          profileImageUrl: response.data.profileImageUrl || '',
        });
      } catch (error) {
        setErrorMessage('Failed to load account details.');
      }
    };
 
    const fetchSavedRecipes = async () => {
      if (!user) {
        return;
      }
 
      try {
        const response = await axios.get(`http://localhost:5000/api/users/saved-recipes/${user.uid}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        setErrorMessage('Failed to load saved recipes.');
      }
    };
 
    fetchUserDetails();
    fetchSavedRecipes();
  }, [user]);
 
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
 
    const storageRef = ref(storage, `profileimage/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, profileImage);
 
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      () => {
        setErrorMessage('Failed to upload profile image.');
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData((prev) => ({ ...prev, profileImageUrl: downloadURL }));
 
          await axios.put(`http://localhost:5000/api/users/details/${user.uid}`, {
            profileImageUrl: downloadURL,
          });
 
          setSuccessMessage('Profile image updated successfully!');
        } catch {
          setErrorMessage('Failed to update profile image.');
        }
      }
    );
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
 
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
 
  return (
    <div className="container mt-5">
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
            className="btn btn-secondary mt-3"
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
            <button type="submit" className="btn btn-primary w-100">Update</button>
          </form>
        </div>
      </div>
      <div className="mt-5">
        <h3>
          <button
            className="btn btn-primary w-100"
            onClick={toggleDropdown}
          >
            {isDropdownOpen ? 'Hide Saved Recipes' : 'View Saved Recipes'}
          </button>
        </h3>
        {isDropdownOpen && (
          <div className="mt-3">
            {savedRecipes.length === 0 ? (
              <p>No saved recipes yet.</p>
            ) : (
              <div>
                {savedRecipes.map((recipe) => (
                  <div key={recipe._id} className="mb-3">
                    <h5>{recipe.title}</h5>
                    <p>{recipe.description}</p>
                    <Link to={`/recipes/${recipe._id}`} className="btn btn-primary btn-sm">
                      View Recipe
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
 
export default AccountManagement;
 