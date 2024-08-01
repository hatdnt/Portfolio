// src/components/UserChat.js
import React, { useState, useEffect } from 'react';
import {
  joinChat,
  sendMessage as sendChatMessage,
  onInitialMessages,
  onReceiveMessage,
  offInitialMessages,
  offReceiveMessage,
} from '../api/userChatApi';
import '../styles/UserChat.css';

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isUserNameSet, setIsUserNameSet] = useState(false);

  useEffect(() => {
    let storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
      setIsUserNameSet(true);
      joinChat(storedUserName);
    }

    onInitialMessages((initialMessages) => {
      setMessages(initialMessages);
    });

    onReceiveMessage((newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      offInitialMessages();
      offReceiveMessage();
    };
  }, []);

  const handleUserNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem('userName', userName);
      setIsUserNameSet(true);
      joinChat(userName);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { userId: userName, sender: userName, content: message };
      sendChatMessage(newMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default action (form submission)
      sendMessage();
    }
  };

  if (!isUserNameSet) {
    return (
      <div className="username-container">
        <form onSubmit={handleUserNameSubmit}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name..."
            required
          />
          <button type="submit">Join Chat</button>
        </form>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default UserChat;