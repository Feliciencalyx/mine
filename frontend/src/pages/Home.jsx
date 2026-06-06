import { Link } from 'react-router-dom'
import { Shield, Target, Award, Users, ArrowRight } from 'lucide-react'
import './Home.css'

function Home() {
  const features = [
    {
      icon: <Target size={40} />,
      title: 'Hands-On Labs',
      description: 'Practice real-world cybersecurity scenarios in safe, isolated environments'
    },
    {
      icon: <Award size={40} />,
      title: 'Gamified Learning',
      description: 'Earn points, badges, and climb leaderboards as you progress through courses'
    },
    {
      icon: <Users size={40} />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of security experience'
    },
    {
      icon: <Shield size={40} />,
      title: 'Career Ready',
      description: 'Build skills that employers are looking for in cybersecurity professionals'
    }
  ]

  const stats = [
    { label: 'Active Students', value: '10K+' },
    { label: 'Expert Courses', value: '50+' },
    { label: 'Hands-on Labs', value: '200+' },
    { label: 'Success Rate', value: '95%' }
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Master Cybersecurity
              <span className="gradient-text"> Through Practice</span>
            </h1>
            <p className="hero-subtitle">
              Learn offensive and defensive security techniques with hands-on labs,
              real-world scenarios, and expert guidance. Start your journey today.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn-primary btn-large">
                Start Learning Free
                <ArrowRight size={20} />
              </Link>
              <Link to="/courses" className="btn-secondary btn-large">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose CyberSec Academy?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Security Journey?</h2>
            <p>Join thousands of students learning cybersecurity skills</p>
            <Link to="/register" className="btn-primary btn-large">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
