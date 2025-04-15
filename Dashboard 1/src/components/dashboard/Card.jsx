import React from 'react';

const Card = ({ children, title, className = '' }) => {
  return (
    <div className={`dashboard-card ${className}`}>
      {title && <div className="card-title">{title}</div>}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;