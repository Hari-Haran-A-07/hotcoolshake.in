import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ['PRODUCT', 'CUSTOM_COFFEE'],
    default: 'PRODUCT',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null,
  },
  customCoffee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomCoffee',
    default: null,
  },
  name: { type: String, required: true },
  image: { type: String, default: '' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  temperature: { type: String, default: 'COOL' },
  customDetails: {
    bottle: { type: String, default: '' },
    flavors: [{ type: String }],
    condition: { type: String, default: '' },
    milk: { type: String, default: '' },
    size: { type: String, default: 'Standard' },
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      notes: { type: String, default: '' },
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    deliveryFee: {
      type: Number,
      default: 2.50,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['CARD', 'APPLE_PAY', 'GOOGLE_PAY', 'CASH_ON_DELIVERY'],
      default: 'CARD',
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED'],
      default: 'PAID',
    },
    status: {
      type: String,
      enum: [
        'CUSTOMIZED',
        'ORDER_RECEIVED',
        'ORDER_CONFIRMED',
        'PREPARING',
        'BLENDING',
        'HEATING_COOLING',
        'QUALITY_CHECK',
        'FINAL_CHECK',
        'READY',
        'DISPATCHED',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'COMPLETED',
        'CANCELLED',
      ],
      default: 'ORDER_CONFIRMED',
    },

    statusTimeline: [
      {
        status: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: '' },
        timestamp: { type: Date, default: Date.now },
        completed: { type: Boolean, default: false },
      },
    ],
    assignedHub: {
      name: { type: String, default: 'Global Flagship Roastery Lab' },
      city: { type: String, default: 'Flagship Lab' },
    },
    estimatedDeliveryTime: {
      type: String,
      default: '25-35 mins',
    },
    courierTracking: {
      driverName: { type: String, default: 'Alex Morgan' },
      vehicleType: { type: String, default: 'Zero-Emission Electric Courier' },
      currentCoords: {
        lat: { type: Number, default: 40.7128 },
        lng: { type: Number, default: -74.0060 },
      },
      temperatureTelemetry: { type: String, default: 'Strict 04°C Climate Lock' },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
