import React, { useState } from "react";
import { ChatBotProvider } from "react-chatbotify";
import ChatWindow from "./ChatWindow";

const ChatBotWidget = () => {
  const [visible, setVisible] = useState(false);

  return (
    <ChatBotProvider
      config={{
        botName: "HelperBot",
        initialMessages: [
          { type: "text", content: "Hello! How can I help you?" },
        ],
      }}
    >
      <button
        onClick={() => setVisible((v) => !v)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#4F46E5",
          color: "white",
          fontSize: 28,
          cursor: "pointer",
          zIndex: 10000,
        }}
        aria-label="Toggle chat"
      >
        💬
      </button>

      {visible && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          <ChatWindow />
        </div>
      )}
    </ChatBotProvider>
  );
};

export default ChatBotWidget;
