// src/components/ChatDrawer.js
import React, { useState } from 'react';
import UserChat from './UserChat';
import '../styles/ChatDrawer.css';

const ChatDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="chat-button" onClick={toggleDrawer}>
        Chat
      </button>
      <div className={`chat-drawer ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleDrawer}>X</button>
        <UserChat />
      </div>
    </div>
  );
};

export default ChatDrawer;