import { Order } from '../models/Order.js';

const INITIAL_TIMELINE = [
  { status: 'CUSTOMIZED', title: 'Lab Configuration Crafted', description: 'Your temperature, bottle & flavor alchemy finalized.', completed: true },
  { status: 'ORDER_CONFIRMED', title: 'Order Confirmed', description: 'Received at Global Flagship Roastery Lab.', completed: true },
  { status: 'PREPARING', title: 'Precision Automated Brewing', description: 'Extraction and thermal cycle active.', completed: false },
  { status: 'QUALITY_CHECK', title: 'Optical & Sensor Quality Check', description: 'Viscosity, temperature and sealing verified.', completed: false },
  { status: 'READY', title: 'Packaged in Thermal Lock', description: 'Sealed for temperature lock retention.', completed: false },
  { status: 'DISPATCHED', title: 'Dispatched from Hub', description: 'Handed to electric zero-emission courier.', completed: false },
  { status: 'OUT_FOR_DELIVERY', title: 'Out For Delivery', description: 'Courier approaching your destination route.', completed: false },
  { status: 'DELIVERED', title: 'Handcrafted Perfection Delivered', description: 'Enjoy your custom HOT COOL SHAKE!', completed: false },
];

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (Guest or Auth)
export const createOrder = async (req, res, next) => {
  try {
    const {
      customer,
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items provided' });
    }

    if (!customer || !customer.name || !customer.address || !customer.city) {
      return res.status(400).json({ success: false, message: 'Please provide delivery address details' });
    }

    const orderCount = await Order.countDocuments();
    const orderNumber = `HCS-${new Date().getFullYear()}-${String(orderCount + 1001).padStart(5, '0')}`;

    const order = await Order.create({
      orderNumber,
      user: req.user ? req.user._id : null,
      customer: {
        name: customer.name,
        email: customer.email || 'guest@hotcoolshake.com',
        phone: customer.phone || '',
        address: customer.address,
        city: customer.city,
        postalCode: customer.postalCode || '',
        notes: customer.notes || '',
      },
      items,
      subtotal: subtotal || total,
      discount: discount || 0,
      deliveryFee: deliveryFee !== undefined ? deliveryFee : 2.50,
      total,
      paymentMethod: paymentMethod || 'CARD',
      paymentStatus: 'PAID',
      status: 'ORDER_CONFIRMED',
      statusTimeline: INITIAL_TIMELINE,
      assignedHub: {
        name: `Flagship Hub (${customer.city || 'Central'})`,
        city: customer.city || 'Central City',
      },
      estimatedDeliveryTime: '25-35 mins',
      courierTracking: {
        driverName: 'Kai Vance',
        vehicleType: 'Climate-Controlled Electric Shuttle',
        currentCoords: { lat: 40.7128, lng: -74.0060 },
        temperatureTelemetry: 'Maintained at strict calibrated temperature',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID or orderNumber
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let order;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id).populate('user', 'name email');
    } else {
      order = await Order.findOne({ orderNumber: id }).populate('user', 'name email');
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin / Simulator)
// @route   PUT /api/orders/:id/status
// @access  Public / Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const stateOrder = [
      'CUSTOMIZED',
      'ORDER_CONFIRMED',
      'PREPARING',
      'QUALITY_CHECK',
      'READY',
      'DISPATCHED',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
    ];

    const targetIndex = stateOrder.indexOf(status);

    if (targetIndex !== -1) {
      order.status = status;
      order.statusTimeline = order.statusTimeline.map((item, index) => {
        const itemIndex = stateOrder.indexOf(item.status);
        return {
          ...item.toObject(),
          completed: itemIndex <= targetIndex,
          timestamp: itemIndex === targetIndex ? new Date() : item.timestamp,
        };
      });
    } else {
      order.status = status;
    }

    const updatedOrder = await order.save();
    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};
