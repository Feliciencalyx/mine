import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, CheckCircle, BookOpen } from 'lucide-react'
import './LessonView.css'

function LessonView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})

  useEffect(() => {
    fetchLesson()
  }, [id])

  const fetchLesson = async () => {
    try {
      const response = await axios.get(`/api/courses/${id}`) // We'd need a separate endpoint
      // For demo, we'll fetch from course and find lesson
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch lesson:', error)
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    setCompleting(true)
    try {
      await axios.post(`/api/progress/lesson/${id}`, {
        courseId: lesson.course,
        quizScore: calculateQuizScore()
      })
      alert('Lesson completed! 🎉')
      navigate(`/courses/${lesson.course}`)
    } catch (error) {
      console.error('Failed to complete lesson:', error)
      alert('Failed to mark as complete')
    }
    setCompleting(false)
  }

  const calculateQuizScore = () => {
    if (!lesson?.quiz || lesson.quiz.length === 0) return null
    
    let correct = 0
    lesson.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / lesson.quiz.length) * 100)
  }

  if (loading) {
    return <div className="loading">Loading lesson...</div>
  }

  // Demo lesson data
  const demoLesson = {
    title: 'Introduction to Web Security',
    content: `# Introduction to Web Security

Web application security is critical in today's digital landscape. This lesson covers fundamental concepts.

## Key Topics

### The CIA Triad
- **Confidentiality**: Protecting data from unauthorized access
- **Integrity**: Ensuring data accuracy and preventing tampering  
- **Availability**: Keeping systems accessible to authorized users

### Common Vulnerabilities

**Cross-Site Scripting (XSS)**
Attackers inject malicious scripts into web pages:
\`\`\`javascript
// Vulnerable code
element.innerHTML = userInput; // DON'T DO THIS!

// Safe approach
element.textContent = userInput;
\`\`\`

**SQL Injection**
Attackers manipulate database queries:
\`\`\`sql
-- Vulnerable query
SELECT * FROM users WHERE username = '$username'

-- Safe parameterized query
SELECT * FROM users WHERE username = ?
\`\`\`

## Best Practices

1. **Input Validation**: Always validate and sanitize user input
2. **Authentication**: Implement strong authentication mechanisms
3. **Authorization**: Enforce proper access controls
4. **Encryption**: Use HTTPS and encrypt sensitive data
5. **Regular Updates**: Keep dependencies and systems updated

## Next Steps

Practice these concepts in the hands-on labs to reinforce your learning!`,
    quiz: [
      {
        question: 'What does the "C" in CIA Triad stand for?',
        options: ['Confidentiality', 'Certification', 'Configuration', 'Compliance'],
        correctAnswer: 0,
        explanation: 'The CIA Triad consists of Confidentiality, Integrity, and Availability.'
      },
      {
        question: 'Which is the safest way to display user input in HTML?',
        options: ['innerHTML', 'textContent', 'eval()', 'document.write()'],
        correctAnswer: 1,
        explanation: 'textContent safely displays text without interpreting HTML, preventing XSS attacks.'
      }
    ]
  }

  return (
    <div className="lesson-view">
      <div className="container">
        <div className="lesson-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={20} />
            Back to Course
          </button>
          <h1>{demoLesson.title}</h1>
        </div>

        <div className="lesson-content">
          <div className="markdown-content">
            <ReactMarkdown>{demoLesson.content}</ReactMarkdown>
          </div>

          {demoLesson.quiz && demoLesson.quiz.length > 0 && (
            <div className="quiz-section">
              <h2><BookOpen size={24} /> Quiz</h2>
              {demoLesson.quiz.map((q, index) => (
                <div key={index} className="quiz-question">
                  <p className="question-text">{q.question}</p>
                  <div className="quiz-options">
                    {q.options.map((option, optIndex) => (
                      <label key={optIndex} className="quiz-option">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={optIndex}
                          checked={quizAnswers[index] === optIndex}
                          onChange={() => setQuizAnswers({ ...quizAnswers, [index]: optIndex })}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {quizAnswers[index] !== undefined && (
                    <div className={`quiz-feedback ${quizAnswers[index] === q.correctAnswer ? 'correct' : 'incorrect'}`}>
                      {quizAnswers[index] === q.correctAnswer ? (
                        <>
                          <CheckCircle size={18} />
                          <span>Correct! {q.explanation}</span>
                        </>
                      ) : (
                        <span>Incorrect. {q.explanation}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="lesson-actions">
            <button 
              onClick={handleComplete}
              className="btn-primary btn-large"
              disabled={completing}
            >
              <CheckCircle size={20} />
              {completing ? 'Completing...' : 'Mark as Complete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonView
