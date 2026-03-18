import React, { useState, useEffect } from 'react';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['all', 'electronics', 'clothing', 'books', 'household', 'other'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = category !== 'all' ? { category } : {};
        const res = await getProducts(params);
        setProducts(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load products. Is the server running?');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="page">
      <h1>Products</h1>
      <div className="category-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p className="status-msg">Loading products...</p>}
      {error && <p className="status-msg error">{error}</p>}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {!loading && !error && products.length === 0 && (
        <p className="status-msg">No products found. Add some from the Admin page!</p>
      )}
    </div>
  );
}
