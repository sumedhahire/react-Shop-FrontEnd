import React, { useState } from 'react';
import './styles/EditModal.css';

export default function EditModal({ item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: item.name || '',
    description: item.description || '',
    price: item.price || 0,
    isActive: item.isActive ?? true,
    tags: item.tags || [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'tags') {
      setFormData(prev => ({
        ...prev,
        tags: value
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]:
          type === 'checkbox'
            ? checked
            : name === 'price'
              ? parseFloat(value) || 0
              : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Now price is definitely a Number
    onSave(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Edit Item</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="Price"
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />

          <label>
            Active
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </label>

          <input
            type="text"
            name="tags"
            value={formData.tags.join(', ')}
            placeholder="Tags (comma separated)"
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
