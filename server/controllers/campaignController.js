import { Campaign } from '../models/Campaign.js';
import { Product } from '../models/Product.js';

// @desc    Get all active campaigns
// @route   GET /api/campaigns
// @access  Public
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ active: true })
      .populate('products')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: campaigns.length,
      campaigns,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single campaign by slug or ID
// @route   GET /api/campaigns/:idOrSlug
// @access  Public
export const getCampaignByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const isId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);

    const campaign = isId
      ? await Campaign.findById(idOrSlug).populate('products')
      : await Campaign.findOne({ slug: idOrSlug }).populate('products');

    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    res.json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new campaign
// @route   POST /api/campaigns
// @access  Private/Admin
export const createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json({ success: true, campaign });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update campaign
// @route   PATCH /api/campaigns/:id
// @access  Private/Admin
export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.json({ success: true, campaign });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete campaign
// @route   DELETE /api/campaigns/:id
// @access  Private/Admin
export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.json({ success: true, message: 'Campaign removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
