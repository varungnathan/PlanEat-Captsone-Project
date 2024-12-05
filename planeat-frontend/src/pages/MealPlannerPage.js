// planeat-frontend\src\pages\MealPlannerPage.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

function MealPlannerPage() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [userId, setUserId] = useState(null);
  const [mealPlans, setMealPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUserId = useCallback(async () => {
    if (user) {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/firebase/${user.uid}`);
        setUserId(response.data._id);
      } catch (error) {
        setErrorMessage('Failed to load user ID.');
      }
    }
  }, [user]);

  const fetchMealPlans = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/meal-plans/${userId}`);
      const plansWithAdjustedDates = response.data.map((plan) => ({
        ...plan,
        date: new Date(plan.date).toISOString().split('T')[0], // Convert to local ISO format (YYYY-MM-DD)
      }));
      setMealPlans(plansWithAdjustedDates);
    } catch (error) {
      setErrorMessage('Failed to load meal plans.');
    }
  }, [userId]);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserId();
      fetchRecipes();
    }
  }, [user, fetchUserId, fetchRecipes]);

  useEffect(() => {
    if (userId) {
      fetchMealPlans();
    }
  }, [userId, fetchMealPlans]);

  const handleAddMealPlan = async () => {
    if (!selectedDate || !selectedRecipe) {
      setErrorMessage('Please select a date and recipe.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/meal-plans', {
        userId,
        date: new Date(selectedDate).toISOString(), // Ensure the date is saved in UTC
        meals: [{ time: selectedMeal, recipe: selectedRecipe }],
      });

      setSuccessMessage('Meal plan added successfully!');
      fetchMealPlans();
    } catch (error) {
      setErrorMessage('Failed to add meal plan.');
    }
  };

  const handleDeleteMealPlan = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/meal-plans/${id}`);
      setSuccessMessage('Meal plan deleted successfully!');
      fetchMealPlans();
    } catch (error) {
      setErrorMessage('Failed to delete meal plan.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Meal Planner</h2>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <div className="row mb-4">
        <div className="col-md-4">
          <label>Date:</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Meal Time:</label>
          <select
            className="form-control"
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Recipe:</label>
          <select
            className="form-control"
            value={selectedRecipe}
            onChange={(e) => setSelectedRecipe(e.target.value)}
          >
            <option value="">Select a recipe</option>
            {recipes.map((recipe) => (
              <option key={recipe._id} value={recipe._id}>
                {recipe.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-primary mb-4" onClick={handleAddMealPlan}>
        Add to Meal Plan
      </button>

      <h3 className="mb-4">Your Meal Plans</h3>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Meal Time</th>
              <th>Recipe</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mealPlans.map((plan) =>
              plan.meals.map((meal, index) => (
                <tr key={`${plan._id}-${index}`}>
                  <td>{plan.date}</td>
                  <td>{meal.time}</td>
                  <td>{meal.recipe.title}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteMealPlan(plan._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MealPlannerPage;
