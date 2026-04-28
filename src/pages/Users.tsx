import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Eye, UserX, UserCheck, Filter } from 'lucide-react';
import { userService } from '../services/api';
import { User } from '../types/user';
import Card from '../components/common/Card';
import usersIcon from '../assets/users1.png';
import activeUsersIcon from '../assets/active-users.png';
import usersWithLoanIcon from '../assets/users with loan.png';
import usersWithSavingsIcon from '../assets/users with savings.png';
import './Users.scss';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getUsers();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const stats = [
    { label: 'Users', value: '2,453', icon: usersIcon, bg: 'rgba(223, 24, 255, 0.1)' },
    { label: 'Active Users', value: '2,453', icon: activeUsersIcon, bg: 'rgba(87, 24, 255, 0.1)' },
    { label: 'Users with Loans', value: '12,453', icon: usersWithLoanIcon, bg: 'rgba(245, 95, 68, 0.1)' },
    { label: 'Users with Savings', value: '102,453', icon: usersWithSavingsIcon, bg: 'rgba(255, 51, 102, 0.1)' },
  ];

  const handleUserClick = (id: string) => {
    navigate(`/users/${id}`);
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="users-page">
      <h1>Users</h1>

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

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ORGANIZATION <Filter size={14} /></th>
              <th>USERNAME <Filter size={14} /></th>
              <th>EMAIL <Filter size={14} /></th>
              <th>PHONE NUMBER <Filter size={14} /></th>
              <th>DATE JOINED <Filter size={14} /></th>
              <th>STATUS <Filter size={14} /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id}>
                <td>{user.orgName}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge status-${user.status}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="actions-cell">
                  <button onClick={() => handleUserClick(user.id)}>
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination-info">
            Showing 
            <select value={itemsPerPage} readOnly>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            out of {users.length}
          </div>
          <div className="pagination-controls">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)}
              className="prev-btn"
            >
              &lt;
            </button>
            {/* Simple pagination numbers for now */}
            <span className="page-num active">{currentPage}</span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => p + 1)}
              className="next-btn"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
