import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from './ui/button';
import { LogOut, Loader2 } from 'lucide-react';
import { logout } from '../services/userService';
import { toast } from 'sonner';

interface LogoutButtonProps extends ButtonProps {
  showIcon?: boolean;
  redirectTo?: string;
}

const LogoutButton = ({ 
  showIcon = true, 
  redirectTo = '/',
  children,
  ...props 
}: LogoutButtonProps) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate(redirectTo);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('There was a problem logging out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoggingOut} {...props}>
      {isLoggingOut ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        showIcon && <LogOut className="mr-2 h-4 w-4" />
      )}
      {children || (isLoggingOut ? 'Logging out...' : 'Logout')}
    </Button>
  );
};

export default LogoutButton;
