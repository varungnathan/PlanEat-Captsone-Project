// planeat-frontend\src\pages\PantryPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PantryPage({ userId }) {
  const [pantryItems, setPantryItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 0,
    unit: '',
    expiryDate: '',
    category: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPantryItems = async () => {
      if (!userId) return; // Ensure userId is available before making API call
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pantry/${userId}`);
        setPantryItems(response.data);
      } catch (error) {
        console.error('Error fetching pantry items:', error);
      }
    };

    fetchPantryItems();
  }, [userId]);

  const handleAddItem = async () => {
    if (!userId) {
      console.error('User ID is missing. Please log in.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/pantry/${userId}/add`, newItem);
      setPantryItems([...pantryItems, response.data.savedItem]);
      setNewItem({ name: '', quantity: 0, unit: '', expiryDate: '', category: '' });
    } catch (error) {
      console.error('Error adding pantry item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/pantry/${id}`);
      setPantryItems(pantryItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting pantry item:', error);
    }
  };

  const filteredPantryItems = pantryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Pantry Management</h1>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Add Item Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add New Pantry Item</h5>
          <form>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Quantity"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Unit"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control mb-2"
                  placeholder="Expiry Date"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                />
              </div>
            </div>
            <button type="button" className="btn btn-primary w-100 mt-2" onClick={handleAddItem}>
              Add Item
            </button>
          </form>
        </div>
      </div>

      {/* Pantry Items List */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Your Pantry Items</h5>
          {filteredPantryItems.length > 0 ? (
            <ul className="list-group">
              {filteredPantryItems.map((item) => (
                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <strong>{item.name}</strong> - {item.quantity} {item.unit} - {item.category}
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No items found. Start adding to your pantry!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PantryPage;
