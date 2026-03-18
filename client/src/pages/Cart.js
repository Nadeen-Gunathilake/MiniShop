import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [error, setError] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        customerName,
        customerEmail,
      };
      const res = await createOrder(orderData);
      setOrderPlaced(res.data);
      clearCart();
      setCustomerName('');
      setCustomerEmail('');
      setError('');
    } catch (err) {
      setError('Failed to place order. Please try again.');
    }
  };

  if (orderPlaced) {
    return (
      <div className="page">
        <div className="success-box">
          <h2>Order Placed!</h2>
          <p>Order ID: <strong>{orderPlaced._id}</strong></p>
          <p>Total: <strong>${orderPlaced.totalAmount.toFixed(2)}</strong></p>
          <p>Status: <strong>{orderPlaced.status}</strong></p>
          <button className="btn btn-primary" onClick={() => setOrderPlaced(null)}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <h1>Cart</h1>
        <p className="status-msg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Cart</h1>
      {error && <p className="status-msg error">{error}</p>}

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button className="btn-remove" onClick={() => removeFromCart(item._id)}>
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="checkout-box">
          <h2>Checkout</h2>
          <p className="cart-total">Total: <strong>${totalAmount.toFixed(2)}</strong></p>
          <form onSubmit={handleCheckout}>
            <input
              type="text"
              placeholder="Your Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary btn-full">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
