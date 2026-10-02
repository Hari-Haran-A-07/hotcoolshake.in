import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      enum: ['ASIA', 'MIDDLE_EAST', 'EUROPE', 'NORTH_AMERICA', 'OCEANIA'],
      default: 'ASIA',
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    features: [{ type: String }],
    labCapacity: {
      type: String,
      default: '120 Automated Customization Units',
    },
    openingHours: {
      type: String,
      default: '06:00 AM - 11:00 PM Daily',
    },
    phone: {
      type: String,
      default: '+1 (800) 468-2665',
    },
    image: {
      type: String,
      default: '',
    },
    isFlagship: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Location = mongoose.model('Location', locationSchema);
