// File: pages/CartPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/CartPage.css';
import Header from '../components/Header';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const authAxios = axios.create();
  authAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const [cartRes, boughtRes] = await Promise.all([
          authAxios.get('/api/v1/cart?status=cart'),
          authAxios.get('/api/v1/cart?status=brought'),
        ]);

        setCartItems(cartRes.data?.data?.items || []);
        setBoughtItems(boughtRes.data?.data?.items || []);
        setError('');
      } catch (err) {
        console.error(err);
        setError('❌ Failed to load cart data.');
      } finally {
        setLoading(false);
      }
    };

    loadCartData();
  }, []);

  const getTotal = (items) =>
    items.reduce((sum, item) => sum + (item.productId?.price || 0), 0);

  const renderItemBlock = (items, title, emptyMsg) => (
    <section className="cart-section">
      <h2>{title}</h2>
      {items.length === 0 ? (
        <p className="empty-cart">{emptyMsg}</p>
      ) : (
        <>
          <div className="cart-grid">
            {items.map((item) => {
              const product = item.productId || {};
              return (
                <div className="cart-card" key={item.id}>
                  <img
                    src={product.imageUrl || 'https://www.svgrepo.com/show/413694/plant.svg'}
                    alt={product.name || 'Product'}
                    className="cart-img"
                  />
                  <div className="cart-info">
                    <h3>{product.name}</h3>
                    <p className="cart-price">₹{product.price?.toFixed(2)}</p>
                    <p className="cart-status">Status: {item.status}</p>
                    <p className="cart-description">{product.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-total">
            <strong>Total:</strong> ₹{getTotal(items).toFixed(2)}
          </div>
        </>
      )}
    </section>
  );

  return (
    <div className="cart-page-wrapper">
      <Header />
      <main className="cart-page">
        <h1>Your Cart</h1>
        <p className="cart-intro">
          Review your selected plants below. Ready to grow a greener home?
        </p>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : error ? (
          <p className="cart-error">{error}</p>
        ) : (
          <>
            {renderItemBlock(cartItems, '🛒 Items in Cart', 'Your cart is empty.')}
            {renderItemBlock(boughtItems, '✅ Purchased Items', 'No items purchased yet.')}
            <p className="cart-footer">
              Need help? Contact our support at{' '}
              <a href="mailto:support@plantshop.com">support@plantshop.com</a> or call 1-800-PLANTS
            </p>
          </>
        )}
      </main>
    </div>
  );
}
