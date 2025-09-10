# MongoDB Setup Guide

## 🌍 MongoDB Atlas Setup (Recommended for Deployment)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Choose "Free Shared Cluster" (M0 Sandbox - Free forever)

### Step 2: Create a Cluster
1. Choose your cloud provider (AWS recommended)
2. Select a region close to your deployment region
3. Cluster Name: `product-listing-cluster` (or any name)
4. Click "Create Cluster" (takes 3-7 minutes)

### Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `productstore-admin`
5. Password: Generate a secure password (save this!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your deployment platform's IP ranges
5. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Clusters" and click "Connect"
2. Choose "Connect your application"
3. Driver: Node.js, Version: 4.1 or later
4. Copy the connection string (looks like):
   ```
   mongodb+srv://productstore-admin:<password>@product-listing-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `product-listing` at the end

### Final Connection String Format:
```
mongodb+srv://productstore-admin:YOUR_PASSWORD@product-listing-cluster.xxxxx.mongodb.net/product-listing?retryWrites=true&w=majority
```

## 💻 Local MongoDB Setup (For Development)

### Option A: Homebrew (Recommended for Mac)
```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify installation
mongosh --version
```

### Option B: Docker (Alternative)
```bash
# Run MongoDB in Docker
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  mongo:latest
```

## 🔧 Environment Configuration

### Update Backend Environment Variables

Create/Update `/backend/.env`:
```env
PORT=5001
NODE_ENV=development

# For Local MongoDB
MONGODB_URI=mongodb://localhost:27017/product-listing

# For MongoDB Atlas (replace with your actual connection string)
# MONGODB_URI=mongodb+srv://productstore-admin:YOUR_PASSWORD@product-listing-cluster.xxxxx.mongodb.net/product-listing?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### For Deployment (Heroku/Vercel/Railway):
```env
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://productstore-admin:YOUR_PASSWORD@cluster.xxxxx.mongodb.net/product-listing?retryWrites=true&w=majority
JWT_SECRET=super-secure-random-string-for-production
```

## 🛠️ Testing Your Setup

### 1. Test Connection
```bash
# Using mongosh (if installed locally)
mongosh "mongodb://localhost:27017/product-listing"

# Or test with Node.js
node -e "
const mongoose = require('mongoose');
mongoose.connect('YOUR_MONGODB_URI').then(() => {
  console.log('✅ Connected to MongoDB');
  process.exit(0);
}).catch(err => {
  console.error('❌ Connection failed:', err);
  process.exit(1);
});
"
```

### 2. Verify Data Persistence
1. Start the backend with MongoDB
2. Register a new user
3. Restart the backend
4. Try logging in with the same user → Should work!

## 🚀 Deployment Platform Configuration

### Heroku
```bash
heroku config:set MONGODB_URI="mongodb+srv://user:pass@cluster.net/db"
```

### Vercel
Add environment variables in Vercel dashboard

### Railway
```bash
railway variables set MONGODB_URI="mongodb+srv://user:pass@cluster.net/db"
```

### DigitalOcean App Platform
Add environment variables in app settings

## 📊 Database Collections

Your MongoDB will have these collections:
- `users` - User accounts and authentication
- `products` - Product catalog
- `orders` - Order history and transactions

## 🔒 Security Best Practices

1. **Strong Passwords**: Use complex passwords for database users
2. **IP Whitelisting**: Restrict access to known IP addresses in production
3. **Environment Variables**: Never commit database URLs to git
4. **Connection Limits**: Monitor connection usage
5. **Regular Backups**: Set up automated backups in Atlas

---

**Next Steps**: Choose either local MongoDB for development or Atlas for deployment, then run the backend with the MongoDB connection string!