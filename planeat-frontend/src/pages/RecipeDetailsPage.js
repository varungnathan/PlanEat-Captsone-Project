import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
 
function RecipeDetailsPage() {
  const { id } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;
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
 
  const handleSaveRecipe = async () => {
    if (!user) {
      alert('Please log in to save recipes.');
      return;
    }
 
    try {
      await axios.post(`http://localhost:5000/api/users/save-recipe/${user.uid}`, {
        recipeId: recipe._id,
      });
      alert('Recipe saved successfully!');
    } catch (error) {
      alert('Failed to save the recipe.');
    }
  };
 
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
      <button className="btn btn-secondary mt-3" onClick={handleSaveRecipe}>
        Save Recipe
      </button>
    </div>
  );
}
 
export default RecipeDetailsPage;
