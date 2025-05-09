import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAIAssistant } from './AIAssistant/AIAssistantContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleAIAssistant } = useAIAssistant();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background shadow-md py-2 dark:bg-gray-900' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-prisol-dark-blue dark:text-white">Prisol<span className="text-prisol-blue">Tech</span></span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-base">
          <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-prisol-blue font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue dark:hover:text-prisol-blue'}`}>Home</Link>
          <Link to="/about" className={`font-medium transition-colors ${isActive('/about') ? 'text-prisol-blue font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue dark:hover:text-prisol-blue'}`}>About</Link>
          <Link to="/services" className={`font-medium transition-colors ${isActive('/services') ? 'text-prisol-blue font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue dark:hover:text-prisol-blue'}`}>Services</Link>
          <Link to="/products" className={`font-medium transition-colors ${isActive('/products') ? 'text-prisol-blue font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue dark:hover:text-prisol-blue'}`}>Products</Link>
          <Link to="/team" className={`font-medium transition-colors ${isActive('/team') ? 'text-prisol-blue font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue dark:hover:text-prisol-blue'}`}>Our Team</Link>
          <Link to="/clients" className={`font-medium transition-colors ${isActive('/clients') ? 'text-prisol-blue font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue dark:hover:text-prisol-blue'}`}>Clients</Link>
          <Link to="/contact" className={`font-medium transition-colors ${isActive('/contact') ? 'text-prisol-blue font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue dark:hover:text-prisol-blue'}`}>Contact</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle variant="outline" className="border-gray-300 dark:border-gray-600" />
          <Button 
            onClick={toggleAIAssistant}
            variant="outline" 
            className="border-prisol-blue text-prisol-blue hover:bg-prisol-blue hover:text-white dark:text-prisol-light-blue dark:border-prisol-light-blue dark:hover:bg-prisol-blue"
          >
            Prisona AI
          </Button>
          <Link to="/contact">
            <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white">Get a Quote</Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle size="sm" variant="outline" className="border-gray-300 dark:border-gray-600" />
          <Button 
            onClick={toggleAIAssistant}
            variant="outline" 
            size="sm"
            className="border-prisol-blue text-prisol-blue hover:bg-prisol-blue hover:text-white dark:text-prisol-light-blue dark:border-prisol-light-blue dark:hover:bg-prisol-blue"
          >
            AI
          </Button>
          <button onClick={handleToggleMobileMenu} className="p-2">
            <Menu className="h-6 w-6 text-prisol-dark-blue dark:text-white" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-background dark:bg-gray-900 absolute w-full left-0 shadow-md transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 py-3' : 'max-h-0 overflow-hidden py-0'}`}>
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          <Link to="/" className={`font-medium py-2 px-3 rounded transition-colors ${isActive('/') ? 'text-prisol-blue font-semibold bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className={`font-medium py-2 px-3 rounded transition-colors ${isActive('/about') ? 'text-prisol-blue font-semibold bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/services" className={`font-medium py-2 px-3 rounded transition-colors ${isActive('/services') ? 'text-prisol-blue font-semibold bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link to="/products" className={`font-medium py-2 px-3 rounded transition-colors ${isActive('/products') ? 'text-prisol-blue font-semibold bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link to="/team" className={`font-medium py-2 px-3 rounded transition-colors ${isActive('/team') ? 'text-prisol-blue font-semibold bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setMobileMenuOpen(false)}>Our Team</Link>
          <Link to="/clients" className={`font-medium py-2 px-3 rounded transition-colors ${isActive('/clients') ? 'text-prisol-blue font-semibold bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setMobileMenuOpen(false)}>Clients</Link>
          <Link to="/contact" className={`font-medium py-2 px-3 rounded transition-colors ${isActive('/contact') ? 'text-prisol-blue font-semibold bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-200 hover:text-prisol-blue hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
            <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white w-full">Get a Quote</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
