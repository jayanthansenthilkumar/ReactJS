import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import LogoutButton from '../LogoutButton';

// Icons for the sidebar
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const ApprovalsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4" />
    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z" />
  </svg>
);

const AdminsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SalesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const StoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
  </svg>
);

type SuperAdminSidebarProps = {
  userName: string;
};

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ userName }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Navigation links
  const navLinks = [
    { 
      icon: <DashboardIcon />, 
      label: 'Dashboard', 
      path: '/superadmin' 
    },
    { 
      icon: <ApprovalsIcon />, 
      label: 'Book Approvals', 
      path: '/superadmin/approvals' 
    },
    { 
      icon: <AdminsIcon />, 
      label: 'Admin Management', 
      path: '/superadmin/admin-management' 
    },
    { 
      icon: <SalesIcon />, 
      label: 'Sales Analytics', 
      path: '/superadmin/sales' 
    },
    { 
      icon: <StoreIcon />, 
      label: 'Go to Store', 
      path: '/' 
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-800 text-white w-64 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">MagzoPrime</h1>
        <div className="mt-2 text-sm text-slate-300">SuperAdmin Panel</div>
      </div>

      <nav className="flex-1 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-700",
              currentPath === link.path ? "bg-slate-700 text-white" : "text-slate-300"
            )}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-700 pt-4 mt-auto">
        <div className="mb-4 text-sm font-medium">Logged in as</div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center text-sm font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-medium">{userName}</div>
            <div className="text-xs text-slate-400">Super Admin</div>
          </div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default SuperAdminSidebar;