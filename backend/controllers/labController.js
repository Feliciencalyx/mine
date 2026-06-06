const Lab = require('../models/Lab');
const Course = require('../models/Course');

// @desc    Get all labs
// @route   GET /api/labs
// @access  Public
exports.getLabs = async (req, res) => {
  try {
    const { category, difficulty, courseId } = req.query;
    let query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (courseId) query.course = courseId;

    const labs = await Lab.find(query)
      .populate('course', 'title')
      .sort({ createdAt: -1 });

    res.json(labs);
  } catch (error) {
    console.error('Get labs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single lab
// @route   GET /api/labs/:id
// @access  Private
exports.getLab = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id).populate('course', 'title');

    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    // Don't send the actual flags to client
    const labData = lab.toObject();
    labData.challenges = labData.challenges.map(c => ({
      title: c.title,
      description: c.description,
      type: c.type,
      points: c.points
    }));

    res.json(labData);
  } catch (error) {
    console.error('Get lab error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get lab hint
// @route   GET /api/labs/:id/hints/:hintIndex
// @access  Private
exports.getHint = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    const hintIndex = parseInt(req.params.hintIndex);

    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    if (hintIndex >= 0 && hintIndex < lab.hints.length) {
      res.json({ hint: lab.hints[hintIndex].text });
    } else {
      res.status(404).json({ message: 'Hint not found' });
    }
  } catch (error) {
    console.error('Get hint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create lab (Admin/Instructor)
// @route   POST /api/labs
// @access  Private/Admin/Instructor
exports.createLab = async (req, res) => {
  try {
    const labData = {
      ...req.body,
      slug: req.body.title.toLowerCase().replace(/\s+/g, '-')
    };

    const lab = await Lab.create(labData);

    // Add lab to course
    const course = await Course.findById(req.body.course);
    if (course) {
      course.labs.push(lab._id);
      await course.save();
    }

    res.status(201).json(lab);
  } catch (error) {
    console.error('Create lab error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update lab
// @route   PUT /api/labs/:id
// @access  Private/Admin/Instructor
exports.updateLab = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);

    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    Object.assign(lab, req.body);
    await lab.save();

    res.json(lab);
  } catch (error) {
    console.error('Update lab error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete lab
// @route   DELETE /api/labs/:id
// @access  Private/Admin
exports.deleteLab = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);

    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    await lab.deleteOne();
    res.json({ message: 'Lab deleted' });
  } catch (error) {
    console.error('Delete lab error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
