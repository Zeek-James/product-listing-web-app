import { hashPassword } from './auth';

export interface MockUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface MockProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockOrder {
  _id: string;
  user: string;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

let users: MockUser[] = [];
let products: MockProduct[] = [];
let orders: MockOrder[] = [];

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const initMockDatabase = async () => {
  // Create admin user
  const adminPassword = await hashPassword('admin123');
  users = [{
    _id: generateId(),
    username: 'admin',
    email: 'admin@productstore.com',
    password: adminPassword,
    createdAt: new Date()
  }];

  // Create sample products
  products = [
    {
      _id: generateId(),
      name: "Wireless Bluetooth Headphones",
      description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
      price: 99.99,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      stock: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: generateId(),
      name: "Smartphone Stand",
      description: "Adjustable aluminum smartphone stand compatible with all phone sizes. Great for video calls and watching content.",
      price: 24.99,
      category: "Accessories",
      imageUrl: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop",
      stock: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: generateId(),
      name: "Organic Cotton T-Shirt",
      description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Ethically sourced and produced.",
      price: 29.99,
      category: "Clothing",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      stock: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: generateId(),
      name: "Coffee Mug",
      description: "Ceramic coffee mug with ergonomic handle. Perfect for your morning coffee or tea. Dishwasher and microwave safe.",
      price: 14.99,
      category: "Home & Kitchen",
      imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
      stock: 75,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: generateId(),
      name: "Yoga Mat",
      description: "Premium non-slip yoga mat made from eco-friendly materials. Ideal for yoga, pilates, and other floor exercises.",
      price: 39.99,
      category: "Sports & Fitness",
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      stock: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: generateId(),
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with precision tracking and long battery life. Compatible with Windows and Mac.",
      price: 34.99,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      stock: 80,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  console.log('✅ Mock database initialized with sample data');
  console.log(`👤 Admin user: username=admin, password=admin123`);
  console.log(`📦 Created ${products.length} sample products`);
};

export const mockDatabase = {
  users: {
    findOne: (query: any) => {
      return users.find(user => {
        if (query.$or) {
          return query.$or.some((condition: any) => 
            Object.keys(condition).every(key => user[key as keyof MockUser] === condition[key])
          );
        }
        return Object.keys(query).every(key => user[key as keyof MockUser] === query[key]);
      });
    },
    findById: (id: string) => users.find(user => user._id === id),
    create: async (userData: Partial<MockUser>) => {
      const newUser = {
        _id: generateId(),
        ...userData,
        createdAt: new Date()
      } as MockUser;
      users.push(newUser);
      return newUser;
    }
  },
  products: {
    find: (query: any = {}) => {
      let filtered = products;
      
      if (query.$or) {
        filtered = products.filter(product => 
          query.$or.some((condition: any) => 
            product.name.toLowerCase().includes(condition.name?.$regex?.toLowerCase() || '') ||
            product.description.toLowerCase().includes(condition.description?.$regex?.toLowerCase() || '')
          )
        );
      }
      
      if (query.category && query.category.$regex) {
        filtered = filtered.filter(product => 
          product.category.toLowerCase().includes(query.category.$regex.toLowerCase())
        );
      }
      
      if (query.price) {
        if (query.price.$gte) {
          filtered = filtered.filter(product => product.price >= query.price.$gte);
        }
        if (query.price.$lte) {
          filtered = filtered.filter(product => product.price <= query.price.$lte);
        }
      }
      
      return {
        skip: (n: number) => ({ 
          limit: (l: number) => ({ 
            sort: () => filtered.slice(n, n + l)
          })
        })
      };
    },
    findById: (id: string) => products.find(product => product._id === id),
    create: (productData: Partial<MockProduct>) => {
      const newProduct = {
        _id: generateId(),
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      } as MockProduct;
      products.push(newProduct);
      return newProduct;
    },
    findByIdAndUpdate: (id: string, updateData: Partial<MockProduct>) => {
      const productIndex = products.findIndex(p => p._id === id);
      if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updateData, updatedAt: new Date() };
        return products[productIndex];
      }
      return null;
    },
    findByIdAndDelete: (id: string) => {
      const productIndex = products.findIndex(p => p._id === id);
      if (productIndex !== -1) {
        return products.splice(productIndex, 1)[0];
      }
      return null;
    },
    countDocuments: (query: any = {}) => {
      return products.length; // Simplified count
    },
    distinct: (field: string) => {
      if (field === 'category') {
        return [...new Set(products.map(p => p.category))];
      }
      return [];
    }
  },
  orders: {
    find: (query: any = {}) => {
      let filtered = orders;
      if (query.user) {
        filtered = orders.filter(order => order.user === query.user);
      }
      return {
        populate: () => ({ 
          sort: () => filtered 
        })
      };
    },
    findOne: (query: any) => {
      return orders.find(order => 
        Object.keys(query).every(key => order[key as keyof MockOrder] === query[key])
      );
    },
    create: (orderData: Partial<MockOrder>) => {
      const newOrder = {
        _id: generateId(),
        ...orderData,
        createdAt: new Date(),
        updatedAt: new Date()
      } as MockOrder;
      orders.push(newOrder);
      return {
        ...newOrder,
        populate: () => newOrder
      };
    }
  }
};