const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/details/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details' });
  }
});

router.put('/details/:email', async (req, res) => {
  const { phone, address } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { phone, address },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user details' });
  }
});

module.exports = router;
