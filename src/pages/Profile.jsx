import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Profile.css';
import Header from '../components/Header';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserAndOrders = async () => {
      try {
        const [userRes, orderRes] = await Promise.all([
          fetch('/api/v1/user', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('/api/v1/cart/count', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!userRes.ok || !orderRes.ok) throw new Error('Failed to fetch data');

        const userData = await userRes.json();
        const orderData = await orderRes.json();

        setUser(userData.data);
        setOrderCount(orderData.data); // this is a number like 1, 5, etc.
      } catch (err) {
        console.error('Error fetching profile or orders:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndOrders();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');
    try {
      if (token) {
        await fetch('/api/v1/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.warn('Logout failed:', err);
    }

    localStorage.clear();
    navigate('/login');
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (!user) return <div className="profile-error">User not found.</div>;

  return (
    <div>
      <Header></Header>
    <div className="profile-container">
      <h2>Your Profile</h2>

      <div className="profile-details">
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address || 'No address provided'}</p>
      </div>

      <div className="profile-static">
        <h3>Account Info</h3>
        <p><strong>User Since:</strong> January 2024</p>
        <p><strong>Role:</strong> Customer</p>
        <p><strong>Total Orders:</strong> {orderCount !== null ? orderCount : 'Loading...'}</p>
      </div>

      <div className="profile-tip">
        <h4>Tip:</h4>
        <p>Keep your address updated for smooth deliveries!</p>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
    </div>
  );
}
