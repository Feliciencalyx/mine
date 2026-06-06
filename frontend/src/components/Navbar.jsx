import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Shield, BookOpen, Trophy, User, LogOut, LayoutDashboard } from 'lucide-react'
import './Navbar.css'

function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <Shield size={28} />
          <span>CyberSec Academy</span>
        </Link>

        <div className="nav-links">
          <Link to="/courses" className="nav-link">
            <BookOpen size={18} />
            Courses
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              
              {user?.role === 'admin' && (
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              )}

              <div className="nav-user">
                <div className="user-info">
                  <Trophy size={16} />
                  <span>{user?.stats?.totalPoints || 0} pts</span>
                </div>
                <Link to="/profile" className="user-avatar">
                  <User size={20} />
                </Link>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
