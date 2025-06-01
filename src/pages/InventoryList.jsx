import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductModal from '../components/ProductModal';
import Header from '../components/Header';
import './styles/InventoryList.css';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchItems = (name = '') => {
    const filter = name
      ? `?filter=${encodeURIComponent(JSON.stringify({ name }))}`
      : '';
    setLoading(true);
    axios
      .get(`/api/v1/inventory${filter}`)
      .then(res => {
        setItems(res.data.data.items || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems(); // fetch all on load
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchItems(searchTerm.trim());
  };

  return (
    <div>
      <Header />
      <section className="inventory-section">
        <h2 className="inventory-title">Our Plants</h2>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button
            type="submit"
            className="search-button"
            disabled={searchTerm.trim() === ''}
          >
            Search
          </button>
        </form>
        {loading ? (
                <div className="inventory-grid">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="inventory-card">
                      <div className="skeleton" style={{ height: '200px' }}></div>
                      <div className="skeleton-text"></div>
                      <div className="skeleton-text" style={{ width: '40%' }}></div>
                    </div>
                  ))}
                </div>
              ) : items.length === 0 ? (
                <p>No plants found.</p>
              ) : (
                <div className="inventory-grid">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="inventory-card"
                      onClick={() => setSelectedItem(item)}
                    >
                      <img
                        src={item.imageUrl || 'https://www.svgrepo.com/show/413694/plant.svg'}
                        alt={item.name || 'Plant'}
                        className="inventory-img"
                        style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                      />
                      <div className="inventory-info">
                        <h3>{item.name}</h3>
                        <p>₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

        {selectedItem && (
          <ProductModal
            product={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </section>
    </div>
  );
}
