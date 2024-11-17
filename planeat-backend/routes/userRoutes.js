const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch user details by firebaseUid
router.get('/details/:firebaseUid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details' });
  }
});

// Update user details (including profile image URL)
router.put('/details/:firebaseUid', async (req, res) => {
  const { phone, address, profileImageUrl } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { firebaseUid: req.params.firebaseUid },
      { phone, address, profileImageUrl },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user details' });
  }
});

// Create new user (if not already exists)
router.post('/details', async (req, res) => {
  const { name, email, firebaseUid, phone, address, profileImageUrl } = req.body;
  try {
    const existingUser = await User.findOne({ firebaseUid });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, firebaseUid, phone, address, profileImageUrl });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

module.exports = router;
