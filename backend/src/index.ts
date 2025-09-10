import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import { initMockDatabase } from './utils/mockDatabase';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://your-app.vercel.app', 'https://your-app.netlify.app']
    : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', database: process.env.USE_MOCK_DB ? 'mock' : 'mongodb' });
});

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/product-listing';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed, falling back to mock database');
    console.log('📝 Using in-memory database for demo purposes');
    process.env.USE_MOCK_DB = 'true';
    await initMockDatabase();
    return false;
  }
};

const startServer = async () => {
  const mongoConnected = await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}/api`);
    if (!mongoConnected) {
      console.log('🎯 Demo mode active - login with username: admin, password: admin123');
    }
  });
};

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});