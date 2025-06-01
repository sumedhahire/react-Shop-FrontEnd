import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';  // <-- import icon
import './styles/Header.css';
import logo from '../assets/logo.png';

export default function Header() {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-section">
          <img src={logo} alt="Logo" className="site-logo" />
          <span className="site-name">Mitti & More</span>
        </div>
        <nav className="site-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about-us" className="nav-link">About</Link>
          <Link to="/inventory" className="nav-link">Inventory</Link>

          {(isUser || isAdmin) && <Link to="/cart" className="nav-link">Cart</Link>}
          {isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}

          <Link to="/profile" className="nav-link profile-icon" title="Profile">
            <FaUserCircle size={24} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
