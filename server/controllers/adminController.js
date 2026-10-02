import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { CustomCoffee } from '../models/CustomCoffee.js';
import { User } from '../models/User.js';
import { Flavor } from '../models/Flavor.js';
import { Bottle } from '../models/Bottle.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { Category } from '../models/Category.js';

// @desc    Get Admin Dashboard statistics from MongoDB
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCustomCoffees = await CustomCoffee.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalMessages = await ContactMessage.countDocuments();

    // Calculate real revenue from completed/confirmed orders
    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(8);

    const recentCustomCoffees = await CustomCoffee.find()
      .sort({ createdAt: -1 })
      .limit(6);

    // Sales by temperature
    const hotOrdersCount = orders.filter(o => o.items.some(i => i.temperature === 'HOT')).length;
    const coolOrdersCount = orders.filter(o => o.items.some(i => i.temperature === 'COOL' || i.temperature === 'SHAKE')).length;

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalProducts,
        totalCustomCoffees,
        totalUsers,
        totalMessages,
        temperatureSplit: {
          hot: hotOrdersCount,
          cool: coolOrdersCount,
        },
        recentOrders,
        recentCustomCoffees,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAdminOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Private/Admin
export const createAdminProduct = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      categorySlug,
      description,
      story,
      price,
      temperature,
      flavorNotes,
      ingredients,
      image,
      featured,
      badge,
    } = req.body;

    let category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      category = await Category.findOne();
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const product = await Product.create({
      name,
      slug: generatedSlug,
      category: category ? category._id : null,
      categorySlug: category ? category.slug : 'hot-coffee',
      description,
      story: story || '',
      price: Number(price),
      temperature: temperature || 'COOL',
      flavorNotes: Array.isArray(flavorNotes) ? flavorNotes : (flavorNotes ? flavorNotes.split(',').map(s => s.trim()) : []),
      ingredients: Array.isArray(ingredients) ? ingredients : (ingredients ? ingredients.split(',').map(s => s.trim()) : []),
      image,
      featured: Boolean(featured),
      badge: badge || '',
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateAdminProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteAdminProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/admin/messages
// @access  Private/Admin
export const getAdminMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact inquiry status
// @route   PUT /api/admin/messages/:id/status
// @access  Private/Admin
export const updateAdminMessageStatus = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    message.status = req.body.status || 'RESOLVED';
    await message.save();
    res.json({ success: true, message });
  } catch (error) {
    next(error);
  }
};
