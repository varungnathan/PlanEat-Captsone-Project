const express = require('express');
const { addRecipe, getRecipes } = require('../controllers/recipeController');
const router = express.Router();

// @route POST /api/recipes
// @desc Add a new recipe
router.post('/', addRecipe);

// @route GET /api/recipes
// @desc Get all recipes
router.get('/', getRecipes);

module.exports = router;
