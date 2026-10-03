import { ContactMessage } from '../models/ContactMessage.js';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber.js';

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, inquiryType, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone: phone || '',
      subject,
      inquiryType: inquiryType || 'CUSTOMER_SUPPORT',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received by HOT COOL SHAKE Concierge',
      contactMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { email: email.toLowerCase().trim(), isActive: true, tier: 'VIP_COFFEE_CLUB' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Welcome to the HOT COOL SHAKE Inner Circle.',
      subscriber,
    });
  } catch (error) {
    next(error);
  }
};

