import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Menu, LogOut, X } from 'lucide-react';
import { userService } from '../../services/api';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import './Navbar.scss';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    userService.logout();
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/users?search=${encodeURIComponent(searchQuery)}`);
      setShowMobileSearch(false);
    }
  };

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.user-profile')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <img src={logo} alt="Lendsqr Logo" className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }} />
      </div>

      {/* Desktop Search */}
      <div className="navbar-search">
        <form onSubmit={handleSearch} className="search-input">
          <input 
            type="text" 
            placeholder="Search for anything" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <Search size={14} color="white" />
          </button>
        </form>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="mobile-search-overlay">
          <form onSubmit={handleSearch} className="mobile-search-form">
            <input 
              type="text" 
              placeholder="Search for anything" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="mobile-search-btn">
              <Search size={18} />
            </button>
            <button type="button" className="mobile-search-close" onClick={() => setShowMobileSearch(false)}>
              <X size={18} />
            </button>
          </form>
        </div>
      )}

      <div className="navbar-actions">
        <button className="mobile-search-toggle" onClick={() => setShowMobileSearch(true)}>
          <Search size={20} />
        </button>
        <a href="#" className="docs-link">
          Docs
        </a>
        <button className="notification-btn">
          <Bell size={20} />
        </button>
        <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
          <img src={avatar} alt="Adedeji" className="avatar" />
          <span className="username">Adedeji</span>
          <ChevronDown size={16} className={showDropdown ? 'rotate' : ''} />
          
          {showDropdown && (
            <div className="logout-dropdown">
              <button onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
