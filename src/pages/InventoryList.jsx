import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductModal from '../components/ProductModal';  // Adjust path if needed
import './styles/InventoryList.css';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('/api/v1/inventory')
      .then(res => setItems(res.data.data.items || []))
      .catch(console.error);
  }, []);

  return (
    <section className="inventory-section">
      <h2 className="inventory-title">Our Plants</h2>
      <div className="inventory-grid">
        {items.map(item => (
          <div
            key={item.id}
            className="inventory-card"
            onClick={() => setSelectedItem(item)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={item.imageUrl || 'https://www.svgrepo.com/show/413694/plant.svg'}
              alt={item.name}
              className="inventory-img"
            />
            <div className="inventory-info">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show ProductModal if an item is selected */}
      {selectedItem && (
        <ProductModal
          product={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}
