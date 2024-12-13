// planeat-backend\updateSeasonalRecipes.js

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const SeasonalRecipe = require('./models/SeasonalRecipe');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const updateData = async () => {
  try {
    const filePath = path.join(__dirname, 'seasonalRecipesWithSubstitutions.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    for (const recipe of data) {
      await SeasonalRecipe.findByIdAndUpdate(
        recipe._id.$oid, // MongoDB ObjectID from JSON
        { substitutions: recipe.substitutions }, // Only update the substitutions field
        { new: true, upsert: false } // Update if found, do not create new
      );
    }

    console.log('Substitutions updated successfully!');
    process.exit();
  } catch (error) {
    console.error('Error updating substitutions:', error);
    process.exit(1);
  }
};

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    await updateData();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

start();
