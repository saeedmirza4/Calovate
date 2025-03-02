const mongoose = require('mongoose');

const nutritionEntrySchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  carbs: {
    type: Number,
    required: true
  },
  sugar: {
    type: Number,
    required: true
  },
  fat: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: String,
    default: 'default-user' // You can implement proper user auth later
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NutritionEntry', nutritionEntrySchema);