// planeat-backend\seeds\seasonalRecipesSeed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SeasonalRecipe = require('../models/SeasonalRecipe');

dotenv.config();

const sampleRecipes = [
  {
    title: "Winter Warmth Soup",
    description: "A hearty soup perfect for cold winter evenings, filled with seasonal vegetables and herbs.",
    imageUrl: "https://example.com/winter-warmth-soup.jpg",
    type: "Veg",
    tags: ["Winter", "Healthy", "Comfort Food"],
    estimatedTime: "45 minutes",
    nutritionalValues: {
      calories: 200,
      fats: 10,
      carbs: 25,
      proteins: 5,
    },
    history: "This soup has been a winter staple in many households, passed down through generations.",
    specialty: "Made with fresh, locally sourced winter vegetables.",
    preparationSteps: [
      "Start by gathering all your ingredients: fresh carrots, celery, potatoes, onions, and garlic, along with vegetable broth and seasoning.",
      "Peel and dice the vegetables into uniform pieces to ensure even cooking. Finely mince the garlic and chop the onions.",
      "Heat a large pot over medium heat and add 2 tablespoons of olive oil. Once the oil is hot, sauté the onions and garlic until fragrant and translucent, about 5 minutes.",
      "Add the diced vegetables to the pot and stir well to coat them with the oil. Cook for another 10 minutes, stirring occasionally, to allow the flavors to develop.",
      "Pour in the vegetable broth, ensuring the vegetables are fully submerged. Bring the mixture to a boil, then reduce the heat to a gentle simmer.",
      "Let the soup simmer for 30 minutes or until the vegetables are tender. Stir occasionally to prevent sticking.",
      "Using an immersion blender, blend the soup partially, leaving some chunks for texture. Adjust the seasoning with salt and pepper to taste.",
      "Serve the soup hot with a garnish of fresh parsley and a side of crusty bread."
    ],
    oilUsage: "2 tablespoons",
    fatMeter: "Low Fat",
  },
  {
    title: "Spring Green Salad",
    description: "A refreshing salad packed with spring greens and a zesty lemon dressing.",
    imageUrl: "https://example.com/spring-green-salad.jpg",
    type: "Veg",
    tags: ["Spring", "Light", "Quick"],
    estimatedTime: "15 minutes",
    nutritionalValues: {
      calories: 150,
      fats: 8,
      carbs: 10,
      proteins: 3,
    },
    history: "A modern take on traditional salads, focusing on fresh and vibrant spring greens.",
    specialty: "The salad highlights seasonal produce and a tangy homemade dressing.",
    preparationSteps: [
      "Rinse all greens thoroughly under cold water to remove any dirt. Pat them dry with a clean kitchen towel or use a salad spinner.",
      "Chop the greens into bite-sized pieces and place them in a large salad bowl. Include fresh arugula, spinach, and romaine lettuce for variety.",
      "Prepare the dressing by whisking together fresh lemon juice, olive oil, Dijon mustard, honey, salt, and pepper in a small bowl until emulsified.",
      "Slice radishes and cucumbers thinly and add them to the bowl for a crunchy texture. Toss in cherry tomatoes for a burst of color.",
      "Drizzle the dressing over the salad and gently toss to coat all the greens evenly.",
      "Serve immediately, garnished with crumbled feta cheese or toasted nuts for added flavor and texture."
    ],
    oilUsage: "2 tablespoons",
    fatMeter: "Low Fat",
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await SeasonalRecipe.deleteMany({});
    await SeasonalRecipe.insertMany(sampleRecipes);
    console.log("Seasonal recipes seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("Error seeding seasonal recipes:", error);
    process.exit(1);
  }
};

seedDatabase();
