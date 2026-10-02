import mongoose from 'mongoose';

const bottleSchema = new mongoose.Schema(
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
    capacity: {
      type: String,
      required: true,
      default: '500ml',
    },
    material: {
      type: String,
      default: 'Double-walled Insulated Stainless Steel',
    },
    thermalRetention: {
      type: String,
      default: 'Hot 12h / Cold 24h',
    },
    price: {
      type: Number,
      required: true,
      default: 8.50,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: '',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Bottle = mongoose.model('Bottle', bottleSchema);
