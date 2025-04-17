import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const StatCard = ({ title, value, icon, color, increase }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}</p>
        {increase && (
          <div className="stat-increase">
            <FaArrowUp size={12} />
            <span>{increase}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;