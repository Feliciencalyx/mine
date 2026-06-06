import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { User, Mail, Award, TrendingUp, Save } from 'lucide-react'
import './Profile.css'

function Profile() {
  const { user, updateProfile } = useAuthStore()
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    bio: user?.profile?.bio || ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await updateProfile(formData)
    if (success) {
      setEditing(false)
      alert('Profile updated successfully!')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-grid">
          <div className="profile-card">
            <div className="profile-avatar-large">
              <User size={64} />
            </div>
            <h2>{user?.username}</h2>
            <p className="profile-email">
              <Mail size={16} />
              {user?.email}
            </p>

            <div className="profile-stats">
              <div className="profile-stat">
                <div className="stat-value">{user?.stats?.totalPoints || 0}</div>
                <div className="stat-label">Total Points</div>
              </div>
              <div className="profile-stat">
                <div className="stat-value">{user?.stats?.coursesCompleted || 0}</div>
                <div className="stat-label">Courses</div>
              </div>
              <div className="profile-stat">
                <div className="stat-value">{user?.stats?.labsCompleted || 0}</div>
                <div className="stat-label">Labs</div>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <div className="profile-section">
              <div className="section-header-with-action">
                <h2>Profile Information</h2>
                {!editing && (
                  <button onClick={() => setEditing(true)} className="btn-secondary">
                    Edit Profile
                  </button>
                )}
              </div>

              {editing ? (
                <form onSubmit={handleSubmit} className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      <Save size={18} />
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-item">
                    <strong>Name:</strong>
                    <span>{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="info-item">
                    <strong>Bio:</strong>
                    <span>{formData.bio || 'No bio yet'}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-section">
              <h2>
                <Award size={24} />
                Achievements
              </h2>
              {user?.achievements && user.achievements.length > 0 ? (
                <div className="achievements-grid">
                  {user.achievements.map((achievement) => (
                    <div key={achievement._id} className="achievement-card">
                      <div className="achievement-icon-large">{achievement.icon}</div>
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                      <span className="achievement-points">+{achievement.points} pts</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-achievements">
                  <Award size={48} />
                  <p>No achievements yet. Keep learning!</p>
                </div>
              )}
            </div>

            <div className="profile-section">
              <h2>
                <TrendingUp size={24} />
                Activity Stats
              </h2>
              <div className="stats-grid">
                <div className="stat-box">
                  <span className="stat-label">Current Streak</span>
                  <span className="stat-value">{user?.stats?.currentStreak || 0} days</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Longest Streak</span>
                  <span className="stat-value">{user?.stats?.longestStreak || 0} days</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Enrolled Courses</span>
                  <span className="stat-value">{user?.enrolledCourses?.length || 0}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Total Achievements</span>
                  <span className="stat-value">{user?.achievements?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
