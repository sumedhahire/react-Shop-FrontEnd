import React, { useState } from 'react';
import axios from 'axios';
import EditModal from './EditModal';
import './styles/InventoryTable.css';

export default function InventoryTable({ items, token, refreshItems, loading }) {
  const [editingItem, setEditingItem] = useState(null);

  const handleSave = async updatedData => {
    try {
      await axios.put(
        `/api/v1/inventory/admin/${editingItem.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setEditingItem(null);
      refreshItems();
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update item.');
    }
  };

  // Render skeleton rows during loading
  const renderSkeletonRows = () => {
    // e.g. 5 rows of skeleton
    const skeletonRows = [];
    for (let i = 0; i < 5; i++) {
      skeletonRows.push(
        <tr key={`skeleton-${i}`} className="skeleton-row">
          <td><div className="skeleton-box" /></td>
          <td><div className="skeleton-box" /></td>
          <td><div className="skeleton-box" /></td>
          <td><div className="skeleton-box" /></td>
          <td><div className="skeleton-box btn-skeleton" /></td>
        </tr>
      );
    }
    return skeletonRows;
  };

  return (
    <>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Tags</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? renderSkeletonRows()
            : items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>₹{item.price}</td>
                <td>{Array.isArray(item.tags) && item.tags.length ? item.tags.join(', ') : '-'}</td>
                <td>
                  <button onClick={() => setEditingItem(item)}>Edit</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
