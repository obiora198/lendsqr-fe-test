import React from 'react';
import Card from '../components/common/Card';
import usersIcon from '../assets/users1.png';
import activeUsersIcon from '../assets/active-users.png';
import usersWithLoanIcon from '../assets/users with loan.png';
import usersWithSavingsIcon from '../assets/users with savings.png';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Users', value: '2,453', icon: usersIcon, bg: 'rgba(223, 24, 255, 0.1)' },
    { label: 'Active Users', value: '2,453', icon: activeUsersIcon, bg: 'rgba(87, 24, 255, 0.1)' },
    { label: 'Users with Loans', value: '12,453', icon: usersWithLoanIcon, bg: 'rgba(245, 95, 68, 0.1)' },
    { label: 'Users with Savings', value: '102,453', icon: usersWithSavingsIcon, bg: 'rgba(255, 51, 102, 0.1)' },
  ];

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <Card 
            key={index}
            label={stat.label}
            value={stat.value}
            icon={<img src={stat.icon} alt={stat.label} style={{ backgroundColor: stat.bg, padding: '8px', borderRadius: '50%' }} />}
          />
        ))}
      </div>

      <div className="dashboard-placeholder">
        <p>Dashboard charts and more details will go here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
