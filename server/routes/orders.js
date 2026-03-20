const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders - list all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id - get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders - place an order
router.post('/', async (req, res) => {
  try {
    const { items, customerName, customerEmail } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must have at least one item' });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      items,
      totalAmount,
      customerName,
      customerEmail,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/orders/:id/status - update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
