// planeat-frontend\src\pages\SeasonalRecipesPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../pagestyles/SeasonalRecipesPage.css';

function SeasonalRecipesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_BACKEND_URL}/api/seasonal-recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching seasonal recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  if (recipes.length === 0) return <div>Loading seasonal recipes...</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Seasonal Recipes</h1>
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe._id}>
            <div className="card">
              <img
                src={recipe.imageUrl}
                className="card-img-top"
                alt={recipe.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <Link to={`/seasonal-recipes/${recipe._id}`} className="btn btn-primary">
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeasonalRecipesPage;
