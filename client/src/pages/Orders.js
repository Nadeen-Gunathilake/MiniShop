import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../api';

const STATUS_OPTIONS = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch {
      alert('Failed to update status');
    }
  };

  return (
    <div className="page">
      <h1>Orders</h1>
      {loading && <p className="status-msg">Loading orders...</p>}

      {orders.length === 0 && !loading && (
        <p className="status-msg">No orders yet.</p>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <strong>Order #{order._id.slice(-8)}</strong>
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className={`status-select status-${order.status}`}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="order-body">
              <p>{order.customerName} ({order.customerEmail})</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}</li>
                ))}
              </ul>
              <p className="order-total">Total: ${order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
