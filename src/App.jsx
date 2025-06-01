import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import InventoryPage from './pages/InventoryPage';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './pages/CartPage';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';
import Admin from './pages/InventoryPage';

function App() {
  const token = localStorage.getItem('access_token'); // or your auth logic

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute token={token}>
            <InventoryPage />
          </ProtectedRoute>
        }
      />
       <Route
        path="/cart"
        element={
          <ProtectedRoute token={token}>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute token={token} allowedRoles={['admin']}>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
