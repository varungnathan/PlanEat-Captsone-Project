// planeat-frontend\src\pages\AddPantryItemPage.js

import React, { useState } from 'react';
import axios from 'axios';

function AddPantryItemPage() {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: '',
    expiryDate: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setMessage('User not authenticated. Please log in.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/pantry/${userId}/add`, formData);
      setMessage(response.data.message || 'Item added successfully.');
      setFormData({
        name: '',
        quantity: '',
        unit: '',
        category: '',
        expiryDate: '',
      });
    } catch (error) {
      setMessage('Error adding pantry item.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add Pantry Item</h1>
      {message && <p className="text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Unit</label>
          <input
            type="text"
            className="form-control"
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Expiration Date</label>
          <input
            type="date"
            className="form-control"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Item</button>
      </form>
    </div>
  );
}

export default AddPantryItemPage;
