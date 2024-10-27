const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

router.get('/search', async (req, res) => {
    const { search, type, sort } = req.query;

    try {
        let query = {};

        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            };
        }

        if (type) {
            query.type = type;
        }

        let recipes = Recipe.find(query);

        if (sort === 'title') {
            recipes = recipes.sort({ title: 1 });
        } else if (sort === 'date') {
            recipes = recipes.sort({ createdAt: -1 });
        }

        const result = await recipes.exec();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error searching and filtering recipes' });
    }
});

module.exports = router;