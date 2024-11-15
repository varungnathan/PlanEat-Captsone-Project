const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const products = require('./products.json');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const insertProducts = async () => {
  try {
    await Product.insertMany(products);
    console.log('Products inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting products:', error);
    mongoose.connection.close();
  }
};

insertProducts();
