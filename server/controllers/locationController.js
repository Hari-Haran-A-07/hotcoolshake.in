import { Location } from '../models/Location.js';

// @desc    Get all international locations
// @route   GET /api/locations
// @access  Public
export const getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find({ isActive: true }).sort({ isFlagship: -1, name: 1 });
    res.json({ success: true, count: locations.length, locations });
  } catch (error) {
    next(error);
  }
};
