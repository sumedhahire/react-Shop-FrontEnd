// src/components/Logo.jsx
import React from 'react';

export default function Logo() {
  return (
    <div style={{ width: 40, height: 40, backgroundColor: 'white', borderRadius: '50%' }}>
      {/* You can replace this with an <img src="logo.png" /> */}
      <span style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 24, display: 'block', textAlign: 'center', lineHeight: '40px' }}>L</span>
    </div>
  );
}
