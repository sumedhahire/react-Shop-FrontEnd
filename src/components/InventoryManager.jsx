// src/components/admin/InventoryManager.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminInventory.css';

export default function InventoryManager() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    isActive: true,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('access_token');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/v1/inventory/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Assume the API returns { data: [ ... ] }
      const fetched = Array.isArray(res.data.data) ? res.data.data : [];
      setProducts(fetched);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post(
        '/api/v1/inventory/admin',
        {
          ...newProduct,
          price: parseFloat(newProduct.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess('Product added successfully!');
      setNewProduct({ name: '', price: '', description: '', isActive: true });
      fetchProducts();
    } catch (err) {
      console.error('Add product error:', err);
      setError('Failed to add product.');
    }
  };

  const handleUpdate = async (index) => {
    const product = products[index];
    try {
      await axios.put(
        `/api/v1/inventory/admin/${product.id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchProducts();
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update product.');
    }
  };

  const handleEditChange = (index, field, value) => {
    setProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div className="inventory-admin">
      <h2>Manage Inventory</h2>

      <form className="add-row" onSubmit={handleAddSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleAddChange}
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleAddChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleAddChange}
          required
        />
        <label>
          Active{' '}
          <input
            name="isActive"
            type="checkbox"
            checked={newProduct.isActive}
            onChange={handleAddChange}
          />
        </label>
        <button type="submit">Add</button>
      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

     
    </div>
  );
}
