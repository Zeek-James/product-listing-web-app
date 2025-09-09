import User from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';
import { mockDatabase } from './mockDatabase';

export const getDB = () => {
  if (process.env.USE_MOCK_DB === 'true') {
    return {
      User: {
        findOne: mockDatabase.users.findOne,
        findById: mockDatabase.users.findById,
        create: mockDatabase.users.create
      },
      Product: {
        find: mockDatabase.products.find,
        findById: mockDatabase.products.findById,
        create: mockDatabase.products.create,
        findByIdAndUpdate: mockDatabase.products.findByIdAndUpdate,
        findByIdAndDelete: mockDatabase.products.findByIdAndDelete,
        countDocuments: mockDatabase.products.countDocuments,
        distinct: mockDatabase.products.distinct
      },
      Order: {
        find: mockDatabase.orders.find,
        findOne: mockDatabase.orders.findOne,
        create: mockDatabase.orders.create
      }
    };
  }
  
  return {
    User,
    Product,
    Order
  };
};