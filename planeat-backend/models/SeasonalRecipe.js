// planeat-backend\models\SeasonalRecipe.js

const mongoose = require('mongoose');

const SeasonalRecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, enum: ['Veg', 'Non-Veg'], required: true },
  tags: [{ type: String }],
  estimatedTime: { type: String },
  nutritionalValues: {
    calories: { type: Number },
    fats: { type: Number },
    carbs: { type: Number },
    proteins: { type: Number },
  },
  history: { type: String },
  specialty: { type: String },
  preparationSteps: { type: [String] },
  oilUsage: { type: String },
  fatMeter: { type: String },
  substitutions: [
    {
      ingredient: { type: String, required: true },
      alternatives: [{ type: String, required: true }],
      notes: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SeasonalRecipe', SeasonalRecipeSchema);
