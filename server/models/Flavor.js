import mongoose from 'mongoose';

const flavorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['ROAST', 'SWEET', 'NUTTY', 'FRUITY', 'INDULGENT', 'SPICED', 'SPECIALTY'],
      default: 'ROAST',
    },
    colorHex: {
      type: String,
      default: '#3C2A21',
    },
    intensityLevels: {
      type: [String],
      default: ['LIGHT', 'MEDIUM', 'STRONG'],
    },
    priceMultiplier: {
      type: Number,
      default: 0.5,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Flavor = mongoose.model('Flavor', flavorSchema);
