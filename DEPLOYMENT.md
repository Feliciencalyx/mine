# 🚀 Deployment Guide

This guide will help you deploy the CyberSec Academy platform to production.

## Overview

- **Database**: MongoDB Atlas (Free)
- **Backend API**: Railway or Render (Free)
- **Frontend**: Vercel (Free)

---

## Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** and create an account
3. Create a **FREE M0 cluster** (512MB storage)

### 1.2 Configure Database
1. Click **"Connect"** on your cluster
2. Add your IP address (or use `0.0.0.0/0` for all IPs)
3. Create a database user with username and password
4. Choose **"Connect your application"**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cybersecurity-training?retryWrites=true&w=majority`

**Save this connection string - you'll need it soon!**

---

## Step 2: Deploy Backend to Railway

### 2.1 Create Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub (easiest)
3. Click **"New Project"**

### 2.2 Deploy from GitHub
1. Click **"Deploy from GitHub repo"**
2. Select your `mine` repository
3. Railway will auto-detect Node.js

### 2.3 Configure Environment Variables
1. Go to **Variables** tab
2. Add these variables:

```
MONGODB_URI=your_mongodb_atlas_connection_string_from_step_1
JWT_SECRET=your_super_secret_random_string_at_least_32_characters_long
NODE_ENV=production
PORT=5000
```

### 2.4 Configure Build Settings
1. Go to **Settings** tab
2. Set **Root Directory**: `backend`
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`

### 2.5 Deploy
1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Once deployed, click on the URL (looks like: `https://mine-production-xxxx.up.railway.app`)
4. Test it by visiting: `https://your-backend-url/api/health`

You should see: `{"status":"OK","message":"Cybersecurity Training Platform API is running"}`

**Save your backend URL!**

### 2.6 Seed the Database
1. Go to Railway dashboard
2. Click on your service
3. Go to **"Deployments"** tab
4. Click **"View Logs"**
5. In the **"Command"** section at top, run:
   ```
   npm run seed
   ```
6. This creates demo accounts and sample courses

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"Add New Project"**

### 3.2 Import Repository
1. Click **"Import Git Repository"**
2. Select your `mine` repository
3. Click **"Import"**

### 3.3 Configure Build Settings
1. **Framework Preset**: Vite
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### 3.4 Add Environment Variables
Click **"Environment Variables"** and add:

```
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```

(Replace with your actual Railway backend URL from Step 2.5)

### 3.5 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Once complete, Vercel gives you a URL: `https://mine-username.vercel.app`

### 3.6 Update Backend CORS
Go back to Railway and add CORS configuration:

1. Add environment variable:
   ```
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

2. Update backend `server.js` if needed to allow your frontend domain

---

## Step 4: Test Your Deployment

### 4.1 Visit Your Site
Go to your Vercel URL: `https://mine-username.vercel.app`

### 4.2 Test Features
1. **Register** a new account
2. **Login** with demo credentials:
   - Email: `admin@cybersec.com`
   - Password: `admin123`
3. **Browse courses**
4. **Enroll in a course**
5. **Complete a lesson**
6. **Try a lab** (XSS Challenge flag: `CTF{XSS_1S_DANGEROUS}`)

---

## Alternative: Deploy Backend to Render

If you prefer Render over Railway:

### Render Deployment
1. Go to [Render.com](https://render.com)
2. Create account with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your repository
5. Configure:
   - **Name**: cybersec-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables (same as Railway)
7. Click **"Create Web Service"**

---

## 📋 Deployment Checklist

- [ ] MongoDB Atlas cluster created and connection string saved
- [ ] Backend deployed to Railway/Render
- [ ] Backend environment variables configured
- [ ] Database seeded with sample data
- [ ] Backend health endpoint working (`/api/health`)
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variable (VITE_API_URL) configured
- [ ] CORS configured for frontend domain
- [ ] Tested registration and login
- [ ] Tested course enrollment
- [ ] Tested lesson completion
- [ ] Tested lab submission

---

## 🔒 Security Checklist for Production

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use strong MongoDB passwords
- [ ] Configure proper CORS origins (not `*`)
- [ ] Enable rate limiting (add express-rate-limit)
- [ ] Set up monitoring and error tracking
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS (automatic on Vercel/Railway)

---

## 🐛 Troubleshooting

### Backend not connecting to MongoDB
- Double-check connection string format
- Ensure IP whitelist includes your deployment platform
- Verify database user credentials

### Frontend can't reach backend
- Check VITE_API_URL is correct
- Verify CORS is configured properly
- Check browser console for errors

### 500 errors on API
- Check Railway/Render logs
- Verify all environment variables are set
- Check MongoDB connection

### Deployment fails
- Check build logs in Railway/Vercel
- Verify package.json has correct scripts
- Ensure Node.js version compatibility

---

## 📊 Monitor Your Deployment

### Railway
- Dashboard: View metrics, logs, and deployments
- Logs: Real-time application logs
- Metrics: CPU, memory, network usage

### Vercel
- Analytics: Page views and performance
- Logs: Build and function logs
- Domains: Custom domain management

### MongoDB Atlas
- Metrics: Database performance
- Data Browser: View and edit data
- Alerts: Set up monitoring alerts

---

## 🎉 You're Live!

Your platform is now accessible worldwide at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-backend.railway.app`

Share your deployment URL and let users start learning cybersecurity!

---

## 💡 Next Steps

1. **Custom Domain**: Add your own domain in Vercel settings
2. **Monitoring**: Set up error tracking (Sentry, LogRocket)
3. **Analytics**: Add Google Analytics or Plausible
4. **Email**: Configure SendGrid for notifications
5. **Backups**: Set up automated MongoDB backups
6. **CDN**: Vercel automatically uses CDN, but configure for images
7. **SEO**: Add meta tags and sitemap

---

## 📞 Need Help?

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

**Happy Deploying! 🚀**
