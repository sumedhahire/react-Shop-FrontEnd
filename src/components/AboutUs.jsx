import React from 'react';
import './styles/AboutUs.css';

export default function AboutUs() {
  return (
    <section className="aboutus-section">
      <div className="aboutus-card">
        <div className="aboutus-icon">🌿</div>
        <div className="aboutus-content">
          <h2 className="aboutus-title">About Us</h2>
          <p className="aboutus-text">
            We’re passionate plant lovers on a mission to bring life and color to your
            home and office. From easy‐care succulents to lush tropicals, every plant in
            our collection is hand‐selected for health, beauty, and ease of care.
          </p>
        </div>
      </div>
    </section>
  );
}
