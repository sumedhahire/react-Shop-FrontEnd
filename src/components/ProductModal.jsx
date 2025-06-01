// File: components/ProductModal.js

import React, { useState } from 'react';
import axios from 'axios';
import './styles/ProductModal.css';

export default function ProductModal({ product, onClose }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const authAxios = axios.create();
  authAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const handleBuy = async () => {
    setLoading(true);
    setMessage('');

    try {
      // 1. Create cart + Razorpay order
      const res = await authAxios.post('/api/v1/cart/buy', {
        productId: product.id,
      });

      const order = res.data.data;
      const razorpayKey = process.env.REACT_APP_RAZOR_KEY; // Replace with env var in prod

      // 2. Open Razorpay
      const rzp = new window.Razorpay({
        key: razorpayKey,
        amount: order.amount, // amount in paise
        currency: 'INR',
        name: 'Mitthi & More',
        description: 'Purchase from Mitthi & More store',
        order_id: order.razorPayOrderId,
        handler: async function (response) {
          try {
            // 3. Verify payment
            const verifyRes = await authAxios.post('/api/v1/cart/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartId: order.id,
            });

            setMessage('✅ Payment successful!');
          } catch (err) {
            setMessage('❌ Payment verification failed');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#2e7d32',
        },
      });

      rzp.open();
    } catch (err) {
      setMessage('❌ Failed to start payment');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await authAxios.post('/api/v1/cart', {
        productId: product.id,
        status: 'cart',
      });

      setMessage('🛒 Added to cart!');
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage('⚠️ Please login to add to cart.');
      } else {
        setMessage('❌ Failed to add to cart.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="modal-body">
          <img
            src={product.imageUrl || 'https://www.svgrepo.com/show/413694/plant.svg'}
            alt={product.name}
            className="modal-image"
          />

          <div className="modal-info">
            <h2>{product.name}</h2>
            <p className="modal-price">₹{product.price}</p>
            <p className="modal-description">{product.description}</p>

            <div className="modal-actions">
              <button
                className="buy-button"
                onClick={handleBuy}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Buy with Razorpay'}
              </button>

              <button
                className="cart-button"
                onClick={handleAddToCart}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>

            {message && <p className="modal-message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
