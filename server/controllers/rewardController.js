import { Reward } from '../models/Reward.js';
import { User } from '../models/User.js';

// @desc    Get current user rewards history and summary
// @route   GET /api/rewards
// @access  Private
export const getMyRewards = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const user = await User.findById(userId);
    const history = await Reward.find({ user: userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      points: user.rewardsPoints || 0,
      tier: user.tier || 'STARTER',
      history,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Redeem Shake points for reward perk
// @route   POST /api/rewards/redeem
// @access  Private
export const redeemPoints = async (req, res) => {
  try {
    const { points, perkName } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.rewardsPoints < points) {
      return res.status(400).json({
        success: false,
        message: `Insufficient points. You have ${user.rewardsPoints} Shake Points.`,
      });
    }

    user.rewardsPoints -= Number(points);
    await user.save();

    const transaction = await Reward.create({
      user: userId,
      points: -Number(points),
      transactionType: 'REDEEMED',
      description: `Redeemed for: ${perkName || 'Reward Perk'}`,
    });

    res.json({
      success: true,
      message: `Successfully redeemed ${points} Shake Points for ${perkName}!`,
      remainingPoints: user.rewardsPoints,
      transaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
