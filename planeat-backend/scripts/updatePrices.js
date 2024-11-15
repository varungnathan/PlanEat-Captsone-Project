const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productsWithPrices = [
  { name: "Canned Chicken Curry", price: 6.99 },
  { name: "Dehydrated Vegetable Soup", price: 4.99 },
  { name: "Canned Tuna in Olive Oil", price: 8.49 },
  { name: "Instant Ramen Noodles", price: 2.99 },
  { name: "Freeze-Dried Strawberries", price: 5.49 },
  { name: "Canned Spaghetti Bolognese", price: 7.99 },
  { name: "Vacuum-Sealed Paneer Tikka", price: 6.49 },
  { name: "Canned Lentil Soup", price: 4.99 },
  { name: "Jerky (Beef or Chicken)", price: 9.99 },
  { name: "Dehydrated Mango Slices", price: 5.49 },
  { name: "Canned Mushroom Risotto", price: 7.49 },
  { name: "Instant Couscous", price: 3.99 },
  { name: "Canned Chicken Noodle Soup", price: 6.99 },
  { name: "Freeze-Dried Pasta Primavera", price: 6.99 },
  { name: "Canned Sardines in Tomato Sauce", price: 4.99 },
  { name: "Instant Polenta", price: 3.99 },
  { name: "Vacuum-Sealed Falafel Mix", price: 4.49 },
  { name: "Canned Corned Beef", price: 7.99 },
  { name: "Dehydrated Instant Coffee", price: 3.49 },
  { name: "Canned Black Beans", price: 3.99 },
];

const updatePrices = async () => {
  try {
    for (const product of productsWithPrices) {
      await Product.updateOne({ name: product.name }, { $set: { price: product.price } });
    }
    console.log('Prices updated successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating prices:', error);
    mongoose.connection.close();
  }
};

updatePrices();
