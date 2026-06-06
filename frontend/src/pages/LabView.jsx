import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, Target, Lightbulb, Flag, CheckCircle, XCircle } from 'lucide-react'
import './LabView.css'

function LabView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lab, setLab] = useState(null)
  const [loading, setLoading] = useState(true)
  const [flagInput, setFlagInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [hintsRevealed, setHintsRevealed] = useState([])

  useEffect(() => {
    fetchLab()
  }, [id])

  const fetchLab = async () => {
    try {
      const response = await axios.get(`/api/labs/${id}`)
      setLab(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch lab:', error)
      setLoading(false)
    }
  }

  const handleSubmitFlag = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)

    try {
      const response = await axios.post(`/api/progress/lab/${id}`, {
        courseId: lab.course._id || lab.course,
        flag: flagInput,
        timeSpent: 0 // Track this properly in production
      })

      setResult(response.data)
      if (response.data.success) {
        setTimeout(() => {
          navigate(`/courses/${lab.course._id || lab.course}`)
        }, 2000)
      }
    } catch (error) {
      console.error('Failed to submit flag:', error)
      setResult({ success: false, message: 'Submission failed' })
    }
    setSubmitting(false)
  }

  const revealHint = async (index) => {
    if (hintsRevealed.includes(index)) return

    try {
      const response = await axios.get(`/api/labs/${id}/hints/${index}`)
      setHintsRevealed([...hintsRevealed, index])
    } catch (error) {
      console.error('Failed to fetch hint:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading lab...</div>
  }

  if (!lab) {
    return <div className="error">Lab not found</div>
  }

  return (
    <div className="lab-view">
      <div className="container">
        <div className="lab-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={20} />
            Back to Course
          </button>
          <div className="lab-title-section">
            <h1>{lab.title}</h1>
            <div className="lab-badges">
              <span className={`difficulty-badge ${lab.difficulty}`}>
                {lab.difficulty}
              </span>
              <span className="points-badge">
                <Target size={16} />
                {lab.points} points
              </span>
            </div>
          </div>
        </div>

        <div className="lab-layout">
          <div className="lab-main">
            <div className="lab-section">
              <h2>Scenario</h2>
              <p>{lab.scenario}</p>
            </div>

            <div className="lab-section">
              <h2>Objectives</h2>
              <ul className="objectives-list">
                {lab.objectives.map((obj, index) => (
                  <li key={index}>
                    <CheckCircle size={18} />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lab-section lab-environment">
              <h2>Lab Environment</h2>
              <div className="terminal-box">
                <div className="terminal-header">
                  <span className="terminal-title">Simulated Environment</span>
                </div>
                <div className="terminal-body">
                  <p className="terminal-prompt">$ <span className="terminal-text">Welcome to the lab environment</span></p>
                  <p className="terminal-prompt">$ <span className="terminal-text">Type commands to explore the vulnerability</span></p>
                  <p className="terminal-prompt">$ <span className="terminal-text">Find the flag to complete the challenge</span></p>
                  <br />
                  <p className="terminal-hint">💡 In a real lab, you would interact with vulnerable applications here</p>
                </div>
              </div>
            </div>

            <div className="lab-section">
              <h2><Flag size={20} /> Submit Flag</h2>
              <form onSubmit={handleSubmitFlag} className="flag-form">
                <input
                  type="text"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="CTF{...}"
                  className="flag-input"
                  required
                />
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Checking...' : 'Submit Flag'}
                </button>
              </form>

              {result && (
                <div className={`submission-result ${result.success ? 'success' : 'error'}`}>
                  {result.success ? (
                    <>
                      <CheckCircle size={20} />
                      <div>
                        <strong>{result.message}</strong>
                        <p>You earned {result.points} points!</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle size={20} />
                      <span>{result.message}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lab-sidebar">
            <div className="sidebar-card">
              <h3><Lightbulb size={20} /> Hints</h3>
              {lab.hints && lab.hints.length > 0 ? (
                <div className="hints-list">
                  {lab.hints.map((hint, index) => (
                    <div key={index} className="hint-item">
                      {hintsRevealed.includes(index) ? (
                        <p className="hint-text">{hint.text}</p>
                      ) : (
                        <button 
                          onClick={() => revealHint(index)}
                          className="reveal-hint-btn"
                        >
                          Reveal Hint {index + 1}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-hints">No hints available for this lab</p>
              )}
            </div>

            <div className="sidebar-card">
              <h3>Challenges</h3>
              <div className="challenges-list">
                {lab.challenges.map((challenge, index) => (
                  <div key={index} className="challenge-item">
                    <h4>{challenge.title}</h4>
                    <p>{challenge.description}</p>
                    <span className="challenge-points">{challenge.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabView
