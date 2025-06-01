import React from 'react';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import Inventory from '../components/Inventory'; // or wherever Inventory is
import Vision from '../components/Vision';
import ChatbotWidget from '../components/ChatBotWidget';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Vision />
        <Inventory />
        <AboutUs />
      </main>
       {/* Floating chatbot in bottom-right */}
     <ChatbotWidget/>
    </div>
  );
}
