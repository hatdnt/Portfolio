// src/components/AdminChat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { fetchUsers } from '../api/adminChatApi'; // Import fungsi API
import '../styles/AdminChat.css';

const socket = io('http://localhost:555');

const AdminChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      socket.emit('join', selectedUser);

      socket.on('initialMessages', (initialMessages) => {
        setMessages(initialMessages);
      });

      socket.on('receiveMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('initialMessages');
        socket.off('receiveMessage');
      };
    }
  }, [selectedUser]);

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        userId: selectedUser,
        sender: 'admin',
        content: newMessage,
        timestamp: new Date()
      };
      socket.emit('sendAdminMessage', message);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default action (form submission)
      handleSendMessage();
    }
  };

  return (
    <div className="admin-chat-container">
      <div className="user-list">
        <h3>Users</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index} onClick={() => handleUserSelect(user)}>
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))}
        </div>
        {selectedUser && (
          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;