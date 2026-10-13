import { Feedback } from '../models/Feedback.js';

/**
 * @desc Submit tasting and sensory feedback
 * @route POST /api/feedback
 * @access Public
 */
export const submitFeedback = async (req, res, next) => {
  try {
    const { npsScore = 10, aromaRating = 5, flavorRating = 5, comment = '', source = 'WEB_MODAL' } = req.body;

    let sentiment = 'PROMOTER';
    if (npsScore <= 6) sentiment = 'DETRACTOR';
    else if (npsScore <= 8) sentiment = 'PASSIVE';

    const feedback = await Feedback.create({
      npsScore: Math.max(0, Math.min(10, Number(npsScore))),
      aromaRating: Math.max(1, Math.min(5, Number(aromaRating))),
      flavorRating: Math.max(1, Math.min(5, Number(flavorRating))),
      comment: String(comment || '').trim(),
      sentiment,
      source,
    });

    res.status(201).json({
      success: true,
      message: 'Feedback recorded successfully by the Roast Master Lab',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get feedback summary and recent items
 * @route GET /api/feedback
 * @access Public / Admin
 */
export const getFeedbackStats = async (req, res, next) => {
  try {
    const count = await Feedback.countDocuments();
    const recent = await Feedback.find().sort({ createdAt: -1 }).limit(10);
    res.json({
      success: true,
      count,
      data: recent,
    });
  } catch (error) {
    next(error);
  }
};
