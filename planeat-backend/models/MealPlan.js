// planeat-backend\models\MealPlan.js

const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  meals: [
    {
      time: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
      recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    },
  ],
}, { timestamps: true });

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);
module.exports = MealPlan;
