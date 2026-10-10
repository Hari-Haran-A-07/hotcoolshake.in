import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['EARNED', 'REDEEMED', 'BONUS', 'TIER_UPGRADE'],
      default: 'EARNED',
    },
    description: {
      type: String,
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  },
  { timestamps: true }
);

export const Reward = mongoose.model('Reward', rewardSchema);
