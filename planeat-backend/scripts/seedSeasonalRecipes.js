// planeat-backend\scripts\seedSeasonalRecipes.js

const mongoose = require('mongoose');
const SeasonalRecipe = require('../models/SeasonalRecipe');
const seasonalRecipes = require('../data/seasonal_recipes.json');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('../config/db');

const seedSeasonalRecipes = async () => {
  try {
    await connectDB();
    await SeasonalRecipe.deleteMany(); // Clear the collection
    await SeasonalRecipe.insertMany(seasonalRecipes);
    console.log('Seasonal recipes seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding seasonal recipes:', error);
    process.exit(1);
  }
};

seedSeasonalRecipes();
