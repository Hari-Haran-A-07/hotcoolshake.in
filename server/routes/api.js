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
  getCampaigns,
  getCampaignByIdOrSlug,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campaignController.js';
import {
  getMyRewards,
  redeemPoints,
} from '../controllers/rewardController.js';
import {
  createGiftCard,
  getGiftCardByCode,
} from '../controllers/giftCardController.js';
import {
  getDashboardStats,
  getAdminOrders,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  createAdminFlavor,
  createAdminBottle,
  createAdminLocation,
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
    tagline: 'COFFEE, REIMAGINED AROUND YOUR TASTE.',
    timestamp: new Date().toISOString(),
  });
});

// Authentication
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/profile', protect, getUserProfile);
router.get('/auth/me', protect, getUserProfile);
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

// Global Locations / Stores
router.get('/locations', getLocations);
router.get('/stores', getLocations);

// Campaigns & CMS
router.get('/campaigns', getCampaigns);
router.get('/campaigns/:idOrSlug', getCampaignByIdOrSlug);
router.post('/campaigns', protect, admin, createCampaign);
router.patch('/campaigns/:id', protect, admin, updateCampaign);
router.delete('/campaigns/:id', protect, admin, deleteCampaign);

// Rewards
router.get('/rewards', protect, getMyRewards);
router.post('/rewards/redeem', protect, redeemPoints);

// Gift Cards
router.post('/gift-cards', createGiftCard);
router.get('/gift-cards/:code', getGiftCardByCode);

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
router.post('/admin/flavors', protect, admin, createAdminFlavor);
router.post('/admin/bottles', protect, admin, createAdminBottle);
router.post('/admin/locations', protect, admin, createAdminLocation);
router.get('/admin/messages', protect, admin, getAdminMessages);
router.put('/admin/messages/:id/status', protect, admin, updateAdminMessageStatus);

export default router;
