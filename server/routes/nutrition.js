const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const NutritionEntry = require('../models/NutritionEntry');

/**
 * GET all nutrition entries
 */
router.get('/', async (req, res) => {
  try {
    const entries = await NutritionEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST new nutrition entry with input validation
 */
router.post(
  '/',
  [
    body('foodName').notEmpty().withMessage('Food Name is required'),
    body('calories')
      .isNumeric()
      .withMessage('Calories must be a number'),
    body('protein')
      .isNumeric()
      .withMessage('Protein must be a number'),
    body('carbs')
      .isNumeric()
      .withMessage('Carbs must be a number'),
    body('sugar')
      .isNumeric()
      .withMessage('Sugar must be a number'),
    body('fat')
      .isNumeric()
      .withMessage('Fat must be a number'),
    body('date')
      .isISO8601()
      .toDate()
      .withMessage('Date must be a valid ISO8601 date')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors to the client
      return res.status(400).json({ errors: errors.array() });
    }

    const entry = new NutritionEntry({
      foodName: req.body.foodName,
      calories: req.body.calories,
      protein: req.body.protein,
      carbs: req.body.carbs,
      sugar: req.body.sugar,
      fat: req.body.fat,
      date: req.body.date
    });

    try {
      const newEntry = await entry.save();
      res.status(201).json(newEntry);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

/**
 * GET today's summary stats
 */
router.get('/summary', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayEntries = await NutritionEntry.find({
      date: { $gte: today }
    });
    
    // Aggregate nutritional totals
    const summary = todayEntries.reduce(
      (totals, entry) => {
        totals.calories += entry.calories;
        totals.protein += entry.protein;
        totals.carbs += entry.carbs;
        totals.sugar += entry.sugar;
        totals.fat += entry.fat;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0 }
    );
    
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * DELETE a nutrition entry by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const entry = await NutritionEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    
    await entry.remove();
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
