import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import logo from '../../assets/logo.png';
import avatar from '../../assets/d76431ad31054d654669dbf388b2a9ec503f6495.png'; // Using one of the avatar images
import './Navbar.scss';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <img src={logo} alt="Lendsqr Logo" className="logo" />
      </div>

      <div className="navbar-search">
        <div className="search-input">
          <input type="text" placeholder="Search for anything" />
          <button className="search-btn">
            <Search size={14} color="white" />
          </button>
        </div>
      </div>

      <div className="navbar-actions">
        <a href="#" className="docs-link">Docs</a>
        <button className="notification-btn">
          <Bell size={20} />
        </button>
        <div className="user-profile">
          <img src={avatar} alt="Adedeji" className="avatar" />
          <span className="username">Adedeji</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
