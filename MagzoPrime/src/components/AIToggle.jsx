import React from 'react';
import '../styles/animations.css'; // Make sure this import exists

function AIToggle({ isActive, onClick }) {
  return (
    <button 
      className={`ai-toggle ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {/* Apply the wave-animation class when active */}
      <div className={`icon ${isActive ? 'wave-animation' : ''}`}>
        {/* Your icon content */}
        AI
      </div>
    </button>
  );
}
export default AIToggle;