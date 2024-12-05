// planeat-backend\routes\familyMealPlanRoutes.js

const express = require('express');
const FamilyMealPlan = require('../models/FamilyMealPlan');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const familyMealPlans = await FamilyMealPlan.findOne({ userId: req.params.userId }).populate('members.mealPlans.recipe');
    if (!familyMealPlans) {
      return res.status(404).json({ message: 'No family meal plans found' });
    }
    res.json(familyMealPlans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching family meal plans', error });
  }
});

router.post('/', async (req, res) => {
  const { userId, member } = req.body;

  try {
    let familyMealPlan = await FamilyMealPlan.findOne({ userId });

    if (!familyMealPlan) {
      familyMealPlan = new FamilyMealPlan({ userId, members: [member] });
    } else {
      familyMealPlan.members.push(member);
    }

    await familyMealPlan.save();
    res.status(201).json({ message: 'Family meal plan added successfully', familyMealPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error adding family meal plan', error });
  }
});

router.put('/:userId/:memberId', async (req, res) => {
  const { userId, memberId } = req.params;
  const { mealPlan } = req.body;

  try {
    const familyMealPlan = await FamilyMealPlan.findOne({ userId });

    if (!familyMealPlan) {
      return res.status(404).json({ message: 'Family meal plan not found' });
    }

    const member = familyMealPlan.members.id(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    member.mealPlans.push(mealPlan);
    await familyMealPlan.save();

    res.json({ message: 'Meal plan added to member', familyMealPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating family meal plan', error });
  }
});

module.exports = router;
