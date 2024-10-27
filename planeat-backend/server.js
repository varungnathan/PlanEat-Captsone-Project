const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes'); // Import recipe routes
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from the frontend
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes); // Add recipe routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
