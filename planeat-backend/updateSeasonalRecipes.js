const mongoose = require('mongoose');
const SeasonalRecipe = require('./models/SeasonalRecipe');
const fs = require('fs');
require('dotenv').config();

const DB_URI = process.env.MONGO_URI;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync('seasonalRecipes.json', 'utf-8')); // Path to your JSON file
    await SeasonalRecipe.insertMany(data);
    console.log('Seasonal recipes data imported successfully.');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error importing data:', err);
    mongoose.connection.close();
  }
};

importData();
