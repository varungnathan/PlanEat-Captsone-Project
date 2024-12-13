// planeat-backend\routes\pantryRoutes.js

const express = require('express');
const PantryItem = require('../models/PantryItem');

const router = express.Router();

router.post('/:userId/add', async (req, res) => {
  const { userId } = req.params;
  const { name, quantity, unit, expiryDate, category } = req.body;

  try {
    const newItem = new PantryItem({ userId, name, quantity, unit, expiryDate, category });
    const savedItem = await newItem.save();
    res.status(201).json({ message: 'Pantry item added successfully', savedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding pantry item', error });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const pantryItems = await PantryItem.find({ userId });
    res.status(200).json(pantryItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pantry items', error });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity, unit, expiryDate, category } = req.body;

  try {
    const updatedItem = await PantryItem.findByIdAndUpdate(
      id,
      { name, quantity, unit, expiryDate, category },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Pantry item not found' });

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pantry item', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await PantryItem.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ message: 'Pantry item not found' });

    res.status(200).json({ message: 'Pantry item deleted', deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pantry item', error });
  }
});

module.exports = router;
