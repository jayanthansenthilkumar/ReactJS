import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt,
  FaUserGraduate,
  FaUserTie,
  FaCog
} from 'react-icons/fa';

const Sidebar = () => {
  // Using location to determine active route
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Dashboard</h2>
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
          <span>Staffs</span>
        </Link>
        <Link to="/settings" className={`menu-item ${pathname === '/settings' ? 'active' : ''}`}>
          <FaCog />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;