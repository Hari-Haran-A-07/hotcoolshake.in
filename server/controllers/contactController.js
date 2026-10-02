import { ContactMessage } from '../models/ContactMessage.js';

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
