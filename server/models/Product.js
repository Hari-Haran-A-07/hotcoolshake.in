import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    categorySlug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    story: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    temperature: {
      type: String,
      enum: ['HOT', 'COOL', 'SHAKE', 'DUAL_SERVE'],
      default: 'COOL',
    },
    flavorNotes: [{
      type: String,
      trim: true,
    }],
    ingredients: [{
      type: String,
      trim: true,
    }],
    nutrition: {
      calories: { type: Number, default: 180 },
      caffeine: { type: String, default: '140mg' },
      sugar: { type: String, default: '12g' },
      fat: { type: String, default: '4.5g' },
      protein: { type: String, default: '6g' },
    },
    image: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 4.9,
      min: 1,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 120,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
