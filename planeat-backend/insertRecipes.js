// planeat-backend\insertRecipes.js

const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Corrected the path to the Recipe model

const MONGO_URI = 'mongodb+srv://planeat:4rtaiqnQ@planeats.xfmhd.mongodb.net/PlanEatDB?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

const recipes = [
  {
    title: "Rustic Fresh Salad",
    description: "A delicious and healthy salad with fresh ingredients.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Refined%20Culinary%20Plate%20of%20Pasta.jpeg?alt=media&token=cb6c9ec7-677c-4464-b3ce-fff1f42fa84c",
    ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Olive Oil", "Salt", "Pepper"],
    instructions: "Chop all the vegetables and mix them in a bowl. Add olive oil, salt, and pepper to taste.",
    type: "Veg"
  },
  {
    title: "Citrus Spectrum",
    description: "A colorful spectrum of citrus fruits, perfect for fresh and zesty meals.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Citrus%20Spectrum%20on%20Dark%20Wood.jpeg?alt=media&token=6480669a-5214-4b01-b138-298eb6d9d761",
    ingredients: ["Orange", "Grapefruit", "Lemon", "Honey", "Mint"],
    instructions: "Slice the citrus fruits and mix them with honey and mint.",
    type: "Veg"
  },
  {
    title: "Summer Refreshment Drinks",
    description: "Cool off with these refreshing summer drinks packed with flavor.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Summer%20Refreshment%20Drinks.jpeg?alt=media&token=7e3672a7-9f9d-46db-93fc-f646ac128e3a",
    ingredients: ["Lemon", "Mint", "Soda Water", "Ice", "Honey"],
    instructions: "Mix all ingredients in a glass and serve with ice.",
    type: "Veg" // Changed from 'Other' to 'Veg'
  },
  {
    title: "Mouthwatering Hamburger",
    description: "A juicy and delicious hamburger with all the right toppings.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Mouthwatering%20Hamburger%20Close-Up.jpeg?alt=media&token=1f4decad-e279-4dbd-8ccb-fa323816823d",
    ingredients: ["Ground Beef", "Lettuce", "Tomatoes", "Cheese", "Onions", "Pickles"],
    instructions: "Grill the beef patties and assemble the burger with the toppings.",
    type: "Non-Veg"
  },
  {
    title: "Grilled Chicken Salad",
    description: "Healthy grilled chicken served on a bed of fresh greens.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Grilled-Chicken-Salad.jpeg?alt=media&token=demo-token",
    ingredients: ["Grilled Chicken", "Lettuce", "Tomatoes", "Cucumber", "Olive Oil", "Salt", "Pepper"],
    instructions: "Grill the chicken and toss with greens and vegetables.",
    type: "Non-Veg"
  },
  {
    title: "Avocado Toast",
    description: "A perfect breakfast or snack with mashed avocado on toasted bread.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Avocado-Toast.jpeg?alt=media&token=demo-token",
    ingredients: ["Avocado", "Toast", "Lemon Juice", "Salt", "Pepper"],
    instructions: "Mash avocado, season with lemon juice, salt, and pepper, and spread on toast.",
    type: "Veg"
  },
  {
    title: "Spaghetti Carbonara",
    description: "A classic Italian dish made with eggs, cheese, pancetta, and pepper.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Spaghetti-Carbonara.jpeg?alt=media&token=demo-token",
    ingredients: ["Spaghetti", "Eggs", "Parmesan", "Pancetta", "Black Pepper"],
    instructions: "Cook spaghetti, and mix with a creamy sauce made from eggs and cheese, with pancetta.",
    type: "Non-Veg"
  },
  {
    title: "Vegan Stir-Fry",
    description: "A healthy stir-fry packed with vegetables and tofu.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegan-Stir-Fry.jpeg?alt=media&token=demo-token",
    ingredients: ["Tofu", "Broccoli", "Bell Peppers", "Soy Sauce", "Ginger", "Garlic"],
    instructions: "Stir-fry tofu and vegetables in a wok with soy sauce, ginger, and garlic.",
    type: "Veg"
  },
  {
    title: "Baked Salmon",
    description: "A simple yet elegant dish of salmon fillets baked with herbs.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Baked-Salmon.jpeg?alt=media&token=demo-token",
    ingredients: ["Salmon", "Olive Oil", "Lemon", "Garlic", "Dill"],
    instructions: "Bake the salmon with olive oil, lemon, garlic, and dill until tender.",
    type: "Non-Veg"
  },
  {
    title: "Vegetarian Pizza",
    description: "A homemade pizza loaded with fresh vegetables and cheese.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Vegetarian-Pizza.jpeg?alt=media&token=demo-token",
    ingredients: ["Pizza Dough", "Tomato Sauce", "Cheese", "Bell Peppers", "Onions", "Mushrooms"],
    instructions: "Top the pizza dough with sauce, cheese, and vegetables, then bake.",
    type: "Veg"
  },
  {
    title: "Quinoa Salad",
    description: "A nutritious salad with quinoa, vegetables, and a tangy dressing.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Quinoa-Salad.jpeg?alt=media&token=demo-token",
    ingredients: ["Quinoa", "Cherry Tomatoes", "Cucumbers", "Feta Cheese", "Olives", "Lemon Juice", "Olive Oil"],
    instructions: "Cook quinoa and mix with chopped vegetables, feta, olives, and dressing.",
    type: "Veg"
  },
  {
    title: "Pancakes",
    description: "Fluffy pancakes perfect for a hearty breakfast.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Pancakes.jpeg?alt=media&token=demo-token",
    ingredients: ["Flour", "Milk", "Eggs", "Baking Powder", "Sugar", "Salt", "Butter"],
    instructions: "Mix ingredients to form batter and cook on a griddle until golden brown.",
    type: "Veg"
  },
  {
    title: "Beef Stroganoff",
    description: "Creamy beef dish served over egg noodles.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Beef-Stroganoff.jpeg?alt=media&token=demo-token",
    ingredients: ["Beef Strips", "Mushrooms", "Onions", "Sour Cream", "Beef Broth", "Egg Noodles"],
    instructions: "Cook beef with mushrooms and onions, then stir in sour cream and serve over noodles.",
    type: "Non-Veg"
  },
  {
    title: "Eggplant Parmesan",
    description: "Breaded eggplant slices baked with marinara and cheese.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Eggplant-Parmesan.jpeg?alt=media&token=demo-token",
    ingredients: ["Eggplant", "Breadcrumbs", "Parmesan Cheese", "Mozzarella", "Marinara Sauce", "Eggs"],
    instructions: "Bread and bake eggplant slices, layer with sauce and cheese, then bake until bubbly.",
    type: "Veg"
  },
  {
    title: "Grilled Chicken",
    description: "Juicy grilled chicken breasts marinated with herbs.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/Grilled-Chicken.jpeg?alt=media&token=demo-token",
    ingredients: ["Chicken Breasts", "Olive Oil", "Lemon", "Garlic", "Herbs", "Salt", "Pepper"],
    instructions: "Marinate chicken in olive oil, lemon, garlic, and herbs, then grill until cooked through.",
    type: "Non-Veg"
  }
];

const insertRecipes = async () => {
  try {
    await Recipe.insertMany(recipes);
    console.log('15 recipes inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting recipes:', error);
    mongoose.connection.close();
  }
};

insertRecipes();