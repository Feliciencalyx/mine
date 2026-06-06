const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'text', 'quiz', 'interactive'],
    default: 'text'
  },
  videoUrl: String,
  duration: Number, // in minutes
  order: {
    type: Number,
    required: true
  },
  resources: [{
    title: String,
    url: String,
    type: String // pdf, link, code
  }],
  quiz: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }],
  isPreview: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lesson', lessonSchema);
