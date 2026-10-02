import mongoose from 'mongoose';

const customCoffeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    creatorName: {
      type: String,
      default: 'Coffee Alchemist',
    },
    customBlendTitle: {
      type: String,
      default: 'Signature Artisan Reserve',
    },
    bottle: {
      bottleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bottle' },
      name: { type: String, required: true },
      capacity: { type: String, default: '500ml' },
      price: { type: Number, required: true },
      image: { type: String, default: '' },
    },
    roastBase: {
      type: String,
      default: 'Signature Italian Espresso Base',
    },
    flavors: [
      {
        flavorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flavor' },
        name: { type: String, required: true },
        intensity: { type: String, enum: ['LIGHT', 'MEDIUM', 'STRONG'], default: 'MEDIUM' },
        colorHex: { type: String, default: '#3C2A21' },
      },
    ],
    condition: {
      type: String,
      enum: ['HOT', 'COOL'],
      required: true,
      default: 'COOL',
    },
    temperature: {
      type: String,
      default: '04°C',
    },
    milkBase: {
      type: String,
      default: 'Velvet Silk Oat Milk',
    },
    sweetnessLevel: {
      type: String,
      default: '50% Subtle Maple Pure',
    },
    toppings: [
      {
        type: String,
      },
    ],
    preparationTelemetry: {
      chamberUsed: { type: String, default: 'Cryogenic Precision Cooler' },
      targetTemp: { type: String, default: '04°C' },
      simulatedTime: { type: String, default: '15 Minutes' },
      brewViscosity: { type: String, default: 'High Density Crema' },
      qualityScore: { type: Number, default: 99.4 },
    },
    calculatedPrice: {
      type: Number,
      required: true,
      default: 12.50,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PREPARED', 'ORDERED'],
      default: 'PREPARED',
    },
  },
  { timestamps: true }
);

export const CustomCoffee = mongoose.model('CustomCoffee', customCoffeeSchema);
