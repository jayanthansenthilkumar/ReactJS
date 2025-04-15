import { useState } from 'react';
import { FaBell, FaEnvelope, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();
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
            <FaUser />
          </div>
          <span className="user-name">Admin User</span>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <a href="#">My Profile</a>
              <a href="#">Account Settings</a>
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