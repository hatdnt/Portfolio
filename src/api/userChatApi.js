// src/api/userChatApi.js
import io from 'socket.io-client';

const socket = io('http://localhost:555');

export const joinChat = (userName) => {
  socket.emit('join', userName);
};

export const sendMessage = (message) => {
  socket.emit('sendMessage', message);
};

export const onInitialMessages = (callback) => {
  socket.on('initialMessages', callback);
};

export const onReceiveMessage = (callback) => {
  socket.on('receiveMessage', callback);
};

export const offInitialMessages = () => {
  socket.off('initialMessages');
};

export const offReceiveMessage = () => {
  socket.off('receiveMessage');
};