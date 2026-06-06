const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Lab = require('../models/Lab');
const Progress = require('../models/Progress');
const User = require('../models/User');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let query = { isPublished: true };

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(query)
      .populate('instructor', 'username profile')
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'username profile')
      .populate('lessons')
      .populate('labs');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    
    // Check if already enrolled
    const alreadyEnrolled = user.enrolledCourses.some(
      ec => ec.course.toString() === course._id.toString()
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add to user's enrolled courses
    user.enrolledCourses.push({ course: course._id });
    await user.save();

    // Create progress entry
    await Progress.create({
      user: user._id,
      course: course._id
    });

    // Increment enrollment count
    course.enrollmentCount += 1;
    await course.save();

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's enrolled courses
// @route   GET /api/courses/enrolled
// @access  Private
exports.getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'enrolledCourses.course',
        populate: { path: 'instructor', select: 'username profile' }
      });

    const progressData = await Progress.find({ user: req.user._id })
      .populate('course');

    // Merge enrollment and progress data
    const enrolledWithProgress = user.enrolledCourses.map(ec => {
      const progress = progressData.find(p => 
        p.course._id.toString() === ec.course._id.toString()
      );
      return {
        ...ec.toObject(),
        progress: progress ? progress.progressPercentage : 0,
        lastAccessed: progress ? progress.lastAccessedAt : ec.enrolledAt
      };
    });

    res.json(enrolledWithProgress);
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create course (Admin/Instructor)
// @route   POST /api/courses
// @access  Private/Admin/Instructor
exports.createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.user._id,
      slug: req.body.title.toLowerCase().replace(/\s+/g, '-')
    };

    const course = await Course.create(courseData);
    res.status(201).json(course);
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin/Instructor
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check ownership
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(course, req.body);
    await course.save();

    res.json(course);
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.deleteOne();
    res.json({ message: 'Course deleted' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
