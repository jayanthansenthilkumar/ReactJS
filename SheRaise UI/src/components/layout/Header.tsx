
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Growth Paths', path: '/growth' },
    { name: 'Mentors', path: '/mentors' },
    { name: 'Mental Health', path: '/mental-health' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sherise-pink/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-sherise-purple">
              She<span className="text-sherise-purple-dark">Rise</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-sherise-purple"
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
            Sign In
          </Button>
        </nav>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="text-foreground/80 hover:text-sherise-purple py-2 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark w-full mt-2">
                Sign In
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
