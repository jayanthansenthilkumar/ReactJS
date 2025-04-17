import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt,
  FaUserGraduate,
  FaUserTie,
  FaCog,
  FaBars
} from 'react-icons/fa';
import { useState } from 'react';

const Sidebar = () => {
  // Using location to determine active route
  const location = useLocation();
  const pathname = location.pathname;
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    document.body.classList.toggle('sidebar-collapsed');
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar} title="Toggle Sidebar">
          <FaBars />
        </button>
        <h2>School Admin</h2>
      </div>
      
      <div className="sidebar-menu">
        <Link to="/" className={`menu-item ${pathname === '/' ? 'active' : ''}`}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>
        <Link to="/students" className={`menu-item ${pathname === '/students' ? 'active' : ''}`}>
          <FaUserGraduate />
          <span>Students</span>
        </Link>
        <Link to="/staffs" className={`menu-item ${pathname === '/staffs' ? 'active' : ''}`}>
          <FaUserTie />
          <span>Staff</span>
        </Link>
        <Link to="/settings" className={`menu-item ${pathname === '/settings' ? 'active' : ''}`}>
          <FaCog />
          <span>Settings</span>
        </Link>
      </div>
      
      <div className="sidebar-footer">
        <div className="system-info">
          <span>School Admin v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;