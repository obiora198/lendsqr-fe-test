import React from 'react';
import './Card.scss';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
  value?: string | number;
}

const Card: React.FC<CardProps> = ({ children, className = '', icon, label, value }) => {
  if (label || value) {
    return (
      <div className={`card stat-card ${className}`}>
        {icon && <div className="card-icon">{icon}</div>}
        <div className="card-label">{label}</div>
        <div className="card-value">{value}</div>
      </div>
    );
  }

  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export default Card;
