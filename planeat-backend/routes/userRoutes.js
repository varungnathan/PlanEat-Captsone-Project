const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch user details by Firebase UID
router.get('/details/:firebaseUid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
});

// Fetch user ID by Firebase UID
router.get('/firebase/:firebaseUid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ _id: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user ID', error });
  }
});

// Update user details
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
    res.status(500).json({ message: 'Error updating user details', error });
  }
});

// Create a new user
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
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Save a recipe
router.post('/save-recipe/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;
  const { recipeId } = req.body;

  try {
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.savedRecipes.includes(recipeId)) {
      return res.status(400).json({ message: 'Recipe already saved.' });
    }

    user.savedRecipes.push(recipeId);
    await user.save();

    res.status(200).json({ message: 'Recipe saved successfully!', savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: 'Error saving recipe', error });
  }
});

// Get saved recipes
router.get('/saved-recipes/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;

  try {
    const user = await User.findOne({ firebaseUid }).populate('savedRecipes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved recipes', error });
  }
});

// Add recipe to favorites
router.post('/favorites/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;
  const { recipeId } = req.body;

  try {
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.favorites.includes(recipeId)) {
      return res.status(400).json({ message: 'Recipe already in favorites.' });
    }

    user.favorites.push(recipeId);
    await user.save();

    res.status(200).json({ message: 'Recipe added to favorites!', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites', error });
  }
});

// Get favorite recipes
router.get('/favorites/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;

  try {
    const user = await User.findOne({ firebaseUid }).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error });
  }
});

// Remove recipe from favorites
router.delete('/favorites/:firebaseUid/:recipeId', async (req, res) => {
  const { firebaseUid, recipeId } = req.params;

  try {
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);
    await user.save();

    res.status(200).json({ message: 'Recipe removed from favorites.', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites', error });
  }
});

module.exports = router;
