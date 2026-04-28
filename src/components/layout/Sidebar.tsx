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
  ChevronDown
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
        <NavLink to="/guarantors" className="sidebar-link">
          <Users size={16} />
          <span>Guarantors</span>
        </NavLink>
        <NavLink to="/loans" className="sidebar-link">
          <HandCoins size={16} />
          <span>Loans</span>
        </NavLink>
        <NavLink to="/decision-models" className="sidebar-link">
          <UserCheck size={16} />
          <span>Decision Models</span>
        </NavLink>
        <NavLink to="/savings" className="sidebar-link">
          <PiggyBank size={16} />
          <span>Savings</span>
        </NavLink>
        <NavLink to="/loan-requests" className="sidebar-link">
          <UserPlus size={16} />
          <span>Loan Requests</span>
        </NavLink>
        <NavLink to="/whitelist" className="sidebar-link">
          <UserCheck size={16} />
          <span>Whitelist</span>
        </NavLink>
        <NavLink to="/karma" className="sidebar-link">
          <UserMinus size={16} />
          <span>Karma</span>
        </NavLink>
      </div>

      <div className="sidebar-group">
        <h3>BUSINESSES</h3>
        <NavLink to="/organization" className="sidebar-link">
          <Briefcase size={16} />
          <span>Organization</span>
        </NavLink>
        <NavLink to="/loan-products" className="sidebar-link">
          <HandCoins size={16} />
          <span>Loan Products</span>
        </NavLink>
        <NavLink to="/savings-products" className="sidebar-link">
          <PiggyBank size={16} />
          <span>Savings Products</span>
        </NavLink>
        <NavLink to="/fees" className="sidebar-link">
          <Settings size={16} />
          <span>Fees and Charges</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
