import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    npsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    aromaRating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    flavorRating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: '',
      trim: true,
    },
    sentiment: {
      type: String,
      enum: ['PROMOTER', 'PASSIVE', 'DETRACTOR'],
      default: 'PROMOTER',
    },
    source: {
      type: String,
      default: 'WEB_MODAL',
    },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);
