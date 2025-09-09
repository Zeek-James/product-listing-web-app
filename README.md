# Product Listing Web App

A full-stack e-commerce application built with Next.js, TypeScript, Node.js, Express, and MongoDB.

## 🚀 Features

### Core Features
- ✅ **User Authentication** - JWT-based login and registration system
- ✅ **Product Listing** - Display products with pagination, search, and filters
- ✅ **Shopping Cart** - Global state management with persistent cart
- ✅ **Product Management** - Full CRUD operations for products
- ✅ **Checkout System** - Place orders and manage cart items

### Bonus Features
- ✅ **Persistent Login** - JWT-based authentication with automatic token refresh
- ✅ **Cart Persistence** - Cart state saved in localStorage
- ✅ **Pagination** - Product listing with pagination support
- ✅ **Product Images** - Image support with placeholder fallbacks
- ✅ **Category Filtering** - Filter products by category

## 🏗️ Technology Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Context API** for state management
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## 📂 Project Structure

```
├── frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── app/       # Next.js app router pages
│   │   ├── components/ # Reusable React components
│   │   ├── contexts/  # React Context providers
│   │   └── lib/       # Utility functions and API client
├── backend/           # Node.js backend API
│   └── src/
│       ├── models/    # MongoDB schemas
│       ├── routes/    # Express route handlers
│       ├── middleware/ # Authentication middleware
│       └── utils/     # Utility functions
└── docs/             # Documentation and deployment guides
```

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- Git

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd product-listing-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

Create `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-listing
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Create `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Database Setup

Start MongoDB locally or use MongoDB Atlas, then seed the database:

```bash
cd backend
npm run seed
```

This creates:
- Admin user: `username: admin, password: admin123`
- 10 sample products across different categories

### 4. Start the Applications

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📖 Usage Guide

### For Users
1. **Browse Products**: Visit the products page to see all available items
2. **Search & Filter**: Use the search bar and filters to find specific products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click the cart icon in the navigation
5. **Checkout**: Review your cart and place an order (requires login)

### For Administrators
1. **Login**: Use the admin credentials (admin/admin123)
2. **Admin Panel**: Access the admin page from the navigation
3. **Manage Products**: Create, edit, or delete products
4. **View Individual Products**: Click on any product to see details and edit options

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products with optional filters
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)
- `GET /api/products/categories` - Get all categories

### Orders
- `GET /api/orders` - Get user orders (auth required)
- `POST /api/orders` - Create new order (auth required)
- `GET /api/orders/:id` - Get single order (auth required)

## 🌐 Deployment

The application can be deployed to various cloud platforms. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on:

- **Heroku** - Simple deployment with Git
- **Vercel** - Optimized for Next.js frontend
- **Railway** - Modern deployment platform
- **DigitalOcean** - App Platform deployment
- **AWS** - Elastic Beanstalk or ECS deployment
- **Docker** - Containerized deployment

### Quick Docker Deployment

```bash
docker-compose up -d
```

This starts:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend app on port 3000

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Product listing and pagination
- [ ] Search and category filtering
- [ ] Add/remove items from cart
- [ ] Cart persistence across browser sessions
- [ ] Product CRUD operations (admin)
- [ ] Order creation and checkout
- [ ] Responsive design on mobile/desktop

### API Testing

Use tools like Postman or curl to test the API endpoints:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

## 📋 Features Checklist

### Required Features ✅
- [x] **Login System** - Simple username/password authentication
- [x] **All Products Page** - Product listing with search and filters
- [x] **Global Cart State** - React Context for cart management
- [x] **Product Page** - Individual product details with CRUD operations
- [x] **Checkout Page** - Cart management and order placement

### Backend Requirements ✅
- [x] **Database Setup** - MongoDB with Users, Products, Orders collections
- [x] **API Endpoints** - Complete REST API with authentication
- [x] **CRUD Operations** - Full product management system

### Bonus Features ✅
- [x] **Persistent Login** - JWT-based authentication
- [x] **Cart Persistence** - LocalStorage integration
- [x] **Pagination** - Product listing pagination
- [x] **Product Images** - Image URL support with fallbacks
- [x] **Category Filtering** - Dynamic category-based filtering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment-specific issues
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check the browser console and server logs for error messages

For additional support, please create an issue in the repository.