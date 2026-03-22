const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return API running message', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('MiniShop API is running');
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('version');
    });
  });

  describe('POST /api/orders', () => {
    it('should reject empty order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({ items: [], customerName: 'Test', customerEmail: 'test@test.com' });
      expect(res.statusCode).toBe(400);
    });
  });
});