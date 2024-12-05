// planeat-backend\models\User.js

const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ['Free', 'Silver', 'Gold', 'Platinum'],
      default: 'Free',
    },
    profileImageUrl: {
      type: String,
      default: '',
    },
    savedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
  },
  {
    timestamps: true,
  }
);
 
const User = mongoose.model('User', userSchema);
module.exports = User;