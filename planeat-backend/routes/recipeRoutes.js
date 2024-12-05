// planeat-backend\routes\recipeRoutes.js

const express = require('express');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const router = express.Router();
 
router.get('/', async (req, res) => {
  const { search, type, sort } = req.query;
 
  try {
    let query = {};
 
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      };
    }
 
    if (type) {
      query.type = type;
    }
 
    let recipes = Recipe.find(query);
 
    if (sort === 'title') {
      recipes = recipes.sort({ title: 1 });
    } else if (sort === 'date') {
      recipes = recipes.sort({ createdAt: -1 });
    }
 
    const result = await recipes.exec();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error searching and filtering recipes' });
  }
});
 
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('reviews.userId', 'name');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
 
    const averageRating =
      recipe.reviews.reduce((sum, review) => sum + review.rating, 0) / recipe.reviews.length || 0;
    res.json({ ...recipe.toObject(), averageRating });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipe details' });
  }
});
 
router.post('/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const { userId, rating, comment } = req.body;
 
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
 
    const user = await User.findOne({ firebaseUid: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
 
    const existingReview = recipe.reviews.find((review) => review.userId.toString() === user._id.toString());
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this recipe' });
    }
 
    const review = {
      userId: user._id,
      rating,
      comment,
    };
 
    recipe.reviews.push(review);
    recipe.averageRating =
      recipe.reviews.reduce((sum, review) => sum + review.rating, 0) / recipe.reviews.length;
 
    await recipe.save();
    res.status(201).json({ message: 'Review added successfully', reviews: recipe.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding review', error });
  }
});
 
module.exports = router;