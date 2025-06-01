import React, { useState, useEffect } from 'react';
import Header from '../components/Header';                  // Site‐wide header
import InventoryTable from '../components/InventoryTable';  // Table component
import EditModal from '../components/EditModal';            // Modal for editing/adding
import './styles/InventoryPage.css';

export default function InventoryPage() {
  // Always start items as an empty array
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false); // Track if "Add" mode is open



  
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('/api/v1/inventory', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      const fetched = Array.isArray(json.data?.items) ? json.data.items : [];
      setItems(fetched);
      setFilteredItems(fetched);
    } catch (err) {
      console.error('Failed to fetch items:', err);
      setItems([]);
      setFilteredItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);


  // Filter items any time items / searchTerm / activeTag change
  useEffect(() => {
    if (!Array.isArray(items)) {
      setFilteredItems([]);
      return;
    }
    let result = [...items];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.description?.toLowerCase().includes(lower)
      );
    }
    if (activeTag) {
      result = result.filter(
        (item) => Array.isArray(item.tags) && item.tags.includes(activeTag)
      );
    }
    setFilteredItems(result);
  }, [items, searchTerm, activeTag]);

  // Open modal to edit existing item
  const handleEditClick = (item) => {
    setEditingItem(item);
    setIsAddMode(false);
  };

  // Open modal to add a new item
  const handleAddClick = () => {
    setEditingItem({
      id: null,
      name: '',
      description: '',
      price: 0,
      isActive: true,
      tags: [],
    });
    setIsAddMode(true);
  };

  // Close modal (for both edit and add)
  const handleCloseModal = () => {
    setEditingItem(null);
    setIsAddMode(false);
  };

  // Save handler (both add and update)
  const handleSave = async (data) => {
    try {
      const token = localStorage.getItem('access_token');
      let response;

      if (isAddMode) {
        // Create new item
        response = await fetch('/api/v1/inventory/admin', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Create failed: ${response.status}`);
        const created = await response.json();
        // Assuming created data is in created.data (adjust if needed)
        setItems((prev) => [...prev, created.data]);
      } else {
        // Update existing item
        response = await fetch(`/api/v1/inventory/admin/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          if (response.status === 302) {
            alert('Session expired or unauthorized. Please log in again.');
          } else {
            console.log('Token:', token);

            alert(`Update failed with status ${response.status}`);
          }
          return;
        }
        // Update local list without refetching everything
        setItems((prev) =>
          prev.map((item) =>
            item.id === editingItem.id ? { ...item, ...data } : item
          )
        );
      }

      handleCloseModal();
    } catch (err) {
      console.error('Save failed:', err);
      alert('Save failed, check console for details.');
    }
  };

  return (
    <>
      {/* Site‐wide header */}
      <Header />

      <div className="inventory-page">
        <div className="inventory-top-bar">
          <h1 className="inventory-title">Browse Our Plants</h1>
          <button className="add-button" onClick={handleAddClick}>
            + Add Inventory
          </button>
        </div>

        <div className="inventory-controls">
          <input
            type="text"
            className="inventory-search"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="inventory-tags">
            <button
              className={!activeTag ? 'active' : ''}
              onClick={() => setActiveTag('')}
            >
              All
            </button>
            {/* Example tags; replace or generate dynamically if needed */}
            <button
              className={activeTag === 'indoor' ? 'active' : ''}
              onClick={() => setActiveTag('indoor')}
            >
              Indoor
            </button>
            <button
              className={activeTag === 'outdoor' ? 'active' : ''}
              onClick={() => setActiveTag('outdoor')}
            >
              Outdoor
            </button>
          </div>
        </div>

      <InventoryTable
  items={filteredItems}
  token={localStorage.getItem('access_token')}
  refreshItems={fetchItems}
/>

       
      </div>
    </>
  );
}
