// planeat-backend\routes\cartRoutes.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const User = require('../models/User');

router.post('/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let cart = await Cart.findOne({ firebaseUid });
    if (!cart) {
      cart = new Cart({ firebaseUid, userId: user._id, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ firebaseUid }).populate('items.productId');
    res.status(200).json({ items: updatedCart.items });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
});

router.get('/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;

  try {
    const cart = await Cart.findOne({ firebaseUid }).populate('items.productId');
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json({ items: cart.items });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

router.put('/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;
  const { productId, delta } = req.body;

  try {
    const cart = await Cart.findOne({ firebaseUid });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((item) => item.productId.toString() === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
      }
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ firebaseUid }).populate('items.productId');
    res.status(200).json({ items: updatedCart.items });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error });
  }
});

router.delete('/:firebaseUid/:productId', async (req, res) => {
  const { firebaseUid, productId } = req.params;

  try {
    const cart = await Cart.findOne({ firebaseUid });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    const updatedCart = await Cart.findOne({ firebaseUid }).populate('items.productId');
    res.status(200).json({ items: updatedCart.items });
  } catch (error) {
    res.status(500).json({ message: 'Error removing cart item', error });
  }
});

router.delete('/clear/:cartId', async (req, res) => {
  const { cartId } = req.params;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
});

router.post('/checkout/:cartId', async (req, res) => {
  const { cartId } = req.params;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Checkout completed and cart cleared successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error during checkout', error });
  }
});

module.exports = router;
