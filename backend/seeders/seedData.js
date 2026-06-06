require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Lab = require('../models/Lab');
const Achievement = require('../models/Achievement');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Lesson.deleteMany();
    await Lab.deleteMany();
    await Achievement.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Create users
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@cybersec.com',
      password: 'admin123',
      role: 'admin',
      profile: {
        firstName: 'Admin',
        lastName: 'User'
      }
    });

    const instructorUser = await User.create({
      username: 'instructor',
      email: 'instructor@cybersec.com',
      password: 'instructor123',
      role: 'instructor',
      profile: {
        firstName: 'John',
        lastName: 'Instructor'
      }
    });

    console.log('✅ Created users');

    // Create achievements
    const achievements = await Achievement.create([
      {
        title: 'First Steps',
        description: 'Complete your first lesson',
        icon: '🎓',
        category: 'course',
        requirement: 'complete_1_lesson',
        points: 10,
        rarity: 'common'
      },
      {
        title: 'Lab Master',
        description: 'Complete 10 labs',
        icon: '🧪',
        category: 'lab',
        requirement: 'complete_10_labs',
        points: 100,
        rarity: 'rare'
      },
      {
        title: 'Week Warrior',
        description: 'Maintain a 7-day learning streak',
        icon: '🔥',
        category: 'streak',
        requirement: '7_day_streak',
        points: 50,
        rarity: 'epic'
      }
    ]);

    console.log('✅ Created achievements');

    // Create courses
    const webSecCourse = await Course.create({
      title: 'Web Application Security Fundamentals',
      slug: 'web-application-security-fundamentals',
      description: 'Learn the fundamentals of web application security, including common vulnerabilities and how to prevent them.',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
      category: 'web-security',
      difficulty: 'beginner',
      instructor: instructorUser._id,
      duration: 8,
      tags: ['OWASP', 'XSS', 'SQL Injection', 'CSRF'],
      isPublished: true
    });

    const networkSecCourse = await Course.create({
      title: 'Network Security Essentials',
      slug: 'network-security-essentials',
      description: 'Master network security concepts, protocols, and defensive techniques.',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      category: 'network-security',
      difficulty: 'intermediate',
      instructor: instructorUser._id,
      duration: 10,
      tags: ['TCP/IP', 'Firewalls', 'VPN', 'IDS'],
      isPublished: true
    });

    const cryptoCourse = await Course.create({
      title: 'Introduction to Cryptography',
      slug: 'introduction-to-cryptography',
      description: 'Understand cryptographic principles, algorithms, and their practical applications.',
      thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400',
      category: 'cryptography',
      difficulty: 'intermediate',
      instructor: instructorUser._id,
      duration: 12,
      tags: ['Encryption', 'Hashing', 'PKI', 'SSL/TLS'],
      isPublished: true
    });

    console.log('✅ Created courses');

    // Create lessons for Web Security course
    const webLessons = await Lesson.create([
      {
        title: 'Introduction to Web Security',
        slug: 'introduction-to-web-security',
        course: webSecCourse._id,
        content: `# Introduction to Web Security

Web application security is a critical aspect of modern software development. As more services move online, protecting user data and ensuring application integrity has become paramount.

## Key Concepts

### The CIA Triad
- **Confidentiality**: Ensuring data is only accessible to authorized parties
- **Integrity**: Maintaining data accuracy and preventing unauthorized modifications
- **Availability**: Ensuring systems are accessible when needed

### Common Attack Vectors
1. **Client-side attacks**: XSS, CSRF, Clickjacking
2. **Server-side attacks**: SQL Injection, Command Injection
3. **Authentication attacks**: Brute force, Session hijacking
4. **Logic flaws**: Business logic vulnerabilities

## The OWASP Top 10

The Open Web Application Security Project (OWASP) maintains a list of the most critical web application security risks. We'll explore these throughout this course.

## Best Practices

- Always validate and sanitize user input
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization
- Keep software and dependencies up to date
- Use HTTPS everywhere
`,
        type: 'text',
        duration: 30,
        order: 1,
        isPreview: true
      },
      {
        title: 'Cross-Site Scripting (XSS)',
        slug: 'cross-site-scripting-xss',
        course: webSecCourse._id,
        content: `# Cross-Site Scripting (XSS)

XSS is one of the most common web vulnerabilities. It occurs when an attacker can inject malicious scripts into web pages viewed by other users.

## Types of XSS

### 1. Reflected XSS
The malicious script comes from the current HTTP request. Example:
\`\`\`
https://example.com/search?q=<script>alert('XSS')</script>
\`\`\`

### 2. Stored XSS
The malicious script is permanently stored on the target server (e.g., in a database).

### 3. DOM-based XSS
The vulnerability exists in client-side code rather than server-side.

## Prevention

- Escape all untrusted data before rendering
- Use Content Security Policy (CSP) headers
- Validate input on both client and server side
- Use frameworks that auto-escape by default (React, Vue, Angular)

## Example: Safe Output

**Vulnerable:**
\`\`\`javascript
element.innerHTML = userInput;
\`\`\`

**Safe:**
\`\`\`javascript
element.textContent = userInput;
\`\`\`
`,
        type: 'text',
        duration: 45,
        order: 2,
        quiz: [
          {
            question: 'Which type of XSS is stored on the server?',
            options: ['Reflected XSS', 'Stored XSS', 'DOM-based XSS', 'None of the above'],
            correctAnswer: 1,
            explanation: 'Stored XSS is permanently stored on the target server, typically in a database.'
          }
        ]
      },
      {
        title: 'SQL Injection Attacks',
        slug: 'sql-injection-attacks',
        course: webSecCourse._id,
        content: `# SQL Injection Attacks

SQL injection is a code injection technique used to attack data-driven applications by inserting malicious SQL statements into entry fields.

## How It Works

Consider this vulnerable code:
\`\`\`python
query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"
\`\`\`

An attacker could input:
\`\`\`
username: admin' --
password: anything
\`\`\`

Resulting query:
\`\`\`sql
SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'
\`\`\`

The \`--\` comments out the rest of the query, bypassing authentication!

## Prevention

### 1. Parameterized Queries (Prepared Statements)
\`\`\`python
cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
\`\`\`

### 2. ORM Libraries
Use Object-Relational Mapping tools that automatically handle escaping.

### 3. Input Validation
Whitelist allowed characters and validate data types.

### 4. Principle of Least Privilege
Database accounts should have minimal required permissions.
`,
        type: 'text',
        duration: 50,
        order: 3
      }
    ]);

    // Update course with lessons
    webSecCourse.lessons = webLessons.map(l => l._id);
    await webSecCourse.save();

    console.log('✅ Created lessons');

    // Create labs
    const xssLab = await Lab.create({
      title: 'XSS Attack Challenge',
      slug: 'xss-attack-challenge',
      course: webSecCourse._id,
      description: 'Find and exploit XSS vulnerabilities in a simulated web application',
      difficulty: 'easy',
      category: 'web-security',
      objectives: [
        'Identify vulnerable input fields',
        'Craft an XSS payload',
        'Execute JavaScript in the context of the application',
        'Extract the flag from the page'
      ],
      scenario: `You've been tasked with testing a comment system for XSS vulnerabilities. The application displays user comments without proper sanitization. Your goal is to inject a script that will display an alert box and find the hidden flag.

The flag format is: CTF{...}`,
      hints: [
        { text: 'Try injecting a simple <script> tag in the comment field', order: 0 },
        { text: 'Look for the flag in the page source or DOM', order: 1 },
        { text: 'The flag is hidden in a data attribute on the page', order: 2 }
      ],
      challenges: [
        {
          title: 'Execute XSS',
          description: 'Successfully execute JavaScript in the page context',
          type: 'flag',
          flag: 'CTF{XSS_1S_DANGEROUS}',
          points: 100,
          validation: {
            type: 'exact',
            value: 'CTF{XSS_1S_DANGEROUS}'
          }
        }
      ],
      environment: 'web',
      timeLimit: 30,
      points: 100,
      tags: ['XSS', 'JavaScript', 'Web']
    });

    const sqlLab = await Lab.create({
      title: 'SQL Injection Challenge',
      slug: 'sql-injection-challenge',
      course: webSecCourse._id,
      description: 'Exploit SQL injection vulnerabilities to bypass authentication',
      difficulty: 'medium',
      category: 'web-security',
      objectives: [
        'Identify SQL injection point',
        'Craft a payload to bypass authentication',
        'Extract sensitive data from the database'
      ],
      scenario: `You're testing a login form that's vulnerable to SQL injection. The backend uses string concatenation to build SQL queries. Your goal is to bypass authentication and retrieve the admin flag.

The login form accepts username and password fields.`,
      hints: [
        { text: 'Try using SQL comments (--) to ignore the rest of the query', order: 0 },
        { text: 'The admin username is "admin"', order: 1 },
        { text: 'Use: admin\' OR \'1\'=\'1\' --', order: 2 }
      ],
      challenges: [
        {
          title: 'Bypass Authentication',
          description: 'Successfully login as admin using SQL injection',
          type: 'flag',
          flag: 'CTF{SQL_INJECTION_MASTER}',
          points: 150,
          validation: {
            type: 'exact',
            value: 'CTF{SQL_INJECTION_MASTER}'
          }
        }
      ],
      environment: 'web',
      timeLimit: 45,
      points: 150,
      tags: ['SQL Injection', 'Database', 'Authentication']
    });

    // Update course with labs
    webSecCourse.labs = [xssLab._id, sqlLab._id];
    await webSecCourse.save();

    console.log('✅ Created labs');
    console.log('\n📊 Database seeded successfully!');
    console.log('\n👤 Test Credentials:');
    console.log('   Admin: admin@cybersec.com / admin123');
    console.log('   Instructor: instructor@cybersec.com / instructor123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
