// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ token, allowedRoles = [], children }) {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const userRole = user?.role;

  // If no token or user not allowed
  if (!token || (allowedRoles.length && !allowedRoles.includes(userRole))) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
