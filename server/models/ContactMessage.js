import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
    },
    subject: {
      type: String,
      required: true,
    },
    inquiryType: {
      type: String,
      enum: ['CUSTOMER_SUPPORT', 'FLAGSHIP_PARTNERSHIP', 'CORPORATE_CATERING', 'PRESS_MEDIA', 'OTHER'],
      default: 'CUSTOMER_SUPPORT',
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['NEW', 'IN_PROGRESS', 'RESOLVED'],
      default: 'NEW',
    },
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
