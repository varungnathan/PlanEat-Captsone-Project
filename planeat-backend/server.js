// planeat-backend\server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const familyMealPlanRoutes = require('./routes/familyMealPlanRoutes');
const seasonalRecipesRoutes = require('./routes/seasonalRecipes');
const pantryRoutes = require('./routes/pantryRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://675bede86d6637000868d851--planeat-capstone.netlify.app', // Deployed Netlify URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allows cookies or other credentials
  })
);

app.use(express.json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/family-meal-plans', familyMealPlanRoutes);
app.use('/api/seasonal-recipes', seasonalRecipesRoutes);
app.use('/api/pantry', pantryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
