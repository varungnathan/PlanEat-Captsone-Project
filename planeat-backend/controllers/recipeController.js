const Recipe = require('../models/Recipe');

const addRecipe = async (req, res) => {
  const { title, description, imageUrl, ingredients, instructions } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      description,
      imageUrl,
      ingredients,
      instructions,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addRecipe, getRecipes };
