const Progress = require('../models/Progress');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Lab = require('../models/Lab');
const User = require('../models/User');

// @desc    Get course progress
// @route   GET /api/progress/:courseId
// @access  Private
exports.getCourseProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.user._id,
      course: req.params.courseId
    })
      .populate('completedLessons.lesson')
      .populate('completedLabs.lab')
      .populate('currentLesson');

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark lesson as complete
// @route   POST /api/progress/lesson/:lessonId
// @access  Private
exports.completeLesson = async (req, res) => {
  try {
    const { courseId, quizScore } = req.body;
    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    let progress = await Progress.findOne({
      user: req.user._id,
      course: courseId
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.user._id,
        course: courseId
      });
    }

    // Check if already completed
    const alreadyCompleted = progress.completedLessons.some(
      cl => cl.lesson.toString() === lesson._id.toString()
    );

    if (!alreadyCompleted) {
      progress.completedLessons.push({
        lesson: lesson._id,
        quizScore: quizScore || null
      });

      // Calculate progress
      const course = await Course.findById(courseId);
      const totalItems = course.lessons.length + course.labs.length;
      const completedItems = progress.completedLessons.length + progress.completedLabs.length;
      progress.progressPercentage = Math.round((completedItems / totalItems) * 100);

      // Update user stats
      const user = await User.findById(req.user._id);
      user.stats.totalPoints += 10; // Points for completing lesson
      await user.save();

      await progress.save();
    }

    progress.lastAccessedAt = Date.now();
    await progress.save();

    res.json(progress);
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Submit lab solution
// @route   POST /api/progress/lab/:labId
// @access  Private
exports.completeLab = async (req, res) => {
  try {
    const { courseId, flag, timeSpent } = req.body;
    const lab = await Lab.findById(req.params.labId);

    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    let progress = await Progress.findOne({
      user: req.user._id,
      course: courseId
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.user._id,
        course: courseId
      });
    }

    // Validate flag
    const isCorrect = lab.challenges.some(c => c.flag === flag);

    if (isCorrect) {
      // Check if already completed
      const alreadyCompleted = progress.completedLabs.some(
        cl => cl.lab.toString() === lab._id.toString()
      );

      if (!alreadyCompleted) {
        progress.completedLabs.push({
          lab: lab._id,
          score: lab.points,
          timeSpent: timeSpent || 0,
          attempts: 1
        });

        // Update lab stats
        lab.completionCount += 1;
        await lab.save();

        // Calculate progress
        const course = await Course.findById(courseId);
        const totalItems = course.lessons.length + course.labs.length;
        const completedItems = progress.completedLessons.length + progress.completedLabs.length;
        progress.progressPercentage = Math.round((completedItems / totalItems) * 100);

        // Update user stats
        const user = await User.findById(req.user._id);
        user.stats.totalPoints += lab.points;
        user.stats.labsCompleted += 1;
        await user.save();

        await progress.save();
      }

      res.json({ 
        success: true, 
        message: 'Lab completed!', 
        points: lab.points,
        progress 
      });
    } else {
      res.json({ 
        success: false, 
        message: 'Incorrect flag. Try again!' 
      });
    }
  } catch (error) {
    console.error('Complete lab error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user dashboard stats
// @route   GET /api/progress/dashboard
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('achievements');
    const progressData = await Progress.find({ user: req.user._id })
      .populate('course', 'title thumbnail')
      .sort({ lastAccessedAt: -1 });

    const stats = {
      user: {
        username: user.username,
        profile: user.profile,
        stats: user.stats,
        achievements: user.achievements
      },
      totalCourses: user.enrolledCourses.length,
      coursesInProgress: progressData.filter(p => !p.isCompleted).length,
      coursesCompleted: user.stats.coursesCompleted,
      labsCompleted: user.stats.labsCompleted,
      totalPoints: user.stats.totalPoints,
      currentStreak: user.stats.currentStreak,
      recentProgress: progressData.slice(0, 5)
    };

    res.json(stats);
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
