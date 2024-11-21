const mongoose = require('mongoose');
const MealPlan = require('../models/MealPlan');

const createMealPlan = async (req, res) => {
  const { userId, date, meals } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  try {
    const newMealPlan = new MealPlan({ userId, date, meals });
    await newMealPlan.save();
    res.status(201).json(newMealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMealPlans = async (req, res) => {
  const { userId } = req.params;

  try {
    const mealPlans = await MealPlan.find({ userId }).populate('meals.recipe');
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMealPlan = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMealPlan = await MealPlan.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.status(200).json(updatedMealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMealPlan = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMealPlan = await MealPlan.findByIdAndDelete(id);
    if (!deletedMealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.status(200).json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMealPlan,
  getMealPlans,
  updateMealPlan,
  deleteMealPlan,
};
