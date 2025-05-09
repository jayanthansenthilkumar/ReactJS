
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { getCurrentUser } from '../../data/users';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    // Check if user is logged in and is an admin
    if (!currentUser) {
      toast.error('Please login to access the admin area');
      navigate('/login');
    } else if (currentUser.role !== 'admin') {
      toast.error('You do not have permission to access this area');
      navigate('/');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-muted/30">
      <AdminSidebar className="w-64 flex-shrink-0" />
      
      <div className="flex-grow flex flex-col min-h-screen">
        <AdminHeader />
        
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
