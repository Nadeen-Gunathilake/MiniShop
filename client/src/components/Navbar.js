import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
            MiniShop
        </Link>
        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart" className="cart-link">
            Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
