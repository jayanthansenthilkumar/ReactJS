import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Book, ShoppingCart, Users, Home, Menu, User } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface AdminSidebarProps {
  className?: string;
}

const AdminSidebar = ({ className }: AdminSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: <Home className="w-5 h-5" />,
      exact: true
    },
    {
      name: 'Books',
      href: '/admin/books',
      icon: <Book className="w-5 h-5" />
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: <ShoppingCart className="w-5 h-5" />
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: <Users className="w-5 h-5" />
    },
    {
      name: 'Profile',
      href: '/admin/profile',
      icon: <User className="w-5 h-5" />
    }
  ];
  
  const NavLink = ({ item }: { item: typeof navigationItems[0] }) => (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
        isActive(item.href, item.exact)
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted"
      )}
    >
      {item.icon}
      <span>{item.name}</span>
    </Link>
  );
  
  const SidebarContent = () => (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex items-center mb-8">
        <Book className="w-6 h-6 text-primary mr-2" />
        <h1 className="font-serif text-xl font-bold">BookShelf Admin</h1>
      </div>
      
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
      
      <div className="mt-auto pt-4">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
          <Home className="w-4 h-4" />
          Back to Store
        </Link>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden flex items-center h-16 px-4 border-b sticky top-0 bg-background z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center ml-4">
          <Book className="h-6 w-6 text-primary mr-2" />
          <span className="font-serif font-bold">BookShelf Admin</span>
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex flex-col border-r bg-card h-screen sticky top-0",
          className
        )}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default AdminSidebar;
