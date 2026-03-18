import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, deleteProduct } from '../api';

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  category: 'other',
  image: '',
  quantity: '',
};

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch {
      setMsg('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...form,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity) || 0,
        inStock: parseInt(form.quantity) > 0,
      });
      setForm(EMPTY_FORM);
      setMsg('Product added!');
      fetchProducts();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch {
      setMsg('Failed to delete product');
    }
  };

  return (
    <div className="page">
      <h1>Admin - Manage Products</h1>
      {msg && <p className="status-msg">{msg}</p>}

      <div className="admin-layout">
        <div className="admin-form-box">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={3} />
            <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="household">Household</option>
              <option value="other">Other</option>
            </select>
            <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} />
            <input name="quantity" type="number" placeholder="Quantity in Stock" value={form.quantity} onChange={handleChange} />
            <button type="submit" className="btn btn-primary btn-full">Add Product</button>
          </form>
        </div>

        <div className="admin-product-list">
          <h2>All Products ({products.length})</h2>
          {loading && <p>Loading...</p>}
          {products.map((p) => (
            <div key={p._id} className="admin-product-item">
              <div>
                <strong>{p.name}</strong> — ${p.price.toFixed(2)}
                <span className={`stock-badge ${p.inStock ? 'in-stock' : 'out-stock'}`}>
                  {p.inStock ? `In Stock (${p.quantity})` : 'Out of Stock'}
                </span>
              </div>
              <button className="btn-remove" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
