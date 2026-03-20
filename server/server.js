const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/health', require('./routes/health'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Root
app.get('/', (req, res) => {
  res.json({ message: 'MiniShop API is running' });
});

// Start server (only if not in test mode)
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
