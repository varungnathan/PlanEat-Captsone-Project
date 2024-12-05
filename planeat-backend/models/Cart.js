// planeat-backend\models\Cart.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Foreign key reference to User collection
    ref: 'User', // Name of the User model
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
