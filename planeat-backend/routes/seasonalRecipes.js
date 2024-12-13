const express = require('express');
const router = express.Router();
const SeasonalRecipe = require('../models/SeasonalRecipe');

// Create a new seasonal recipe
router.post('/', async (req, res) => {
  try {
    const recipe = new SeasonalRecipe(req.body);
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all seasonal recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await SeasonalRecipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get featured seasonal recipes (limit to 3)
router.get('/featured', async (req, res) => {
  try {
    const featuredRecipes = await SeasonalRecipe.find().limit(3); // Limit to 3 recipes
    res.status(200).json(featuredRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching featured seasonal recipes' });
  }
});

// Get a specific seasonal recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await SeasonalRecipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a seasonal recipe
router.put('/:id', async (req, res) => {
  try {
    const updatedRecipe = await SeasonalRecipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a seasonal recipe
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecipe = await SeasonalRecipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
