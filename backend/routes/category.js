const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

// Create category
router.post('/', async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all categories with subcategories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().populate('subcategories');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create subcategory
router.post('/:categoryId/subcategories', async (req, res) => {
  try {
    const subcategory = new Subcategory({ name: req.body.name, category: req.params.categoryId });
    await subcategory.save();
    await Category.findByIdAndUpdate(req.params.categoryId, { $push: { subcategories: subcategory._id } });
    res.status(201).json(subcategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
