import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: 'Coffee Enthusiast',
    },
    city: {
      type: String,
      default: 'Global Citizen',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    favoriteCreation: {
      type: String,
      default: 'Double Caramel Obsidian Chill (04°C)',
    },
    avatar: {
      type: String,
      default: '',
    },
    verifiedBuyer: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model('Review', reviewSchema);
