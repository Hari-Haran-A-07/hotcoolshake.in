import { GiftCard } from '../models/GiftCard.js';

// Helper to generate unique luxury code: e.g. HCS-GIFT-8942-X7
const generateCardCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `HCS-GIFT-${rand}`;
};

// @desc    Purchase / Create Digital Gift Card
// @route   POST /api/gift-cards
// @access  Public
export const createGiftCard = async (req, res) => {
  try {
    const {
      senderName,
      senderEmail,
      recipientName,
      recipientEmail,
      amount,
      message,
      design,
      sendDate,
    } = req.body;

    if (!senderName || !recipientEmail || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Sender name, recipient email, and amount are required',
      });
    }

    const code = generateCardCode();
    const giftCard = await GiftCard.create({
      code,
      senderName,
      senderEmail,
      recipientName,
      recipientEmail,
      amount: Number(amount),
      balance: Number(amount),
      message,
      design: design || 'OBSIDIAN_GOLD',
      sendDate: sendDate || new Date(),
      status: 'ACTIVE',
    });

    res.status(201).json({
      success: true,
      message: 'Digital Gift Card successfully created!',
      giftCard,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Check Digital Gift Card balance
// @route   GET /api/gift-cards/:code
// @access  Public
export const getGiftCardByCode = async (req, res) => {
  try {
    const giftCard = await GiftCard.findOne({
      code: req.params.code.toUpperCase().trim(),
    });

    if (!giftCard) {
      return res.status(404).json({ success: false, message: 'Invalid gift card code' });
    }

    res.json({
      success: true,
      giftCard: {
        code: giftCard.code,
        balance: giftCard.balance,
        amount: giftCard.amount,
        status: giftCard.status,
        design: giftCard.design,
        recipientName: giftCard.recipientName,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
