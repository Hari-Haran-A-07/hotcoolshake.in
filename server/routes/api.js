import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/authController.js';
import {
  getProducts,
  getProductByIdOrSlug,
  getCategories,
  getFlavors,
  getBottles,
} from '../controllers/productController.js';
import {
  createCustomCoffee,
  getCustomCoffeeById,
  getRecentCustomCoffees,
} from '../controllers/customCoffeeController.js';
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
} from '../controllers/orderController.js';
import { getLocations } from '../controllers/locationController.js';
import { getReviews, createReview } from '../controllers/reviewController.js';
import { submitContactMessage, subscribeNewsletter } from '../controllers/contactController.js';
import {
  getDashboardStats,
  getAdminOrders,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  getAdminMessages,
  updateAdminMessageStatus,
} from '../controllers/adminController.js';
import { protect, admin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'HOT COOL SHAKE',
    tagline: 'HOT. COOL. YOUR WAY.',
    timestamp: new Date().toISOString(),
  });
});

// Authentication
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/profile', protect, getUserProfile);
router.put('/auth/profile', protect, updateUserProfile);

// Catalog / Products
router.get('/products', getProducts);
router.get('/products/:slugOrId', getProductByIdOrSlug);
router.get('/categories', getCategories);
router.get('/flavors', getFlavors);
router.get('/bottles', getBottles);

// Custom Coffee Laboratory
router.post('/custom-coffee', optionalAuth, createCustomCoffee);
router.get('/custom-coffee', getRecentCustomCoffees);
router.get('/custom-coffee/:id', getCustomCoffeeById);

// Orders & Tracking
router.post('/orders', optionalAuth, createOrder);
router.get('/orders/my-orders', protect, getMyOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id/status', updateOrderStatus);
router.patch('/orders/:id/status', updateOrderStatus);

// Global Locations
router.get('/locations', getLocations);

// Reviews & Testimonials
router.get('/reviews', getReviews);
router.post('/reviews', createReview);

// Contact Concierge & Newsletter
router.post('/contact', submitContactMessage);
router.post('/newsletter', subscribeNewsletter);

// Admin Routes (protected, admin role)
router.get('/admin/stats', protect, admin, getDashboardStats);
router.get('/admin/orders', protect, admin, getAdminOrders);
router.post('/admin/products', protect, admin, createAdminProduct);
router.put('/admin/products/:id', protect, admin, updateAdminProduct);
router.delete('/admin/products/:id', protect, admin, deleteAdminProduct);
router.get('/admin/messages', protect, admin, getAdminMessages);
router.put('/admin/messages/:id/status', protect, admin, updateAdminMessageStatus);

export default router;

