# Deployment Guide

This document provides step-by-step instructions for deploying the Product Listing Web App to various cloud platforms.

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Git repository
- Account on your chosen deployment platform

## Environment Variables

### Backend (.env)
```
PORT=5001
# For production, use your MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/product-listing?retryWrites=true&w=majority
# For local development
# MONGODB_URI=mongodb://localhost:27017/product-listing
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Using Docker Compose
```bash
docker-compose up -d
```

## Deployment Options

### 1. Heroku Deployment

#### Backend Deployment
1. Create a Heroku app:
```bash
heroku create your-app-name-backend
```

2. Add MongoDB Atlas or Heroku Postgres add-on:
```bash
heroku addons:create mongolab:sandbox
```

3. Set environment variables:
```bash
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set NODE_ENV=production
```

4. Deploy:
```bash
git subtree push --prefix backend heroku main
```

#### Frontend Deployment
1. Create another Heroku app for frontend:
```bash
heroku create your-app-name-frontend
```

2. Set environment variables:
```bash
heroku config:set NEXT_PUBLIC_API_URL=https://your-backend-app.herokuapp.com/api
```

3. Deploy:
```bash
git subtree push --prefix frontend heroku main
```

### 2. Vercel Deployment (Frontend)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy frontend:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`: Your backend API URL

### 3. Railway Deployment

#### Backend
1. Create a Railway project
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

#### Frontend
1. Create another Railway project
2. Connect your GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend Railway URL

### 4. DigitalOcean App Platform

1. Create a new app in DigitalOcean
2. Connect your GitHub repository
3. Configure two components:
   - Backend service (port 5000)
   - Frontend static site

#### Backend Configuration
- Source: `/backend`
- Build command: `npm run build`
- Run command: `npm start`
- Environment variables: Set all required variables

#### Frontend Configuration
- Source: `/frontend`
- Build command: `npm run build`
- Environment variables: Set `NEXT_PUBLIC_API_URL`

### 5. AWS Deployment

#### Using AWS Elastic Beanstalk

##### Backend
1. Create an Elastic Beanstalk application
2. Upload backend code as ZIP
3. Configure environment variables
4. Set up MongoDB on Atlas or AWS DocumentDB

##### Frontend
1. Build the frontend: `npm run build`
2. Deploy to AWS S3 + CloudFront or Elastic Beanstalk

#### Using AWS ECS with Docker

1. Build and push Docker images to ECR:
```bash
# Backend
docker build -t your-backend ./backend
docker tag your-backend:latest your-account.dkr.ecr.region.amazonaws.com/your-backend:latest
docker push your-account.dkr.ecr.region.amazonaws.com/your-backend:latest

# Frontend
docker build -t your-frontend ./frontend
docker tag your-frontend:latest your-account.dkr.ecr.region.amazonaws.com/your-frontend:latest
docker push your-account.dkr.ecr.region.amazonaws.com/your-frontend:latest
```

2. Create ECS task definitions and services

## Database Setup

### MongoDB Atlas (Recommended for production)
1. Create a MongoDB Atlas account
2. Create a cluster
3. Create a database user
4. Whitelist IP addresses (or use 0.0.0.0/0 for development)
5. Get the connection string and update `MONGODB_URI`

### Local MongoDB
```bash
# Install MongoDB
brew install mongodb/brew/mongodb-community

# Start MongoDB
brew services start mongodb/brew/mongodb-community
```

## Production Checklist

- [ ] Update JWT_SECRET to a secure, random string
- [ ] Use MongoDB Atlas or secure database hosting
- [ ] Set NODE_ENV=production
- [ ] Configure CORS for your frontend domain
- [ ] Set up SSL/HTTPS
- [ ] Configure proper logging
- [ ] Set up monitoring and error tracking
- [ ] Test all API endpoints
- [ ] Verify authentication flows
- [ ] Test cart functionality
- [ ] Test product CRUD operations

## Troubleshooting

### Common Issues

1. **CORS Errors**: Update the CORS configuration in backend to include your frontend domain
2. **Database Connection**: Verify MongoDB URI and network access
3. **Environment Variables**: Ensure all required variables are set
4. **Build Failures**: Check Node.js version compatibility
5. **API Not Found**: Verify the API URL is correct in frontend

### Environment-Specific Notes

- **Heroku**: Free tier goes to sleep after 30 minutes of inactivity
- **Vercel**: Has excellent Next.js integration and automatic deployments
- **Railway**: Provides generous free tier and simple deployment
- **DigitalOcean**: Cost-effective for production workloads

## Support

For deployment issues, check the platform-specific documentation or create an issue in the project repository.