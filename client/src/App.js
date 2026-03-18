import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Orders from './pages/Orders';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
