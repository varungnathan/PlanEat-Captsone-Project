import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes'); // Fetch recipes from your backend
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Our Recipes</h1>
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4" key={recipe._id}>
            <div className="card mb-4">
              <img src={recipe.imageUrl} alt={recipe.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">View Recipe</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeListPage;
