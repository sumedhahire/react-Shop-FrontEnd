// AdminAddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './styles/Admin.css';

export default function AdminAddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    isActive: true,
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const token = localStorage.getItem('access_token');

      const res = await axios.post(
        '/api/v1/inventory/admin',
        {
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
          isActive: formData.isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess('Product added successfully!');
      setFormData({ name: '', price: '', description: '', isActive: true });
    } catch (err) {
      setError('Failed to add product. Please check inputs or token.');
    }
  };

  return (
    <div className="admin-add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Price:
          <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>

        <label className="checkbox">
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
          Active
        </label>

        <button type="submit">Add Product</button>
      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
