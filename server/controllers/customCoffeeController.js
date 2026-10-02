import { CustomCoffee } from '../models/CustomCoffee.js';
import { Bottle } from '../models/Bottle.js';
import { Flavor } from '../models/Flavor.js';

// @desc    Create a new custom coffee from Make Your Coffee laboratory
// @route   POST /api/custom-coffee
// @access  Public (Optional User)
export const createCustomCoffee = async (req, res, next) => {
  try {
    const {
      creatorName,
      customBlendTitle,
      bottle,
      roastBase,
      flavors,
      condition,
      temperature,
      milkBase,
      sweetnessLevel,
      toppings,
      calculatedPrice,
    } = req.body;

    if (!bottle || !bottle.name || !condition) {
      return res.status(400).json({ success: false, message: 'Please provide required custom coffee details' });
    }

    // Default pricing logic if not computed
    let basePrice = bottle.price || 8.50;
    const flavorExtra = (flavors && flavors.length > 0) ? flavors.length * 1.25 : 0;
    const toppingsExtra = (toppings && toppings.length > 0) ? toppings.length * 0.75 : 0;
    const finalPrice = calculatedPrice || Number((basePrice + flavorExtra + toppingsExtra).toFixed(2));

    const telemetry = {
      chamberUsed: condition === 'COOL' ? 'Cryogenic Fluid Chilling Chamber' : 'Precision Thermal Induction Core',
      targetTemp: condition === 'COOL' ? '04°C' : '68°C',
      simulatedTime: condition === 'COOL' ? '15-20 Minutes Chilled' : '10-12 Minutes Heated',
      brewViscosity: 'Ultra-Pure Micro-Foam Texture',
      qualityScore: 99.7,
    };

    const customCoffee = await CustomCoffee.create({
      user: req.user ? req.user._id : null,
      creatorName: creatorName || (req.user ? req.user.name : 'Master Alchemist'),
      customBlendTitle: customBlendTitle || 'HOT COOL SHAKE Lab Creation',
      bottle: {
        bottleId: bottle.bottleId || null,
        name: bottle.name,
        capacity: bottle.capacity || '500ml',
        price: bottle.price || 8.50,
        image: bottle.image || '',
      },
      roastBase: roastBase || 'Signature Espresso Extract',
      flavors: flavors || [],
      condition: condition || 'COOL',
      temperature: temperature || (condition === 'COOL' ? '04°C' : '68°C'),
      milkBase: milkBase || 'Velvet Silk Oat Milk',
      sweetnessLevel: sweetnessLevel || '50% Balance',
      toppings: toppings || [],
      preparationTelemetry: telemetry,
      calculatedPrice: finalPrice,
      status: 'PREPARED',
    });

    res.status(201).json({
      success: true,
      message: 'Custom coffee created and telemetrically verified',
      customCoffee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get custom coffee creation by ID
// @route   GET /api/custom-coffee/:id
// @access  Public
export const getCustomCoffeeById = async (req, res, next) => {
  try {
    const customCoffee = await CustomCoffee.findById(req.params.id);
    if (!customCoffee) {
      return res.status(404).json({ success: false, message: 'Custom coffee creation not found' });
    }
    res.json({ success: true, customCoffee });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent custom coffee creations (community laboratory gallery)
// @route   GET /api/custom-coffee
// @access  Public
export const getRecentCustomCoffees = async (req, res, next) => {
  try {
    const customCoffees = await CustomCoffee.find()
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({ success: true, count: customCoffees.length, customCoffees });
  } catch (error) {
    next(error);
  }
};
