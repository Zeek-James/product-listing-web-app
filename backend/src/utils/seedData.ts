import mongoose from 'mongoose';
import Product from '../models/Product';
import User from '../models/User';
import { hashPassword } from './auth';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = [
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
  },
  {
    name: "Notebook Set",
    description: "Set of 3 premium notebooks with dotted pages. Perfect for journaling, note-taking, and sketching.",
    price: 19.99,
    category: "Stationery",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    stock: 150
  },
  {
    name: "Water Bottle",
    description: "Stainless steel insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free.",
    price: 27.99,
    category: "Sports & Fitness",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    stock: 60
  },
  {
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness and color temperature. USB charging port included. Eye-friendly lighting.",
    price: 45.99,
    category: "Home & Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    stock: 25
  },
  {
    name: "Backpack",
    description: "Durable canvas backpack with multiple compartments and laptop sleeve. Perfect for school, work, or travel.",
    price: 59.99,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    stock: 40
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/product-listing';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const hashedPassword = await hashPassword('admin123');
    const adminUser = new User({
      username: 'admin',
      email: 'admin@productstore.com',
      password: hashedPassword
    });
    await adminUser.save();
    console.log('👤 Created admin user (username: admin, password: admin123)');

    // Create sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`📦 Created ${products.length} sample products`);

    console.log('🎉 Database seeded successfully!');
    console.log('\nYou can now:');
    console.log('1. Start the backend server: npm run dev');
    console.log('2. Login with: username: admin, password: admin123');
    console.log('3. Browse products and test all features');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;