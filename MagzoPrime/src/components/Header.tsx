import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ShoppingCart, Menu, BookOpen, Search, User, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { getCurrentUser, logout } from '../services/userService';
import { getCartCount } from '../services/cartService';
import { toast } from 'sonner';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  // Update cart count whenever the component renders
  useEffect(() => {
    setCartItemCount(getCartCount());
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8 lg:gap-12">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="px-2 py-6">
                  <div className="flex items-center mb-6">
                    <BookOpen className="h-6 w-6 text-primary mr-2" />
                    <span className="font-serif text-xl font-bold">Magzo Prime</span>
                  </div>
                  <nav className="flex flex-col gap-4">
                    <Link to="/" className="text-lg font-medium">
                      Home
                    </Link>
                    <Link to="/categories" className="text-lg font-medium">
                      Categories
                    </Link>
                    <Link to="/bestsellers" className="text-lg font-medium">
                      Bestsellers
                    </Link>
                    <Link to="/new-releases" className="text-lg font-medium">
                      New Releases
                    </Link>
                    {currentUser?.isAdmin && (
                      <Link to="/admin" className="text-lg font-medium text-primary">
                        Admin Dashboard
                      </Link>
                    )}
                    {currentUser ? (
                      <>
                        <Link to="/account" className="text-lg font-medium">
                          My Account
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="text-lg font-medium text-left text-red-600"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="text-lg font-medium">
                          Sign In
                        </Link>
                        <Link to="/register" className="text-lg font-medium">
                          Register
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <BookOpen className="h-6 w-6 text-primary mr-2" />
              <span className="font-serif text-xl font-bold hidden sm:inline-block">Magzo Prime</span>
            </Link>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium">
                Home
              </Link>
              <Link to="/categories" className="text-sm font-medium">
                Categories
              </Link>
              <Link to="/bestsellers" className="text-sm font-medium">
                Bestsellers
              </Link>
              <Link to="/new-releases" className="text-sm font-medium">
                New Releases
              </Link>
            </nav>
          </div>
          
          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for books..."
                className="w-full pl-9 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          
          {/* Right side icons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="md:hidden"
              aria-label="Search"
            >
              <Link to="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {currentUser.name}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account">My Account</Link>
                  </DropdownMenuItem>
                  {currentUser.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
