import React from 'react';
import { useParams } from 'react-router-dom';

const recipes = [
  {
    id: 1,
    title: "Rustic Fresh Salad",
    description: "A delicious and healthy salad with fresh ingredients.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Refined%20Culinary%20Plate%20of%20Pasta.jpeg?alt=media&token=cb6c9ec7-677c-4464-b3ce-fff1f42fa84c",
    ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Olive Oil", "Salt", "Pepper"],
    instructions: "Chop all the vegetables and mix them in a bowl. Add olive oil, salt, and pepper to taste."
  },
  {
    id: 2,
    title: "Citrus Spectrum",
    description: "A colorful spectrum of citrus fruits, perfect for fresh and zesty meals.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Citrus%20Spectrum%20on%20Dark%20Wood.jpeg?alt=media&token=6480669a-5214-4b01-b138-298eb6d9d761",
    ingredients: ["Orange", "Grapefruit", "Lemon", "Honey", "Mint"],
    instructions: "Slice the citrus fruits and mix them with honey and mint."
  },
  {
    id: 3,
    title: "Summer Refreshment Drinks",
    description: "Cool off with these refreshing summer drinks packed with flavor.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Summer%20Refreshment%20Drinks.jpeg?alt=media&token=7e3672a7-9f9d-46db-93fc-f646ac128e3a",
    ingredients: ["Lemon", "Mint", "Soda Water", "Ice", "Honey"],
    instructions: "Mix all ingredients in a glass and serve with ice."
  }
];

function RecipeDetailsPage() {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} className="img-fluid mb-4" style={{ borderRadius: '10px' }} />
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
