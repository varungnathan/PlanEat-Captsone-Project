// planeat-backend\migrations\migration.js

const mongoose = require('mongoose');
const Cart = require('../models/Cart'); // Corrected path for Cart model
const User = require('../models/User'); // Corrected path for User model
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async function migrate() {
  try {
    console.log('Starting migration...');
    const carts = await Cart.find();

    for (const cart of carts) {
      // Find the user based on firebaseUid
      const user = await User.findOne({ firebaseUid: cart.firebaseUid });
      if (user) {
        cart.userId = user._id; // Assign the user's _id to the cart
        await cart.save(); // Save the updated cart
        console.log(`Updated cart for user with firebaseUid: ${cart.firebaseUid}`);
      } else {
        console.warn(`No user found for firebaseUid: ${cart.firebaseUid}`);
      }
    }

    console.log('Migration completed successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error during migration:', error);
    mongoose.connection.close();
  }
})();
