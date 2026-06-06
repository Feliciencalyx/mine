import { useState, useEffect } from 'react'
import axios from 'axios'
import { Users, BookOpen, Target, Award, TrendingUp } from 'lucide-react'
import './AdminPanel.css'

function AdminPanel() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalLabs: 0,
    totalEnrollments: 0
  })

  useEffect(() => {
    // In a real app, fetch admin stats from API
    setStats({
      totalUsers: 156,
      totalCourses: 12,
      totalLabs: 45,
      totalEnrollments: 523
    })
  }, [])

  const adminStats = [
    {
      icon: <Users size={32} />,
      label: 'Total Users',
      value: stats.totalUsers,
      color: '#3b82f6'
    },
    {
      icon: <BookOpen size={32} />,
      label: 'Total Courses',
      value: stats.totalCourses,
      color: '#10b981'
    },
    {
      icon: <Target size={32} />,
      label: 'Total Labs',
      value: stats.totalLabs,
      color: '#f59e0b'
    },
    {
      icon: <TrendingUp size={32} />,
      label: 'Enrollments',
      value: stats.totalEnrollments,
      color: '#8b5cf6'
    }
  ]

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your cybersecurity training platform</p>
        </div>

        <div className="admin-stats-grid">
          {adminStats.map((stat, index) => (
            <div key={index} className="admin-stat-card">
              <div className="admin-stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="admin-stat-info">
                <div className="admin-stat-value">{stat.value}</div>
                <div className="admin-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-section">
          <h2>Quick Actions</h2>
          <div className="admin-actions">
            <button className="admin-action-btn">
              <BookOpen size={20} />
              Create New Course
            </button>
            <button className="admin-action-btn">
              <Target size={20} />
              Create New Lab
            </button>
            <button className="admin-action-btn">
              <Award size={20} />
              Create Achievement
            </button>
            <button className="admin-action-btn">
              <Users size={20} />
              Manage Users
            </button>
          </div>
        </div>

        <div className="admin-placeholder">
          <Award size={64} />
          <h3>Admin Features Coming Soon</h3>
          <p>Full course management, user analytics, and content creation tools</p>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
