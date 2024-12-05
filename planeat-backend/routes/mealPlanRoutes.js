// planeat-backend\routes\mealPlanRoutes.js

const express = require('express');
const { createMealPlan, getMealPlans, updateMealPlan, deleteMealPlan } = require('../controllers/mealPlanController');

const router = express.Router();

router.post('/', createMealPlan);
router.get('/:userId', getMealPlans);
router.put('/:id', updateMealPlan);
router.delete('/:id', deleteMealPlan);

module.exports = router;
