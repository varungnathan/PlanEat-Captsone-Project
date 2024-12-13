// planeat-frontend\src\pages\SeasonalRecipeDetailsPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../pagestyles/SeasonalRecipeDetailsPage.css';

function SeasonalRecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/seasonal-recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading recipe details...</div>;

  return (
    <div className="container mt-5">
      <h1>{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} className="img-fluid mb-4" />
      <p><strong>Type:</strong> {recipe.type}</p>
      <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
      <p><strong>Description:</strong> {recipe.description}</p>
      <p><strong>Estimated Time:</strong> {recipe.estimatedTime}</p>
      <h3>Nutritional Values</h3>
      <ul>
        <li>Calories: {recipe.nutritionalValues.calories}</li>
        <li>Fats: {recipe.nutritionalValues.fats}</li>
        <li>Carbs: {recipe.nutritionalValues.carbs}</li>
        <li>Proteins: {recipe.nutritionalValues.proteins}</li>
      </ul>
      <h3>History</h3>
      <p>{recipe.history}</p>
      <h3>Specialty</h3>
      <p>{recipe.specialty}</p>
      <h3>Preparation Steps</h3>
      <ol>
        {recipe.preparationSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p><strong>Oil Usage:</strong> {recipe.oilUsage}</p>
      <p><strong>Fat Meter:</strong> {recipe.fatMeter}</p>

      {recipe.substitutions && recipe.substitutions.length > 0 && (
        <>
          <h3>Ingredient Substitutions</h3>
          <ul>
            {recipe.substitutions.map((substitution, index) => (
              <li key={index}>
                <strong>{substitution.ingredient}</strong>: {substitution.alternatives.join(', ')}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default SeasonalRecipeDetailsPage;
