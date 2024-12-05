// planeat-backend\models\FamilyMealPlan.js

const mongoose = require('mongoose');

const familyMealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [
    {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      mealPlans: [
        {
          date: { type: Date, required: true },
          meals: [
            {
              time: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
              recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
            },
          ],
        },
      ],
    },
  ],
}, { timestamps: true });

const FamilyMealPlan = mongoose.model('FamilyMealPlan', familyMealPlanSchema);
module.exports = FamilyMealPlan;
