// planeat-frontend\src\pages\SeasonalRecipeDetailsPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../pagestyles/SeasonalRecipeDetailsPage.css';

function SeasonalRecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/seasonal-recipes/${id}`);
        setRecipe(response.data);
        fetchRecommendedProducts(); // Fetch random products directly
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    const fetchRecommendedProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`); // Assuming all products are fetched
        const products = response.data;

        if (products.length > 0) {
          const randomProducts = products
            .sort(() => 0.5 - Math.random()) // Shuffle the array
            .slice(0, 2); // Select the first two random items
          setRecommendedProducts(randomProducts);
        }
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading recipe details...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="img-fluid rounded"
            style={{ maxWidth: '100%', borderRadius: '10px' }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="mb-4">{recipe.title}</h1>
          <p><strong>Type:</strong> {recipe.type}</p>
          <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
          <p><strong>Description:</strong> {recipe.description}</p>
          <p><strong>Estimated Time:</strong> {recipe.estimatedTime}</p>
          <h3>Nutritional Values</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Calories</td>
                <td>{recipe.nutritionalValues.calories}</td>
              </tr>
              <tr>
                <td>Fats</td>
                <td>{recipe.nutritionalValues.fats}</td>
              </tr>
              <tr>
                <td>Carbs</td>
                <td>{recipe.nutritionalValues.carbs}</td>
              </tr>
              <tr>
                <td>Proteins</td>
                <td>{recipe.nutritionalValues.proteins}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="my-5" />

      <div className="row">
        <div className="col-md-8">
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
        <div className="col-md-4">
          <h3>Recommended Seasonal Products</h3>
          {recommendedProducts.length > 0 ? (
            <ul>
              {recommendedProducts.map((product, index) => (
                <li key={index}>
                  <strong>{product.name}</strong>: ${product.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>No products available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeasonalRecipeDetailsPage;
