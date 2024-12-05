// planeat-backend\routes\productRoutes.js

const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details' });
  }
});

router.post('/', async (req, res) => {
  const { name, calories, ingredients, shortDescription, longDescription, imageUrl, origin, type, price } = req.body;

  try {
    const newProduct = new Product({
      name,
      calories,
      ingredients,
      shortDescription,
      longDescription,
      imageUrl,
      origin,
      type,
      price,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

module.exports = router;
