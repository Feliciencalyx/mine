const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  category: {
    type: String,
    required: true
  },
  objectives: [String],
  scenario: {
    type: String,
    required: true
  },
  hints: [{
    text: String,
    order: Number
  }],
  challenges: [{
    title: String,
    description: String,
    type: String, // flag, command, code
    flag: String, // encrypted or hashed
    points: Number,
    validation: {
      type: String, // exact, regex, function
      value: String
    }
  }],
  environment: {
    type: String,
    enum: ['web', 'linux', 'windows', 'network'],
    default: 'web'
  },
  timeLimit: Number, // in minutes
  points: {
    type: Number,
    default: 100
  },
  completionCount: {
    type: Number,
    default: 0
  },
  successRate: {
    type: Number,
    default: 0
  },
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Lab', labSchema);
