import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BookOpen, Clock, TrendingUp, Filter } from 'lucide-react'
import './Courses.css'

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ category: '', difficulty: '', search: '' })

  useEffect(() => {
    fetchCourses()
  }, [filter])

  const fetchCourses = async () => {
    try {
      const params = new URLSearchParams()
      if (filter.category) params.append('category', filter.category)
      if (filter.difficulty) params.append('difficulty', filter.difficulty)
      if (filter.search) params.append('search', filter.search)

      const response = await axios.get(`/api/courses?${params}`)
      setCourses(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch courses:', error)
      setLoading(false)
    }
  }

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'web-security', label: 'Web Security' },
    { value: 'network-security', label: 'Network Security' },
    { value: 'cryptography', label: 'Cryptography' },
    { value: 'malware-analysis', label: 'Malware Analysis' },
    { value: 'penetration-testing', label: 'Penetration Testing' }
  ]

  const difficulties = [
    { value: '', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: '#10b981',
      intermediate: '#f59e0b',
      advanced: '#ef4444'
    }
    return colors[difficulty] || '#64748b'
  }

  if (loading) {
    return <div className="loading">Loading courses...</div>
  }

  return (
    <div className="courses-page">
      <div className="container">
        <div className="courses-header">
          <div>
            <h1>Explore Courses</h1>
            <p>Master cybersecurity with expert-led courses and hands-on labs</p>
          </div>
        </div>

        <div className="filters-bar">
          <div className="filter-group">
            <Filter size={18} />
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={filter.difficulty}
              onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
              className="filter-select"
            >
              {difficulties.map(diff => (
                <option key={diff.value} value={diff.value}>{diff.label}</option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Search courses..."
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            className="search-input"
          />
        </div>

        {courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map(course => (
              <Link 
                key={course._id} 
                to={`/courses/${course._id}`}
                className="course-item"
              >
                <div className="course-image">
                  <img src={course.thumbnail} alt={course.title} />
                  <div 
                    className="course-difficulty"
                    style={{ backgroundColor: getDifficultyColor(course.difficulty) }}
                  >
                    {course.difficulty}
                  </div>
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-footer">
                    <div className="course-stats">
                      <span>
                        <Clock size={14} />
                        {course.duration}h
                      </span>
                      <span>
                        <BookOpen size={14} />
                        {course.lessons?.length || 0} lessons
                      </span>
                      <span>
                        <TrendingUp size={14} />
                        {course.enrollmentCount} enrolled
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-courses">
            <BookOpen size={48} />
            <h3>No courses found</h3>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses
