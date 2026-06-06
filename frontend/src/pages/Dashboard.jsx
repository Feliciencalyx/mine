import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Trophy, BookOpen, Target, TrendingUp, Award, Clock } from 'lucide-react'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/progress/dashboard')
      setStats(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch dashboard:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!stats) {
    return <div className="error">Failed to load dashboard</div>
  }

  const statCards = [
    {
      icon: <BookOpen size={24} />,
      label: 'Courses Enrolled',
      value: stats.totalCourses,
      color: '#3b82f6'
    },
    {
      icon: <Target size={24} />,
      label: 'Labs Completed',
      value: stats.labsCompleted,
      color: '#10b981'
    },
    {
      icon: <Trophy size={24} />,
      label: 'Total Points',
      value: stats.totalPoints,
      color: #fbbf24'
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Current Streak',
      value: `${stats.currentStreak} days`,
      color: '#f97316'
    }
  ]

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {stats.user.profile.firstName || stats.user.username}!</h1>
            <p>Continue your cybersecurity learning journey</p>
          </div>
        </div>

        <div className="stats-overview">
          {statCards.map((stat, index) => (
            <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {stats.user.achievements && stats.user.achievements.length > 0 && (
          <div className="section">
            <h2 className="section-header">
              <Award size={20} />
              Recent Achievements
            </h2>
            <div className="achievements-grid">
              {stats.user.achievements.slice(0, 6).map((achievement) => (
                <div key={achievement._id} className="achievement-badge">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <div className="achievement-title">{achievement.title}</div>
                    <div className="achievement-desc">{achievement.description}</div>
                    <div className="achievement-points">+{achievement.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="section">
          <h2 className="section-header">
            <Clock size={20} />
            Continue Learning
          </h2>
          {stats.recentProgress.length > 0 ? (
            <div className="courses-list">
              {stats.recentProgress.map((progress) => (
                <div key={progress._id} className="course-card">
                  <img 
                    src={progress.course.thumbnail} 
                    alt={progress.course.title}
                    className="course-thumbnail"
                  />
                  <div className="course-info">
                    <h3>{progress.course.title}</h3>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progress.progressPercentage}%` }}
                      />
                    </div>
                    <div className="course-meta">
                      <span>{progress.progressPercentage}% complete</span>
                      <Link 
                        to={`/courses/${progress.course._id}`}
                        className="continue-btn"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <BookOpen size={48} />
              <h3>No courses yet</h3>
              <p>Start learning by enrolling in a course</p>
              <Link to="/courses" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
