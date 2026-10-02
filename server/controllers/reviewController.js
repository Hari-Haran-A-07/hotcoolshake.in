import { Review } from '../models/Review.js';

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a review
// @route   POST /api/reviews
// @access  Public
export const createReview = async (req, res, next) => {
  try {
    const { authorName, role, city, rating, comment, favoriteCreation } = req.body;

    if (!authorName || !comment || !rating) {
      return res.status(400).json({ success: false, message: 'Please provide required review fields' });
    }

    const review = await Review.create({
      authorName,
      role: role || 'Coffee Lover',
      city: city || 'Global',
      rating,
      comment,
      favoriteCreation: favoriteCreation || 'Custom Laboratory Blend',
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};
