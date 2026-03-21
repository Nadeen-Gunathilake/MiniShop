# MiniShop

A full-stack e-commerce application built with **MongoDB Atlas, Express, React, and Node.js**. Includes Dockerized deployment, a CI/CD pipeline with GitHub Actions, and automated testing.

## Features

- Browse products by category
- Add to cart, adjust quantities, and checkout
- Admin panel to manage products
- Orders dashboard with status tracking
- Health check endpoint for monitoring (`/api/health`)

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, React Router, Axios |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB Atlas |
| Testing | Jest, Supertest |
| CI/CD | GitHub Actions |
| Containerization | Docker, Docker Compose |

## Getting Started

### Prerequisites
- Node.js 18+
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account

### Server
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```
PORT=5000
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/minishop
NODE_ENV=development
```

```bash
npm start
```

### Client
```bash
cd client
npm install
npm start
```

App runs at `http://localhost:3000`, API at `http://localhost:5000`.

## Running with Docker

```bash
docker-compose up --build
```

## Tests

```bash
cd server && npm test
cd client && npm run test:ci
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/orders` | List orders |
| POST | `/api/orders` | Place order |
| PATCH | `/api/orders/:id/status` | Update order status |