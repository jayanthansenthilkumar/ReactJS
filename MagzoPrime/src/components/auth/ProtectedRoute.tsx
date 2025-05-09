import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { validateSession } from '../../services/userService';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'admin' | 'superAdmin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
  
  useEffect(() => {
    const validate = async () => {
      setIsValidating(true);
      try {
        const user = await validateSession();
        setCurrentUser(user);
        
        if (!user) {
          toast.error('Please log in to access this page', {
            id: 'auth-error',  // Use ID to prevent duplicate toasts
          });
        } else if (requiredRole && 
                ((requiredRole === 'superAdmin' && user.role !== 'superAdmin') ||
                 (requiredRole === 'admin' && !['admin', 'superAdmin'].includes(user.role)))) {
          toast.error('You do not have permission to access this page', {
            id: 'auth-error', 
          });
        }
      } catch (error) {
        console.error('Session validation error:', error);
        toast.error('Authentication error. Please log in again.', {
          id: 'auth-error',
        });
        setCurrentUser(null);
      } finally {
        setIsValidating(false);
      }
    };
    
    validate();
  }, [requiredRole, location.pathname]);
  
  // Show loading state while validating session
  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin mr-2 h-6 w-6 border-b-2 border-primary rounded-full"></div>
        <p>Authenticating...</p>
      </div>
    );
  }

  // If user is not logged in, redirect to login with return URL
  if (!currentUser) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  
  // Check role-based access
  if (requiredRole) {
    // SuperAdmin check
    if (requiredRole === 'superAdmin' && currentUser.role !== 'superAdmin') {
      return <Navigate to="/" replace />;
    }
    
    // Admin check (both admin and superAdmin roles can access admin routes)
    if (requiredRole === 'admin' && !['admin', 'superAdmin'].includes(currentUser.role)) {
      return <Navigate to="/" replace />;
    }
    
    // Customer check
    if (requiredRole === 'customer' && currentUser.role !== 'customer') {
      // This is less common, but may be needed for customer-only features
      return <Navigate to="/" replace />;
    }
  }
  
  // User is authenticated and has the required role
  return <>{children}</>;
};

export default ProtectedRoute;