
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, Shield, Heart, Users, 
  GraduationCap, Settings, Home,
  MessageSquare, Info, Headphones, 
  Calendar, User, MapPin, Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  active = false,
  onClick,
  badge
}) => {
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center justify-between gap-3 px-3 py-2 rounded-md transition-colors",
        active 
          ? "bg-uniher-purple bg-opacity-10 text-uniher-purple" 
          : "hover:bg-uniher-gray text-gray-700 hover:text-uniher-purple-dark"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <span className="font-medium">{label}</span>
      </div>
      {badge !== undefined && (
        <span className="bg-uniher-purple text-white rounded-full text-xs px-2 py-0.5">
          {badge}
        </span>
      )}
    </Link>
  );
};

const SidebarGroup: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = true }) => {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-600">
        {title}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 transform rotate-180 data-[state=closed]:rotate-0"
        >
          <path d="M8 10L4 6h8l-4 4z" fill="currentColor" />
        </svg>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  // Get current pathname for active state
  const pathname = window.location.pathname;
  
  return (
    <aside className={cn(
      "fixed left-0 top-0 z-20 h-screen bg-white border-r border-border transition-all duration-300 pt-16",
      isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
    )}>
      <div className="flex flex-col h-full p-4 gap-4 overflow-y-auto">
        <div>
          <SidebarItem 
            to="/dashboard" 
            icon={Home} 
            label="Dashboard" 
            active={pathname === '/dashboard'} 
          />
        </div>
        
        <SidebarGroup title="Modules">
          <SidebarItem 
            to="/academics" 
            icon={BookOpen} 
            label="Academics" 
            active={pathname === '/academics'} 
          />
          <SidebarItem 
            to="/career" 
            icon={GraduationCap} 
            label="Career" 
            active={pathname === '/career'} 
          />
          <SidebarItem 
            to="/wellness" 
            icon={Heart} 
            label="Wellness" 
            active={pathname === '/wellness'} 
          />
          <SidebarItem 
            to="/safety" 
            icon={Shield} 
            label="Safety" 
            active={pathname === '/safety'} 
            badge={1}
          />
          <SidebarItem 
            to="/social" 
            icon={Users} 
            label="Social" 
            active={pathname === '/social'} 
          />
        </SidebarGroup>
        
        <SidebarGroup title="Community">
          <SidebarItem 
            to="/students" 
            icon={User} 
            label="Students" 
            active={pathname === '/students'} 
          />
          <SidebarItem 
            to="/mentors" 
            icon={GraduationCap} 
            label="Mentors" 
            active={pathname === '/mentors'} 
          />
          <SidebarItem 
            to="/events" 
            icon={Calendar} 
            label="Events" 
            active={pathname === '/events'} 
            badge={2}
          />
          <SidebarItem 
            to="/programs" 
            icon={Award} 
            label="Programs" 
            active={pathname === '/programs'} 
          />
        </SidebarGroup>
        
        <SidebarGroup title="Communication" defaultOpen={false}>
          <SidebarItem 
            to="/messages" 
            icon={MessageSquare} 
            label="Messages" 
            active={pathname === '/messages'} 
            badge={3}
          />
          <SidebarItem 
            to="/support" 
            icon={Headphones} 
            label="Support" 
            active={pathname === '/support'} 
          />
        </SidebarGroup>

        <div className="mt-auto space-y-1">
          <SidebarItem 
            to="/help" 
            icon={Info} 
            label="Help & Resources" 
            active={pathname === '/help'} 
          />
          <SidebarItem 
            to="/settings" 
            icon={Settings} 
            label="Settings" 
            active={pathname === '/settings'} 
          />
        </div>
        
        <div className="pt-4 mt-2 border-t border-gray-200">
          <div className="px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-uniher-purple-light flex items-center justify-center">
                <span className="text-uniher-purple text-xs font-bold">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium">Jane Doe</p>
                <p className="text-xs text-gray-500">Computer Science • Year 2</p>
              </div>
            </div>
            <div className="mt-3">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/profile">View Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
