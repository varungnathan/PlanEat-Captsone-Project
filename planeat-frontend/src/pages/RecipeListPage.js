// planeat-frontend\src\pages\RecipeListPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const params = {
          search: searchTerm,
          type: filterType,
          sort: sortType,
        };

        const response = await axios.get('${process.env.REACT_APP_BACKEND_URL}/api/recipes', {
          params,
        });
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [searchTerm, filterType, sortType]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Our Recipes</h1>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <select
          className="form-control"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Mixed">Mixed</option>
        </select>
      </div>

      <div className="mb-4">
        <select
          className="form-control"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4" key={recipe._id}>
            <div className="card mb-4">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
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

export default RecipeListPage;
