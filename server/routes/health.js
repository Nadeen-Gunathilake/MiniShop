const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET /api/health - health check endpoint (useful for CI/CD, K8s probes, load balancers)
router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const healthy = dbState === 1;

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'unhealthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus[dbState] || 'unknown',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
