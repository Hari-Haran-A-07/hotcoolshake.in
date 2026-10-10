import mongoose from 'mongoose';

const giftCardSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientEmail: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 10,
    },
    balance: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    design: {
      type: String,
      default: 'OBSIDIAN_GOLD',
    },
    sendDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'REDEEMED', 'EXPIRED', 'PENDING'],
      default: 'ACTIVE',
    },
    redeemedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const GiftCard = mongoose.model('GiftCard', giftCardSchema);
