import React from 'react';

interface PlaceholderProps {
  title: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <div style={{ padding: '30px' }}>
      <h1>{title}</h1>
      <p style={{ marginTop: '20px', color: '#545f7d' }}> This page is currently under development.</p>
    </div>
  );
};

export default Placeholder;
