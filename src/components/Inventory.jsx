import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './styles/Inventory.css';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    axios.get('/api/v1/inventory')
      .then(res => setItems(res.data.data.items || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY,
        behavior: 'smooth',
      });
    };

    el.addEventListener('wheel', onWheel);
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section className="inventory-section">
      <div className="inventory-background">
        <h2 className="inventory-title">Our Plants</h2>
        <div className="inventory-scroll" ref={scrollRef}>
          {items.map(item => (
            <div key={item.id} className="inventory-card">
              <img
                src={item.imageUrl ||  'https://www.svgrepo.com/show/413694/plant.svg'}
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
      </div>
    </section>
  );
}
