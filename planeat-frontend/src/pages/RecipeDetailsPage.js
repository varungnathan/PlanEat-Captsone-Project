import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        setError('Recipe not found.');
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <div>{error}</div>;

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{recipe.title}</h1>
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="img-fluid mb-4"
        style={{ borderRadius: '10px' }}
      />
      <p>{recipe.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetailsPage;
