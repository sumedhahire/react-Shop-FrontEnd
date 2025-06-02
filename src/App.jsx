import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import InventoryList from './pages/InventoryList';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './pages/CartPage';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFoundPage from './pages/NotFound';
import UserPages from './pages/UserPages';

function App() {
 
  const token = localStorage.getItem('access_token');
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const userRole = user?.role;


  return (
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/inventory" element={<InventoryList />} />
      {/* <Route path="/inventory" element={
        <ProtectedRoute token={token}>
          <InventoryPage />
        </ProtectedRoute>
      } /> */}
      
      {token && (
        <Route path="/cart" element={
          <ProtectedRoute token={token}>
            <CartPage />
          </ProtectedRoute>
        } />
      )}

      {token && userRole === 'admin' && (
        <Route path="/admin" element={
          <ProtectedRoute token={token} allowedRoles={['admin']}>
            <Admin />
          </ProtectedRoute>
        } />
        
      )}

      {token && userRole === 'admin' && (
        <Route path="/users" element={
          <ProtectedRoute token={token} allowedRoles={['admin']}>
            <UserPages />
          </ProtectedRoute>
        } />
        )}

      <Route path="*" element={<NotFoundPage />} />

    </Routes>

  );
}

export default App;
