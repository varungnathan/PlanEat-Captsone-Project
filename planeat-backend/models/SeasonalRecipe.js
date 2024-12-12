// planeat-backend\models\SeasonalRecipe.js

const mongoose = require('mongoose');

const SeasonalRecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, enum: ['Veg', 'Non-Veg'], required: true },
  tags: [{ type: String }], // E.g., ["Winter", "Healthy", "Quick"]
  estimatedTime: { type: String }, // E.g., "30 minutes"
  nutritionalValues: {
    calories: { type: Number },
    fats: { type: Number },
    carbs: { type: Number },
    proteins: { type: Number },
  },
  history: { type: String }, // E.g., Traditional significance
  specialty: { type: String }, // E.g., Unique to a region or occasion
  preparationSteps: { type: [String] }, // Step-by-step instructions
  oilUsage: { type: String }, // E.g., "2 tablespoons"
  fatMeter: { type: String }, // E.g., "Low Fat", "High Fat"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SeasonalRecipe', SeasonalRecipeSchema);
