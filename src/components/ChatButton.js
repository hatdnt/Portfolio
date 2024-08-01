import React, { useState } from 'react';
import Modal from 'react-modal';
import UserChat from './UserChat';
import { logEvent } from '../api/googleAnalytics';
import '../styles/ChatButton.css';

Modal.setAppElement('#root');

const ChatButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    logEvent('User', 'Click', 'Chat Modal Opened');
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button className="chat-button" onClick={openModal}>
        Chat
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Chat Modal"
        className="chat-modal"
        overlayClassName="chat-overlay"
      >
        <button className="close-button" onClick={closeModal}>X</button>
        <UserChat />
      </Modal>
    </div>
  );
};

export default ChatButton;