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

// Updated CORS configuration to allow multiple origins
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://675be0dd2eeea400085aeef1--planeat-capstone.netlify.app', // Netlify deployed frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy does not allow access from origin ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
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
