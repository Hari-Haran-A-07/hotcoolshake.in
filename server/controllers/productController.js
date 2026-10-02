import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Flavor } from '../models/Flavor.js';
import { Bottle } from '../models/Bottle.js';

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, temperature, featured, search, sort } = req.query;
    let query = { isAvailable: true };

    if (category && category !== 'ALL') {
      query.categorySlug = category.toLowerCase();
    }

    if (temperature && temperature !== 'ALL') {
      query.temperature = temperature.toUpperCase();
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { flavorNotes: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    let sortQuery = { createdAt: -1 };
    if (sort === 'price-asc') sortQuery = { price: 1 };
    if (sort === 'price-desc') sortQuery = { price: -1 };
    if (sort === 'rating') sortQuery = { rating: -1 };
    if (sort === 'popular') sortQuery = { reviewsCount: -1 };

    const products = await Product.find(query).populate('category').sort(sortQuery);
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by slug or ID
// @route   GET /api/products/:slugOrId
// @access  Public
export const getProductByIdOrSlug = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    let product;

    if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(slugOrId).populate('category');
    } else {
      product = await Product.findOne({ slug: slugOrId }).populate('category');
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Get categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Get flavors library
// @route   GET /api/flavors
// @access  Public
export const getFlavors = async (req, res, next) => {
  try {
    const flavors = await Flavor.find({ inStock: true });
    res.json({ success: true, count: flavors.length, flavors });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bottles catalog
// @route   GET /api/bottles
// @access  Public
export const getBottles = async (req, res, next) => {
  try {
    const bottles = await Bottle.find({ inStock: true });
    res.json({ success: true, count: bottles.length, bottles });
  } catch (error) {
    next(error);
  }
};
