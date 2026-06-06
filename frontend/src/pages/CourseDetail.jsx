import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Clock, BookOpen, Target, Award, Play, Lock, CheckCircle } from 'lucide-react'
import './CourseDetail.css'

function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    fetchCourseData()
  }, [id])

  const fetchCourseData = async () => {
    try {
      const courseRes = await axios.get(`/api/courses/${id}`)
      setCourse(courseRes.data)

      try {
        const progressRes = await axios.get(`/api/progress/${id}`)
        setProgress(progressRes.data)
      } catch (err) {
        // Not enrolled yet
        setProgress(null)
      }

      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch course:', error)
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    setEnrolling(true)
    try {
      await axios.post(`/api/courses/${id}/enroll`)
      await fetchCourseData()
    } catch (error) {
      console.error('Failed to enroll:', error)
      alert(error.response?.data?.message || 'Failed to enroll')
    }
    setEnrolling(false)
  }

  const isLessonCompleted = (lessonId) => {
    return progress?.completedLessons?.some(cl => cl.lesson._id === lessonId || cl.lesson === lessonId)
  }

  const isLabCompleted = (labId) => {
    return progress?.completedLabs?.some(cl => cl.lab._id === labId || cl.lab === labId)
  }

  if (loading) {
    return <div className="loading">Loading course...</div>
  }

  if (!course) {
    return <div className="error">Course not found</div>
  }

  return (
    <div className="course-detail">
      <div className="course-hero" style={{ backgroundImage: `url(${course.thumbnail})` }}>
        <div className="course-hero-overlay">
          <div className="container">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div className="course-meta">
              <span><Clock size={16} /> {course.duration} hours</span>
              <span><BookOpen size={16} /> {course.lessons?.length || 0} lessons</span>
              <span><Target size={16} /> {course.labs?.length || 0} labs</span>
              <span><Award size={16} /> {course.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="course-body">
          <div className="course-main">
            {!progress ? (
              <div className="enroll-card">
                <h2>Start Learning Today</h2>
                <p>Enroll in this course to access all lessons and labs</p>
                <button 
                  onClick={handleEnroll} 
                  className="btn-primary btn-large"
                  disabled={enrolling}
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              </div>
            ) : (
              <div className="progress-card">
                <div className="progress-info">
                  <h3>Your Progress</h3>
                  <span>{progress.progressPercentage}% Complete</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress.progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            <div className="curriculum">
              <h2>Curriculum</h2>
              
              {course.lessons && course.lessons.length > 0 && (
                <div className="curriculum-section">
                  <h3><BookOpen size={20} /> Lessons</h3>
                  <div className="curriculum-items">
                    {course.lessons.map((lesson, index) => (
                      <div 
                        key={lesson._id} 
                        className={`curriculum-item ${progress ? '' : 'locked'}`}
                      >
                        <div className="item-icon">
                          {isLessonCompleted(lesson._id) ? (
                            <CheckCircle size={20} color="#10b981" />
                          ) : progress || lesson.isPreview ? (
                            <Play size={20} />
                          ) : (
                            <Lock size={20} />
                          )}
                        </div>
                        <div className="item-info">
                          <h4>
                            {index + 1}. {lesson.title}
                          </h4>
                          <span>{lesson.duration} min</span>
                        </div>
                        {(progress || lesson.isPreview) && (
                          <Link 
                            to={`/lessons/${lesson._id}`}
                            className="item-action"
                          >
                            {isLessonCompleted(lesson._id) ? 'Review' : 'Start'}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {course.labs && course.labs.length > 0 && (
                <div className="curriculum-section">
                  <h3><Target size={20} /> Hands-On Labs</h3>
                  <div className="curriculum-items">
                    {course.labs.map((lab, index) => (
                      <div 
                        key={lab._id} 
                        className={`curriculum-item ${progress ? '' : 'locked'}`}
                      >
                        <div className="item-icon">
                          {isLabCompleted(lab._id) ? (
                            <CheckCircle size={20} color="#10b981" />
                          ) : progress ? (
                            <Target size={20} />
                          ) : (
                            <Lock size={20} />
                          )}
                        </div>
                        <div className="item-info">
                          <h4>
                            Lab {index + 1}: {lab.title}
                          </h4>
                          <div className="lab-meta">
                            <span className={`difficulty ${lab.difficulty}`}>
                              {lab.difficulty}
                            </span>
                            <span>{lab.points} points</span>
                          </div>
                        </div>
                        {progress && (
                          <Link 
                            to={`/labs/${lab._id}`}
                            className="item-action"
                          >
                            {isLabCompleted(lab._id) ? 'Retry' : 'Start'}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="course-sidebar">
            <div className="sidebar-card">
              <h3>Instructor</h3>
              <div className="instructor-info">
                <div className="instructor-avatar">
                  {course.instructor.username[0].toUpperCase()}
                </div>
                <div>
                  <div className="instructor-name">{course.instructor.username}</div>
                  <div className="instructor-title">Security Expert</div>
                </div>
              </div>
            </div>

            {course.tags && course.tags.length > 0 && (
              <div className="sidebar-card">
                <h3>Topics Covered</h3>
                <div className="tags">
                  {course.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
