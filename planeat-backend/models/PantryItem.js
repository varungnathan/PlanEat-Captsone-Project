// planeat-backend\models\PantryItem.js

const mongoose = require('mongoose');

const PantryItemSchema = new mongoose.Schema({
  userId: {
    type: String, // Firebase UID
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  unit: {
    type: String, // e.g., kg, grams, liters, pieces
    required: true,
  },
  expiryDate: {
    type: Date, // Optional, to track perishable items
  },
  category: {
    type: String, // e.g., Vegetables, Grains, Spices
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PantryItem', PantryItemSchema);
