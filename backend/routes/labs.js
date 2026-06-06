const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getLabs,
  getLab,
  getHint,
  createLab,
  updateLab,
  deleteLab
} = require('../controllers/labController');

router.get('/', getLabs);
router.get('/:id', protect, getLab);
router.get('/:id/hints/:hintIndex', protect, getHint);
router.post('/', protect, authorize('instructor', 'admin'), createLab);
router.put('/:id', protect, authorize('instructor', 'admin'), updateLab);
router.delete('/:id', protect, authorize('admin'), deleteLab);

module.exports = router;
