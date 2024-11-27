import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

function FamilyMealPlannerPage() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [userId, setUserId] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [mealDate, setMealDate] = useState('');
  const [mealTime, setMealTime] = useState('Breakfast');
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/firebase/${user.uid}`);
          setUserId(response.data._id);
        } catch (error) {
          setErrorMessage('Failed to fetch user ID.');
        }
      }
    };

    fetchUserId();
  }, [user]);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/family-meal-plans/${userId}`);
          const familyPlan = response.data;
          setFamilyMembers(familyPlan.members || []);
        } catch (error) {
          setErrorMessage('Failed to fetch family members.');
        }
      }
    };

    fetchFamilyMembers();
  }, [userId]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        setErrorMessage('Failed to fetch recipes.');
      }
    };

    fetchRecipes();
  }, []);

  const addFamilyMember = async (name, relationship) => {
    if (!name || !relationship) {
      setErrorMessage('Name and relationship are required.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/family-meal-plans', {
        userId,
        member: { name, relationship, mealPlans: [] },
      });

      setSuccessMessage('Family member added successfully!');
      setErrorMessage('');
      const updatedFamilyMembers = [
        ...familyMembers,
        { name, relationship, mealPlans: [] },
      ];
      setFamilyMembers(updatedFamilyMembers);
    } catch (error) {
      setErrorMessage('Failed to add family member.');
    }
  };

  const addMealPlan = async () => {
    if (!selectedMember || !mealDate || !selectedRecipe) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/family-meal-plans/${userId}/${selectedMember}`,
        {
          mealPlan: {
            date: new Date(mealDate).toISOString(),
            meals: [{ time: mealTime, recipe: selectedRecipe }],
          },
        }
      );
      setSuccessMessage('Meal plan added successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to add meal plan.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Family Meal Planner</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <h3>Add Family Member</h3>
      <div className="row mb-3">
        <div className="col-md-4">
          <input type="text" id="memberName" className="form-control" placeholder="Name" />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            id="memberRelationship"
            className="form-control"
            placeholder="Relationship"
          />
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary"
            onClick={() =>
              addFamilyMember(
                document.getElementById('memberName').value,
                document.getElementById('memberRelationship').value
              )
            }
          >
            Add Member
          </button>
        </div>
      </div>

      <h3>Add Meal Plan</h3>
      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className="form-control"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            <option value="">Select Member</option>
            {familyMembers.map((member, index) => (
              <option key={index} value={member._id}>
                {member.name} ({member.relationship})
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={mealDate}
            onChange={(e) => setMealDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={selectedRecipe}
            onChange={(e) => setSelectedRecipe(e.target.value)}
          >
            <option value="">Select Recipe</option>
            {recipes.map((recipe) => (
              <option key={recipe._id} value={recipe._id}>
                {recipe.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-primary mb-4" onClick={addMealPlan}>
        Add Meal Plan
      </button>
    </div>
  );
}

export default FamilyMealPlannerPage;
