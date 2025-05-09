import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminSidebar from '../../components/admin/SuperAdminSidebar';
import { getCurrentUser } from '../../services/userService';

type SuperAdminLayoutProps = {
  children: React.ReactNode;
};

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Redirect if not logged in or not a super admin
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (currentUser.role !== 'superAdmin') {
      // Redirect based on role
      if (currentUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [navigate, currentUser]);

  // Don't render the layout until we've verified the user
  if (!currentUser || currentUser.role !== 'superAdmin') {
    return null;
  }

  return (
    <div className="flex h-screen">
      <SuperAdminSidebar userName={currentUser.name} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;