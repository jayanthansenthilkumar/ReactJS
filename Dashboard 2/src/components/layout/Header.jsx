import { useState } from 'react';
import { FaBell, FaEnvelope, FaSearch, FaSignOutAlt, FaCog, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder="Search..." />
      </div>
      
      <div className="header-right">
        <button 
          className="theme-toggle" 
          onClick={toggleDarkMode} 
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            color: darkMode ? 'var(--light-color)' : 'var(--gray-color)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginRight: '1rem'
          }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        
        <div className="notification-icon">
          <FaBell />
          <span className="badge">3</span>
        </div>
        
        <div className="message-icon">
          <FaEnvelope />
          <span className="badge">5</span>
        </div>
        
        <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="avatar">
            <FaUserCircle size={24} />
          </div>
          <span className="user-name">Admin User</span>
          
          {showDropdown && (
            <div className="dropdown-menu fade-in">
              <a href="#"><FaUserCircle /> My Profile</a>
              <a href="#"><FaCog /> Account Settings</a>
              <button className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;