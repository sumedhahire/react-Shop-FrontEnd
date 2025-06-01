import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './styles/Inventory.css';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  useEffect(() => {
    axios.get('/api/v1/inventory')
      .then(res => setItems(res.data.data.items || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * 2,
        behavior: 'smooth',
      });
    };

    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        el.scrollBy({ left: 100, behavior: 'smooth' });
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        el.scrollBy({ left: -100, behavior: 'smooth' });
      }
    };

    el.addEventListener('wheel', onWheel);
    el.addEventListener('keydown', onKeyDown);
    el.tabIndex = 0;

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <section className="inventory-section">
      <div className="inventory-background">
        <h2 className="inventory-title">Our Plants</h2>
        <div className="inventory-scroll" ref={scrollRef}>
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="inventory-card">
                <div className="skeleton-img shimmer"></div>
                <div className="skeleton-text shimmer"></div>
                <div className="skeleton-text shimmer" style={{ width: '50%' }}></div>
              </div>
            ))
          ) : items.length === 0 ? (
            <p>No plants found.</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="inventory-card">
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}
