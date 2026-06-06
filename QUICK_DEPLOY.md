# ⚡ Quick Deploy Guide (5 Minutes)

Follow these simple steps to get your platform live!

---

## 🗂️ Step 1: MongoDB Atlas (2 minutes)

1. **Go to**: https://www.mongodb.com/cloud/atlas
2. **Sign up** (free account)
3. **Create FREE cluster** (M0 - 512MB)
4. **Network Access**: Click "Add IP Address" → "Allow Access from Anywhere" → Confirm
5. **Database Access**: Click "Add New Database User"
   - Username: `admin`
   - Password: `choose-a-strong-password` (save this!)
   - Role: "Atlas Admin"
6. **Connect**: Click "Connect" → "Connect your application"
7. **Copy connection string**: 
   ```
   mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
8. **Edit it**: Add database name at the end:
   ```
   mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cybersecurity-training?retryWrites=true&w=majority
   ```

✅ **Save this connection string!**

---

## 🚂 Step 2: Railway Backend (2 minutes)

1. **Go to**: https://railway.app
2. **Sign in with GitHub**
3. **New Project** → "Deploy from GitHub repo"
4. **Select**: `Feliciencalyx/mine` repository
5. **Settings** tab:
   - Root Directory: `backend`
   - Start Command: `npm start`
6. **Variables** tab, add these:
   ```
   MONGODB_URI=your_connection_string_from_step_1
   JWT_SECRET=cybersec_platform_secret_key_2024_production
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://mine.vercel.app
   ```
7. **Deploy** → Wait 2 minutes
8. **Copy your backend URL**: `https://mine-production-xxxx.up.railway.app`

✅ **Test it**: Visit `https://your-backend-url/api/health` - should see "OK"

---

## 🌐 Step 3: Vercel Frontend (1 minute)

1. **Go to**: https://vercel.com
2. **Sign in with GitHub**
3. **Import Project** → Select `Feliciencalyx/mine`
4. **Configure**:
   - Framework Preset: **Vite**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Environment Variables**:
   ```
   VITE_API_URL=your_railway_backend_url_from_step_2
   ```
   Example: `VITE_API_URL=https://mine-production-xxxx.up.railway.app`
6. **Deploy** → Wait 2 minutes
7. **Your site is live!** `https://mine.vercel.app`

---

## 🌱 Step 4: Seed Database

Back in **Railway**:
1. Go to your backend service
2. Click **"Deployments"**
3. Find the command line at top
4. Run: `npm run seed`
5. Wait for "Database seeded successfully"

This creates:
- ✅ Admin: `admin@cybersec.com` / `admin123`
- ✅ Instructor: `instructor@cybersec.com` / `instructor123`  
- ✅ 3 Sample courses
- ✅ Lessons and labs

---

## 🎉 Step 5: Test It!

1. **Visit your site**: `https://mine.vercel.app`
2. **Click "Login"**
3. **Use demo credentials**:
   - Email: `admin@cybersec.com`
   - Password: `admin123`
4. **Test features**:
   - Browse courses
   - Enroll in "Web Application Security"
   - Complete a lesson
   - Try the XSS lab (flag: `CTF{XSS_1S_DANGEROUS}`)

---

## 🐛 Troubleshooting

### Can't connect to backend?
- Check VITE_API_URL in Vercel is correct
- Update FRONTEND_URL in Railway to your Vercel URL
- Redeploy frontend after changes

### MongoDB connection error?
- Double-check connection string
- Make sure you replaced `YOUR_PASSWORD`
- Verify IP whitelist includes `0.0.0.0/0`

### 404 errors?
- Clear Vercel build cache and redeploy
- Check root directory is set to `frontend`

---

## 📝 Summary

**Your URLs:**
- Frontend: `https://mine.vercel.app`
- Backend: `https://mine-production-xxxx.up.railway.app`
- Database: MongoDB Atlas cluster

**Demo Login:**
- Email: `admin@cybersec.com`
- Password: `admin123`

---

## 🎯 Next Steps

- ✅ Share your URL with friends!
- ✅ Customize courses and content
- ✅ Add your own domain in Vercel
- ✅ Monitor usage in Railway dashboard

**You're live in 5 minutes! 🚀**
