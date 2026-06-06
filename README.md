# 🛡️ CyberSec Academy - Cybersecurity Training Platform

A comprehensive, full-stack cybersecurity training platform designed to teach offensive and defensive security techniques through interactive lessons and hands-on labs.

![Platform Screenshot](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800)

## ✨ Features

### 🎓 Core Learning Features
- **Interactive Courses**: Expert-led courses covering various cybersecurity domains
- **Hands-On Labs**: Practice real-world scenarios in safe, isolated environments
- **Progress Tracking**: Monitor learning progress with detailed analytics
- **Quiz System**: Test knowledge with interactive quizzes after each lesson
- **Achievement System**: Earn badges and points as you learn

### 🎯 Course Categories
- Web Application Security
- Network Security
- Cryptography
- Malware Analysis
- Penetration Testing
- Incident Response
- Cloud Security
- Mobile Security

### 👥 User Roles
- **Students**: Access courses, complete labs, track progress
- **Instructors**: Create and manage course content
- **Administrators**: Full platform management capabilities

### 🏆 Gamification
- Points system for completing lessons and labs
- Achievement badges for milestones
- Learning streak tracking
- Leaderboard (coming soon)

## 🏗️ Technology Stack

### Backend
- **Node.js & Express**: RESTful API server
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication and authorization
- **Bcrypt**: Password hashing
- **Express Validator**: Input validation
- **Helmet & CORS**: Security middleware

### Frontend
- **React 18**: UI library
- **React Router**: Client-side routing
- **Zustand**: State management
- **Axios**: HTTP client
- **React Markdown**: Markdown rendering
- **Lucide React**: Icons
- **Vite**: Build tool and dev server

## 📁 Project Structure

```
cybersecurity-training-platform/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── courseController.js  # Course management
│   │   ├── labController.js     # Lab management
│   │   └── progressController.js # Progress tracking
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── errorHandler.js      # Global error handling
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Course.js            # Course schema
│   │   ├── Lesson.js            # Lesson schema
│   │   ├── Lab.js               # Lab schema
│   │   ├── Progress.js          # Progress tracking
│   │   └── Achievement.js       # Achievement schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── courses.js           # Course routes
│   │   ├── labs.js              # Lab routes
│   │   └── progress.js          # Progress routes
│   ├── seeders/
│   │   └── seedData.js          # Database seeder
│   ├── .env.example             # Environment variables template
│   ├── server.js                # Express server entry point
│   └── package.json             # Backend dependencies
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx       # Navigation bar
    │   │   └── Navbar.css
    │   ├── pages/
    │   │   ├── Home.jsx         # Landing page
    │   │   ├── Login.jsx        # Login page
    │   │   ├── Register.jsx     # Registration page
    │   │   ├── Dashboard.jsx    # User dashboard
    │   │   ├── Courses.jsx      # Course catalog
    │   │   ├── CourseDetail.jsx # Course detail view
    │   │   ├── LessonView.jsx   # Lesson viewer
    │   │   ├── LabView.jsx      # Lab environment
    │   │   ├── Profile.jsx      # User profile
    │   │   └── AdminPanel.jsx   # Admin dashboard
    │   ├── store/
    │   │   └── authStore.js     # Zustand auth store
    │   ├── App.jsx              # Main app component
    │   ├── main.jsx             # React entry point
    │   └── index.css            # Global styles
    ├── index.html
    ├── vite.config.js           # Vite configuration
    └── package.json             # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd mine
```

2. **Set up the Backend**
```bash
cd backend
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/cybersecurity-training
# JWT_SECRET=your_secret_key_here
```

3. **Set up the Frontend**
```bash
cd ../frontend
npm install
```

4. **Start MongoDB**
```bash
# If using MongoDB locally
mongod

# Or use MongoDB Atlas (cloud) and update MONGODB_URI in .env
```

5. **Seed the Database** (Optional but recommended)
```bash
cd backend
npm run seed
```

This creates:
- Admin user: `admin@cybersec.com` / `admin123`
- Instructor user: `instructor@cybersec.com` / `instructor123`
- Sample courses with lessons and labs
- Achievements

6. **Start the Development Servers**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

7. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📘 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john doe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Course Endpoints

#### Get All Courses
```http
GET /api/courses?category=web-security&difficulty=beginner&search=xss
```

#### Get Course by ID
```http
GET /api/courses/:id
```

#### Enroll in Course
```http
POST /api/courses/:id/enroll
Authorization: Bearer <token>
```

#### Get Enrolled Courses
```http
GET /api/courses/enrolled
Authorization: Bearer <token>
```

### Lab Endpoints

#### Get All Labs
```http
GET /api/labs?category=web-security&difficulty=easy
```

#### Get Lab by ID
```http
GET /api/labs/:id
Authorization: Bearer <token>
```

#### Submit Lab Solution
```http
POST /api/progress/lab/:labId
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "course_id_here",
  "flag": "CTF{YOUR_FLAG}",
  "timeSpent": 30
}
```

### Progress Endpoints

#### Get Dashboard Stats
```http
GET /api/progress/dashboard
Authorization: Bearer <token>
```

#### Get Course Progress
```http
GET /api/progress/:courseId
Authorization: Bearer <token>
```

#### Complete Lesson
```http
POST /api/progress/lesson/:lessonId
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "course_id_here",
  "quizScore": 85
}
```

## 🎨 Features Breakdown

### 1. User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Student, Instructor, Admin)
- Protected routes

### 2. Course Management
- Browse courses by category and difficulty
- Detailed course information with prerequisites
- Enrollment system
- Progress tracking per course

### 3. Interactive Lessons
- Markdown-based content rendering
- Embedded code examples with syntax highlighting
- Interactive quizzes with instant feedback
- Resource attachments

### 4. Hands-On Labs
- CTF-style challenges
- Multiple difficulty levels
- Hint system (progressive disclosure)
- Flag validation system
- Points and scoring

### 5. Progress Tracking
- Lesson completion tracking
- Lab completion with scores
- Overall course progress percentage
- Time spent tracking
- Certificate generation (coming soon)

### 6. Gamification
- Points system
- Achievement badges
- Learning streaks
- Leaderboard (coming soon)

### 7. Admin Panel
- User management
- Course creation and editing
- Lab creation and management
- Analytics dashboard

## 🔒 Security Features

- **Password Security**: Bcrypt hashing with salt
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Express-validator for all inputs
- **SQL Injection Prevention**: Mongoose ODM with parameterized queries
- **XSS Protection**: Helmet middleware
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Sensitive data in .env
- **Rate Limiting**: (Recommended to add)
- **HTTPS**: (Required in production)

## 🧪 Testing

### Manual Testing
1. Create a new account
2. Enroll in a course
3. Complete a lesson
4. Attempt a lab challenge
5. Check dashboard for updated stats

### Test Credentials
After running the seed script:
- **Admin**: admin@cybersec.com / admin123
- **Instructor**: instructor@cybersec.com / instructor123

## 🚀 Deployment

### Backend Deployment (Example: Heroku)

1. Create Heroku app
```bash
heroku create your-app-name-api
```

2. Add MongoDB Atlas connection string
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_production_secret
```

3. Deploy
```bash
git subtree push --prefix backend heroku main
```

### Frontend Deployment (Example: Vercel)

1. Build the frontend
```bash
cd frontend
npm run build
```

2. Deploy to Vercel
```bash
vercel --prod
```

3. Update API URL in production build

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cybersecurity-training
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=production
```

#### Frontend (vite.config.js)
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://your-backend-api.herokuapp.com'
    }
  }
})
```

## 📈 Future Enhancements

### Short Term
- [ ] Lesson video integration
- [ ] Real-time terminal emulator for labs
- [ ] Certificate generation on course completion
- [ ] Email notifications
- [ ] Password reset functionality

### Medium Term
- [ ] Docker containerization for lab environments
- [ ] Live leaderboard
- [ ] Discussion forums per course
- [ ] Peer code review system
- [ ] Advanced analytics dashboard

### Long Term
- [ ] Virtual lab environments (VMs/containers)
- [ ] Live instructor sessions
- [ ] Team challenges and competitions
- [ ] Mobile app (React Native)
- [ ] AI-powered learning path recommendations
- [ ] Integration with security tools (Burp Suite, Metasploit, etc.)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Initial work - CyberSec Academy Team

## 🙏 Acknowledgments

- OWASP for security best practices
- The cybersecurity education community
- All contributors and testers

## 📞 Support

For support, email support@cybersecacademy.com or open an issue in the repository.

## 🔗 Links

- [Documentation](https://docs.cybersecacademy.com)
- [API Reference](https://api.cybersecacademy.com/docs)
- [Community Discord](https://discord.gg/cybersecacademy)

---

**Built with ❤️ for the cybersecurity community**
