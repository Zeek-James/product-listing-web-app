import mongoose from 'mongoose';
import User from '../models/User';
import Product from '../models/Product';
import { hashPassword } from './auth';
import dotenv from 'dotenv';

dotenv.config();

export const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminPassword = await hashPassword('admin123');
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@productstore.com',
      password: adminPassword
    });
    
    console.log('👤 Created admin user');

    // Create sample products
    const products = [
      {
        name: "Wireless Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
        price: 99.99,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        stock: 50
      },
      {
        name: "Smartphone Stand",
        description: "Adjustable aluminum smartphone stand compatible with all phone sizes. Great for video calls and watching content.",
        price: 24.99,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop",
        stock: 100
      },
      {
        name: "Organic Cotton T-Shirt",
        description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Ethically sourced and produced.",
        price: 29.99,
        category: "Clothing",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        stock: 200
      },
      {
        name: "Coffee Mug",
        description: "Ceramic coffee mug with ergonomic handle. Perfect for your morning coffee or tea. Dishwasher and microwave safe.",
        price: 14.99,
        category: "Home & Kitchen",
        imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
        stock: 75
      },
      {
        name: "Yoga Mat",
        description: "Premium non-slip yoga mat made from eco-friendly materials. Ideal for yoga, pilates, and other floor exercises.",
        price: 39.99,
        category: "Sports & Fitness",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
        stock: 30
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking and long battery life. Compatible with Windows and Mac.",
        price: 34.99,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
        stock: 80
      }
    ];

    await Product.insertMany(products);
    console.log(`📦 Created ${products.length} sample products`);
    
    console.log('✅ Database seeded successfully!');
    console.log('👤 Admin credentials: username=admin, password=admin123');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
};

// Run seeding if called directly
if (require.main === module) {
  const runSeed = async () => {
    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/product-listing';
      await mongoose.connect(mongoUri);
      console.log('📡 Connected to MongoDB for seeding');
      
      await seedDatabase();
      
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
      process.exit(0);
    } catch (error) {
      console.error('Seeding script failed:', error);
      process.exit(1);
    }
  };
  
  runSeed();
}