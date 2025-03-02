const express = require('express');
const router = express.Router();
const NutritionEntry = require('../models/NutritionEntry');

// GET all nutrition entries
router.get('/', async (req, res) => {
  try {
    const entries = await NutritionEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new nutrition entry
router.post('/', async (req, res) => {
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
});

// GET summary stats
router.get('/summary', async (req, res) => {
  try {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find entries for today
    const todayEntries = await NutritionEntry.find({
      date: { $gte: today }
    });
    
    // Calculate totals
    const summary = {
      calories: 0,
      protein: 0,
      carbs: 0,
      sugar: 0,
      fat: 0
    };
    
    todayEntries.forEach(entry => {
      summary.calories += entry.calories;
      summary.protein += entry.protein;
      summary.carbs += entry.carbs;
      summary.sugar += entry.sugar;
      summary.fat += entry.fat;
    });
    
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE entry
router.delete('/:id', async (req, res) => {
  try {
    const entry = await NutritionEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    
    await entry.remove();
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;