const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🏆'
  },
  category: {
    type: String,
    enum: ['course', 'lab', 'streak', 'special'],
    default: 'course'
  },
  requirement: {
    type: String, // e.g., 'complete_10_courses', 'solve_50_labs'
    value: Number
  },
  points: {
    type: Number,
    default: 50
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema);
