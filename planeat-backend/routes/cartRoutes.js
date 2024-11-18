const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.post('/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ firebaseUid });
    if (!cart) {
      cart = new Cart({ firebaseUid, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ firebaseUid }).populate('items.productId'); // Populate product details
    res.status(200).json({ items: updatedCart.items });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
});

router.get('/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;

  try {
    const cart = await Cart.findOne({ firebaseUid }).populate('items.productId'); // Populate product details
    if (!cart) {
      return res.status(200).json({ items: [] }); // Return empty items if no cart exists
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
    const updatedCart = await Cart.findOne({ firebaseUid }).populate('items.productId'); // Populate product details
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

    const updatedCart = await Cart.findOne({ firebaseUid }).populate('items.productId'); // Populate product details
    res.status(200).json({ items: updatedCart.items });
  } catch (error) {
    res.status(500).json({ message: 'Error removing cart item', error });
  }
});

module.exports = router;
