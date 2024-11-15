const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Add a new product (for testing purposes)
router.post('/', async (req, res) => {
  const { name, calories, ingredients, shortDescription, imageUrl, origin } = req.body;

  try {
    const newProduct = new Product({
      name,
      calories,
      ingredients,
      shortDescription,
      imageUrl,
      origin,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

module.exports = router;
