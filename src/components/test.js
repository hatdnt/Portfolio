// src/components/SomeComponent.js
import React from 'react';
import { logEvent } from '../api/googleAnalytics';

const SomeComponent = () => {
  const handleClick = () => {
    logEvent('User', 'Click', 'Some Button');
  };

  return (
    <button onClick={handleClick}>Click Me</button>
  );
};

export default SomeComponent;