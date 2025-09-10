# 🚀 Free Deployment Instructions

## Step 1: Deploy Backend to Render

### 1. Go to Render
1. Visit https://render.com
2. Sign up with your GitHub account
3. Click "New +" → "Web Service"

### 2. Configure Backend Service
1. **Connect Repository**: Select your GitHub repo
2. **Settings**:
   - **Name**: `product-store-backend` (or any name you prefer)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 3. Environment Variables (CRITICAL!)
Add these environment variables in Render:
```
MONGODB_URI=mongodb+srv://isaac_james:isaac_james@product-listing-cluster.nytafca.mongodb.net/product-listing?retryWrites=true&w=majority&appName=product-listing-cluster
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-isaac-james-2024
NODE_ENV=production
PORT=10000
```
⚠️ **Important**: Render uses port 10000 by default

### 4. Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://your-backend-name.onrender.com`

---

## Step 2: Deploy Frontend to Vercel

### 1. Go to Vercel
1. Visit https://vercel.com
2. Sign up with your GitHub account
3. Click "New Project"

### 2. Import Repository
1. Select your GitHub repository
2. **Framework Preset**: Next.js (auto-detected)
3. **Root Directory**: `frontend`

### 3. Environment Variables
Add this environment variable:
```
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com/api
```
Replace `your-backend-name` with your actual Render backend URL

### 4. Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Your app will be live at: `https://your-app.vercel.app`

---

## Step 3: Update CORS Settings

After both deployments, update your backend CORS:

1. Go to your Render dashboard
2. Open your backend service
3. Go to "Environment" tab
4. Add new environment variable:
```
FRONTEND_URL=https://your-app.vercel.app
```
5. Your service will automatically redeploy

---

## Step 4: Seed Production Database

Run this command to seed your production database:
```bash
cd backend
MONGODB_URI="your-atlas-connection-string" npm run seed
```

---

## 🎯 Final URLs

After deployment you'll have:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend-name.onrender.com
- **Admin Login**: username=`admin`, password=`admin123`

---

## 🔧 Alternative: All-in-One Deployment

### Option: Deploy to Render (Both Frontend & Backend)

If you prefer everything on Render:

1. **Backend Service** (as above)
2. **Frontend Static Site**:
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `out` (if using static export) or `dist`

---

## 🚨 Troubleshooting

### Common Issues:
1. **Build Fails**: Check Node.js version in Render (should be 18+)
2. **API Not Found**: Verify `NEXT_PUBLIC_API_URL` points to correct backend
3. **CORS Errors**: Make sure `FRONTEND_URL` matches your Vercel domain
4. **Database Connection**: Verify MongoDB Atlas allows connections from 0.0.0.0/0

### Health Check:
- Backend health: `https://your-backend.onrender.com/api/health`
- Products API: `https://your-backend.onrender.com/api/products`

---

**Ready to deploy! Start with the backend on Render, then frontend on Vercel.**