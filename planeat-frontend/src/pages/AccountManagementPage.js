import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import '../pagestyles/AccountManagementPage.css';

function AccountManagementPage() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/details/${currentUser.email}`
          );
          setUserDetails({
            name: currentUser.displayName || 'Your Name',
            email: currentUser.email,
            phone: response.data.phone || '',
            address: response.data.address || '',
          });
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSaveDetails = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/details/${userDetails.email}`,
        {
          phone: userDetails.phone,
          address: userDetails.address,
        }
      );
      alert('Details updated successfully!');
    } catch (error) {
      console.error('Error updating details:', error);
      alert('Failed to update details.');
    }
  };

  return (
    <div className="container mt-5 account-management-page">
      <h1 className="text-center mb-4">Account Management</h1>
      <div className="details-section">
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={userDetails.name}
            disabled
          />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userDetails.email}
            disabled
          />
        </div>
        <div className="form-group mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Address</label>
          <textarea
            className="form-control"
            name="address"
            rows="3"
            value={userDetails.address}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button className="btn btn-primary w-100" onClick={handleSaveDetails}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AccountManagementPage;
