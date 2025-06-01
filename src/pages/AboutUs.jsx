import React from "react";
import './styles/AboutPage.css'; // I'll provide CSS below
import Header from '../components/Header';


const AboutPage = () => {
  return (
    <div>
     <Header />
    <div className="about-page">
      <h1 className="about-title">About Mittī & More</h1>

      <section className="about-section">
        <p>
          <strong>Mittī & More</strong> is a gardening support brand based in India. We help people care for their plants with love and confidence.
          Our mission is to make plant care simple, joyful, and accessible to everyone.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Provide</h2>
        <ul>
          <li>Indoor plants like Snake Plant, ZZ Plant, Peace Lily, Money Plant.</li>
          <li>Gardening tools such as pruners, watering cans, and soil scoops.</li>
          <li>Organic potting mix and compost made for Indian climates.</li>
          <li>Personalized advice for plant selection and care.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Care Tips</h2>
        <ul>
          <li>Succulents need bright light and minimal watering. Overwatering can harm them.</li>
          <li>Snake plants thrive in low light and need watering only once every 10–14 days.</li>
          <li>Peace lilies prefer indirect light and should be watered when the top inch of soil is dry.</li>
          <li>Fertilize once a month during growing season for healthy growth.</li>
          <li>Use neem oil spray for pest control naturally.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Services</h2>
        <p>
          We offer plant selection guidance for homes, offices, and gifts, workshops and tips on indoor gardening,
          and support in both Hindi and English.
        </p>
      </section>

      <section className="about-section">
        <h2>Fun Fact</h2>
        <p>Talking to plants helps them grow better. Be kind to your green friends!</p>
      </section>

      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          Reach out through WhatsApp, Instagram, or visit our website to get started with your plant journey.
        </p>
      </section>
    </div>
    </div>
  );
};

export default AboutPage;
