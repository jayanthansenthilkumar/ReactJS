
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Book,
  Heart,
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'mentor' | 'admin';
}

const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  const isAdmin = userType === 'admin';
  
  const menuItems = isAdmin ? [
    { icon: <LayoutDashboard className="mr-2 h-4 w-4" />, name: 'Dashboard', path: '/admin' },
    { icon: <Users className="mr-2 h-4 w-4" />, name: 'Users', path: '/admin/users' },
    { icon: <Book className="mr-2 h-4 w-4" />, name: 'Growth Paths', path: '/admin/growth-paths' },
    { icon: <Heart className="mr-2 h-4 w-4" />, name: 'Mental Health', path: '/admin/mental-health' },
    { icon: <Calendar className="mr-2 h-4 w-4" />, name: 'Events', path: '/admin/events' },
    { icon: <Settings className="mr-2 h-4 w-4" />, name: 'Settings', path: '/admin/settings' },
  ] : [
    { icon: <LayoutDashboard className="mr-2 h-4 w-4" />, name: 'Dashboard', path: '/mentor' },
    { icon: <Users className="mr-2 h-4 w-4" />, name: 'Mentees', path: '/mentor/mentees' },
    { icon: <Calendar className="mr-2 h-4 w-4" />, name: 'Sessions', path: '/mentor/sessions' },
    { icon: <Book className="mr-2 h-4 w-4" />, name: 'Resources', path: '/mentor/resources' },
    { icon: <Settings className="mr-2 h-4 w-4" />, name: 'Profile', path: '/mentor/profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b border-sherise-purple/20 h-16 flex items-center px-6 sticky top-0 z-40">
        <div className="flex justify-between w-full items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-sherise-purple">
              She<span className="text-sherise-purple-dark">Rise</span>
            </span>
            <span className="ml-2 text-sm text-sherise-purple-dark font-medium bg-sherise-purple/10 px-2 py-1 rounded">
              {isAdmin ? 'Admin' : 'Mentor'} Panel
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="size-8 rounded-full bg-sherise-purple/20 flex items-center justify-center text-sherise-purple-dark font-medium">
              {isAdmin ? 'A' : 'M'}
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className="w-64 border-r border-sherise-purple/10 bg-sherise-purple/5 hidden md:block">
          <div className="p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sherise-purple/10 text-foreground/80 hover:text-sherise-purple"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/"
                className="flex items-center px-3 py-2 mt-6 text-sm rounded-md text-red-500 hover:bg-red-500/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Exit Panel
              </Link>
            </nav>
          </div>
        </aside>
        
        <main className="flex-1 bg-background">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-6">
              {children}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
