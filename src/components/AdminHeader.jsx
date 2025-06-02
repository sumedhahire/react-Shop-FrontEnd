import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/AdminHeader.css';

const AdminHeader = () => {
  return (
    <nav className="secondary-nav">
      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive ? 'nav-tab active' : 'nav-tab'
        }
      >
        Users
      </NavLink>
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive ? 'nav-tab active' : 'nav-tab'
        }
      >
        Products
      </NavLink>
    </nav>
  );
};

export default AdminHeader;
