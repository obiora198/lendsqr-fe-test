import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  Briefcase, 
  Home, 
  HandCoins, 
  PiggyBank, 
  UserPlus,
  Settings,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import './Sidebar.scss';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-section">
        <div className="sidebar-link switch-org">
          <Briefcase size={16} />
          <span>Switch Organization</span>
          <ChevronDown size={14} />
        </div>
        <NavLink to="/dashboard" className="sidebar-link">
          <Home size={16} />
          <span>Dashboard</span>
        </NavLink>
      </div>

      <div className="sidebar-group">
        <h3>CUSTOMERS</h3>
        <NavLink to="/users" className="sidebar-link">
          <Users size={16} />
          <span>Users</span>
        </NavLink>
        <div className="sidebar-link">
          <Users size={16} />
          <span>Guarantors</span>
        </div>
        <div className="sidebar-link">
          <HandCoins size={16} />
          <span>Loans</span>
        </div>
        <div className="sidebar-link">
          <UserCheck size={16} />
          <span>Decision Models</span>
        </div>
        <div className="sidebar-link">
          <PiggyBank size={16} />
          <span>Savings</span>
        </div>
        <div className="sidebar-link">
          <UserPlus size={16} />
          <span>Loan Requests</span>
        </div>
        <div className="sidebar-link">
          <UserCheck size={16} />
          <span>Whitelist</span>
        </div>
        <div className="sidebar-link">
          <UserMinus size={16} />
          <span>Karma</span>
        </div>
      </div>

      <div className="sidebar-group">
        <h3>BUSINESSES</h3>
        <div className="sidebar-link">
          <Briefcase size={16} />
          <span>Organization</span>
        </div>
        <div className="sidebar-link">
          <HandCoins size={16} />
          <span>Loan Products</span>
        </div>
        <div className="sidebar-link">
          <PiggyBank size={16} />
          <span>Savings Products</span>
        </div>
        <div className="sidebar-link">
          <Settings size={16} />
          <span>Fees and Charges</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
