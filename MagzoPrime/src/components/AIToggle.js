import React, { useState } from 'react';
import '../styles/animations.css';

const AIToggle = ({ isActive, toggleAI }) => {
  return (
    <button 
      className={`ai-toggle ${isActive ? 'ai-toggle-active' : ''}`}
      onClick={toggleAI}
    >
      <div className={`ai-icon ${isActive ? 'wave-animation' : ''}`}>
        {/* Add your AI icon or content here */}
      </div>
      {/* Add any additional content or labels here */}
    </button>
  );
};
export default AIToggle;