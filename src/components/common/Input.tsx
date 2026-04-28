import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label>{label}</label>}
      <input className={error ? 'error' : ''} {...props} />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
