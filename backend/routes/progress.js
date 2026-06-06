const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getCourseProgress,
  completeLesson,
  completeLab,
  getDashboardStats
} = require('../controllers/progressController');

router.get('/dashboard', protect, getDashboardStats);
router.get('/:courseId', protect, getCourseProgress);
router.post('/lesson/:lessonId', protect, completeLesson);
router.post('/lab/:labId', protect, completeLab);

module.exports = router;
