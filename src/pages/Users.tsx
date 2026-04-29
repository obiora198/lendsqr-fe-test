import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MoreVertical, ListFilter, Eye, UserX, UserCheck } from 'lucide-react';
import { userService } from '../services/api';
import type { User } from '../types/user';
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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeActions, setActiveActions] = useState<string | null>(null);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const globalSearch = searchParams.get('search') || '';

  // Filter states
  const [filterValues, setFilterValues] = useState({
    orgName: '',
    userName: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({ ...filterValues });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getUsers();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.filter-icon') && !(e.target as HTMLElement).closest('.filter-popover')) {
        setActiveFilter(null);
      }
      if (!(e.target as HTMLElement).closest('.actions-btn') && !(e.target as HTMLElement).closest('.actions-popover')) {
        setActiveActions(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate statistics from mock data
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const usersWithLoans = users.filter(u => parseFloat(u.education.loanRepayment) > 0).length;
    const usersWithSavings = users.filter(u => parseFloat(u.accountBalance) > 20000).length;

    return [
      { label: 'Users', value: totalUsers.toLocaleString(), icon: usersIcon, bg: 'rgba(223, 24, 255, 0.1)' },
      { label: 'Active Users', value: activeUsers.toLocaleString(), icon: activeUsersIcon, bg: 'rgba(87, 24, 255, 0.1)' },
      { label: 'Users with Loans', value: usersWithLoans.toLocaleString(), icon: usersWithLoanIcon, bg: 'rgba(245, 95, 68, 0.1)' },
      { label: 'Users with Savings', value: usersWithSavings.toLocaleString(), icon: usersWithSavingsIcon, bg: 'rgba(255, 51, 102, 0.1)' },
    ];
  }, [users]);

  // Filtering logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesGlobalSearch = !globalSearch || 
        user.userName.toLowerCase().includes(globalSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(globalSearch.toLowerCase()) ||
        user.phoneNumber.includes(globalSearch) ||
        user.orgName.toLowerCase().includes(globalSearch.toLowerCase());

      const matchesFilters = (
        (!appliedFilters.orgName || user.orgName.toLowerCase().includes(appliedFilters.orgName.toLowerCase())) &&
        (!appliedFilters.userName || user.userName.toLowerCase().includes(appliedFilters.userName.toLowerCase())) &&
        (!appliedFilters.email || user.email.toLowerCase().includes(appliedFilters.email.toLowerCase())) &&
        (!appliedFilters.phoneNumber || user.phoneNumber.includes(appliedFilters.phoneNumber)) &&
        (!appliedFilters.status || user.status === appliedFilters.status) &&
        (!appliedFilters.date || new Date(user.createdAt).toDateString() === new Date(appliedFilters.date).toDateString())
      );

      return matchesGlobalSearch && matchesFilters;
    });
  }, [users, appliedFilters, globalSearch]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleUserClick = (id: string) => {
    navigate(`/users/${id}`);
  };

  const handleStatusUpdate = async (id: string, status: User['status']) => {
    const updatedUser = await userService.updateUserStatus(id, status);
    if (updatedUser) {
      setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
    }
    setActiveActions(null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterValues(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filterValues });
    setCurrentPage(1);
    setActiveFilter(null);
  };

  const resetFilters = () => {
    const initial = { orgName: '', userName: '', email: '', date: '', phoneNumber: '', status: '' };
    setFilterValues(initial);
    setAppliedFilters(initial);
    setCurrentPage(1);
    setActiveFilter(null);
    if (globalSearch) navigate('/users'); // Clear global search too
  };

  const FilterPopover = ({ className }: { className?: string }) => (
    <div className={`filter-popover ${className || ''}`}>
      <div className="filter-form-group">
        <label>Organization</label>
        <input type="text" name="orgName" value={filterValues.orgName} onChange={handleFilterChange} placeholder="Organization" />
      </div>
      <div className="filter-form-group">
        <label>Username</label>
        <input type="text" name="userName" value={filterValues.userName} onChange={handleFilterChange} placeholder="User" />
      </div>
      <div className="filter-form-group">
        <label>Email</label>
        <input type="text" name="email" value={filterValues.email} onChange={handleFilterChange} placeholder="Email" />
      </div>
      <div className="filter-form-group">
        <label>Date</label>
        <input type="date" name="date" value={filterValues.date} onChange={handleFilterChange} placeholder="Date" />
      </div>
      <div className="filter-form-group">
        <label>Phone Number</label>
        <input type="text" name="phoneNumber" value={filterValues.phoneNumber} onChange={handleFilterChange} placeholder="Phone Number" />
      </div>
      <div className="filter-form-group">
        <label>Status</label>
        <select name="status" value={filterValues.status} onChange={handleFilterChange}>
          <option value="">Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="blacklisted">Blacklisted</option>
        </select>
      </div>
      <div className="filter-actions">
        <button className="reset-btn" onClick={resetFilters}>Reset</button>
        <button className="submit-btn" onClick={applyFilters}>Filter</button>
      </div>
    </div>
  );

  const ActionsPopover = ({ userId, isMobile }: { userId: string, isMobile?: boolean }) => (
    <div className={`actions-popover ${isMobile ? 'mobile-popover' : ''}`}>
      <div className="action-item" onClick={() => handleUserClick(userId)}>
        <Eye size={14} /> View Details
      </div>
      <div className="action-item" onClick={() => handleStatusUpdate(userId, 'blacklisted')}>
        <UserX size={14} /> Blacklist User
      </div>
      <div className="action-item" onClick={() => handleStatusUpdate(userId, 'active')}>
        <UserCheck size={14} /> Activate User
      </div>
    </div>
  );

  const MobileUserCard = ({ user }: { user: User }) => (
    <div className="mobile-user-card">
      <div className="card-header">
        <span className="org">{user.orgName}</span>
        <button 
          className="actions-btn"
          onClick={() => setActiveActions(activeActions === user.id ? null : user.id)}
        >
          <MoreVertical size={18} />
        </button>
        {activeActions === user.id && <ActionsPopover userId={user.id} isMobile />}
      </div>
      <div className="card-body" onClick={() => handleUserClick(user.id)}>
        <div className="info-row">
          <span className="label">Username</span>
          <span className="value">{user.userName}</span>
        </div>
        <div className="info-row">
          <span className="label">Email</span>
          <span className="value">{user.email}</span>
        </div>
        <div className="info-row">
          <span className="label">Phone</span>
          <span className="value">{user.phoneNumber}</span>
        </div>
        <div className="info-row">
          <span className="label">Status</span>
          <span className={`status-badge status-${user.status}`}>
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );

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
            icon={
              <div style={{ backgroundColor: stat.bg, width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                <img src={stat.icon} alt={stat.label} style={{ width: '36px', height: '36px' }} />
              </div>
            }
          />
        ))}
      </div>

      <div className="table-container">
        {globalSearch && (
          <div className="search-status-bar">
            <span>Showing results for: <strong>{globalSearch}</strong></span>
            <button onClick={() => navigate('/users')}>Clear</button>
          </div>
        )}
        
        {/* Desktop View */}
        <div className="desktop-table-view">
          <table className="users-table">
            <thead>
              <tr>
                {['ORGANIZATION', 'USERNAME', 'EMAIL', 'PHONE NUMBER', 'DATE JOINED', 'STATUS'].map((col, index) => (
                  <th key={col}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {col} 
                      <ListFilter 
                        size={14} 
                        className="filter-icon" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => setActiveFilter(activeFilter === col ? null : col)}
                      />
                    </div>
                    {activeFilter === col && <FilterPopover className={index >= 4 ? 'right-aligned' : ''} />}
                  </th>
                ))}
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
                    <button 
                      className="actions-btn"
                      onClick={() => setActiveActions(activeActions === user.id ? null : user.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeActions === user.id && <ActionsPopover userId={user.id} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="mobile-cards-view">
          <div className="mobile-filter-bar">
            <button onClick={() => setActiveFilter(activeFilter === 'Mobile' ? null : 'Mobile')}>
              <ListFilter size={16} /> Filter Results
            </button>
            {activeFilter === 'Mobile' && <FilterPopover className="mobile-popover" />}
          </div>
          <div className="mobile-cards-list">
            {currentItems.map(user => (
              <MobileUserCard key={user.id} user={user} />
            ))}
          </div>
        </div>

        <div className="pagination">
          <div className="pagination-info">
            Showing
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            out of {filteredUsers.length}
          </div>
          <div className="pagination-controls">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              &lt;
            </button>
            <div className="mobile-page-info">
              Page {currentPage} of {totalPages}
            </div>
            <div className="desktop-page-info">
              <span className="page-num active">{currentPage}</span>
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
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
