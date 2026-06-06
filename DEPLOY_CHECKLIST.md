# ✅ Deployment Checklist

Copy this checklist and mark items as you complete them!

---

## 📋 Pre-Deployment

- [ ] I have a GitHub account
- [ ] Repository is pushed to GitHub: https://github.com/Feliciencalyx/mine
- [ ] I'm ready to deploy (takes ~10 minutes)

---

## 🗄️ DATABASE - MongoDB Atlas

### Setup (3 minutes)
- [ ] Created account at https://www.mongodb.com/cloud/atlas
- [ ] Created FREE M0 cluster (512MB)
- [ ] Clicked "Database Access" → Added user:
  - Username: `admin` 
  - Password: `____________` (write it here!)
- [ ] Clicked "Network Access" → "Add IP Address" → "Allow from Anywhere"
- [ ] Clicked "Connect" → "Connect your application" → Copied connection string
- [ ] Modified connection string with my password
- [ ] Added database name to end: `/cybersecurity-training?retryWrites=true&w=majority`

**My MongoDB URI:**
```
mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cybersecurity-training?retryWrites=true&w=majority
```

---

## 🚂 BACKEND - Railway

### Setup (3 minutes)
- [ ] Created account at https://railway.app (use GitHub login)
- [ ] Clicked "New Project"
- [ ] Selected "Deploy from GitHub repo"
- [ ] Selected repository: `Feliciencalyx/mine`
- [ ] Went to "Settings" tab:
  - [ ] Set Root Directory: `backend`
  - [ ] Set Start Command: `npm start`
- [ ] Went to "Variables" tab and added:
  - [ ] `MONGODB_URI` = [my connection string from above]
  - [ ] `JWT_SECRET` = `cybersec_platform_secret_key_2024_production`
  - [ ] `NODE_ENV` = `production`
  - [ ] `PORT` = `5000`
  - [ ] `FRONTEND_URL` = `https://mine.vercel.app` (update after Vercel deploy)
- [ ] Clicked "Deploy"
- [ ] Waited for deployment to complete (~2 minutes)
- [ ] Copied my backend URL

**My Backend URL:**
```
https://mine-production-____________.up.railway.app
```

### Test Backend
- [ ] Visited: `[MY_BACKEND_URL]/api/health`
- [ ] Saw: `{"status":"OK","message":"Cybersecurity Training Platform API is running"}`

### Seed Database
- [ ] In Railway, clicked "Deployments" tab
- [ ] Found command line at top
- [ ] Ran command: `npm run seed`
- [ ] Saw success message with test credentials

---

## 🌐 FRONTEND - Vercel

### Setup (2 minutes)
- [ ] Created account at https://vercel.com (use GitHub login)
- [ ] Clicked "Add New..." → "Project"
- [ ] Clicked "Import" next to `Feliciencalyx/mine`
- [ ] Configured project:
  - [ ] Framework Preset: **Vite**
  - [ ] Root Directory: `frontend`
  - [ ] Build Command: `npm run build` (auto-filled)
  - [ ] Output Directory: `dist` (auto-filled)
- [ ] Clicked "Environment Variables" and added:
  - [ ] Name: `VITE_API_URL`
  - [ ] Value: [my Railway backend URL from above]
- [ ] Clicked "Deploy"
- [ ] Waited for build (~2 minutes)
- [ ] Deployment successful!

**My Frontend URL:**
```
https://mine-____________.vercel.app
```

### Update Backend CORS
- [ ] Went back to Railway
- [ ] Updated `FRONTEND_URL` variable with my Vercel URL
- [ ] Railway auto-redeployed (~1 minute)

---

## 🧪 TESTING

### Basic Tests
- [ ] Visited my frontend URL: [write it here: ________________]
- [ ] Homepage loaded correctly
- [ ] Clicked "Login"
- [ ] Logged in with: `admin@cybersec.com` / `admin123`
- [ ] Saw my dashboard with stats
- [ ] Clicked "Courses"
- [ ] Saw 3 courses listed
- [ ] Clicked on "Web Application Security Fundamentals"
- [ ] Clicked "Enroll Now"
- [ ] Enrollment successful
- [ ] Saw lessons and labs

### Feature Tests
- [ ] Completed a lesson
- [ ] Took a quiz
- [ ] Attempted a lab
- [ ] Submitted flag: `CTF{XSS_1S_DANGEROUS}`
- [ ] Got points and success message
- [ ] Checked profile page
- [ ] Dashboard shows updated stats

---

## 🎉 LAUNCH

### Share Your Platform
- [ ] My live platform URL: `_______________________`
- [ ] Shared with friends/colleagues
- [ ] Added URL to GitHub repository description
- [ ] Created demo video (optional)

### Optional Improvements
- [ ] Added custom domain in Vercel
- [ ] Set up monitoring in Railway
- [ ] Configured error tracking
- [ ] Added Google Analytics
- [ ] Customized course content
- [ ] Created more labs

---

## 📊 Monitoring

### Check Health Regularly
- [ ] Railway dashboard: Monitor API performance
- [ ] Vercel dashboard: Check frontend analytics
- [ ] MongoDB Atlas: Monitor database metrics
- [ ] Check logs for errors

---

## 🆘 Problems?

### Backend Issues
**Problem:** Can't connect to MongoDB
- [ ] Double-checked connection string
- [ ] Verified password in connection string
- [ ] Checked IP whitelist includes `0.0.0.0/0`

**Problem:** 500 errors on API
- [ ] Checked Railway logs
- [ ] Verified all environment variables are set
- [ ] Tested `/api/health` endpoint

### Frontend Issues
**Problem:** Can't reach backend
- [ ] Verified `VITE_API_URL` in Vercel
- [ ] Checked browser console for CORS errors
- [ ] Updated `FRONTEND_URL` in Railway

**Problem:** Build fails on Vercel
- [ ] Checked build logs
- [ ] Verified root directory is `frontend`
- [ ] Made sure `npm run build` works locally

---

## 💪 Success!

Congratulations! Your cybersecurity training platform is now live and accessible worldwide!

**Platform URLs:**
- 🌐 Website: `_______________________`
- 🔌 API: `_______________________`
- 🗄️ Database: MongoDB Atlas

**Next Steps:**
1. Share your platform
2. Add custom content
3. Monitor usage
4. Iterate and improve

**You did it! 🎉🚀**

---

## 📞 Support Resources

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.atlas.mongodb.com
- GitHub Repo: https://github.com/Feliciencalyx/mine

---

*Deployment Date: ____________*
*Time Taken: ____________*
*Notes: ___________________________________________*
