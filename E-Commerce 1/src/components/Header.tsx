
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Menu,
  Search,
  User,
  LogOut,
  Home,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-green-900 font-heading font-bold text-2xl">
              PriSona Mart
            </span>
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/shops" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Browse Shops</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Discover local vendors and their products
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">All Products</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Browse our full catalog of products
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products?category=Fruits" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Fresh Fruits</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Seasonal and exotic fruits
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products?category=Vegetables" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Fresh Vegetables</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Farm-fresh vegetables
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className={navigationMenuTriggerStyle()}>
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className={navigationMenuTriggerStyle()}>
                    Contact
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/faqs" className={navigationMenuTriggerStyle()}>
                    FAQs
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-indigo-600">
                  {itemCount}
                </Badge>
              )}
            </Link>

            {/* User dropdown */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    Hi, {user?.name}
                    <div className="text-xs font-normal text-gray-500">
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Admin-specific links */}
                  {user?.role === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard">Admin Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/products">My Products</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {/* SuperAdmin-specific links */}
                  {user?.role === "superadmin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/superadmin/dashboard">Super Admin Panel</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/superadmin/approvals">Shop Approvals</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {/* Customer-specific links */}
                  {user?.role === "customer" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/orders">My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild size="sm" className="bg-green-900 hover:bg-green-700">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden py-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-600 hover:text-indigo-500 py-2">
                <Home className="h-4 w-4 mr-2 inline" />
                Home
              </Link>
              <Link to="/shops" className="text-gray-600 hover:text-indigo-500 py-2">
                Shops
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-indigo-500 py-2">
                Products
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-500 py-2">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-indigo-500 py-2">
                Contact
              </Link>
              <Link to="/faqs" className="text-gray-600 hover:text-indigo-500 py-2">
                FAQs
              </Link>
              
              {/* Conditionally render based on auth status */}
              {isAuthenticated ? (
                <>
                  <div className="text-sm font-semibold mt-2 text-gray-700">
                    {user?.name} ({user?.role})
                  </div>
                  
                  {/* Admin-specific links */}
                  {user?.role === "admin" && (
                    <>
                      <Link to="/admin/dashboard" className="text-gray-600 hover:text-indigo-500 py-2">
                        Admin Dashboard
                      </Link>
                      <Link to="/admin/products" className="text-gray-600 hover:text-indigo-500 py-2">
                        My Products
                      </Link>
                    </>
                  )}

                  {/* SuperAdmin-specific links */}
                  {user?.role === "superadmin" && (
                    <>
                      <Link to="/superadmin/dashboard" className="text-gray-600 hover:text-indigo-500 py-2">
                        Super Admin Panel
                      </Link>
                      <Link to="/superadmin/approvals" className="text-gray-600 hover:text-indigo-500 py-2">
                        Shop Approvals
                      </Link>
                    </>
                  )}

                  {/* Customer-specific links */}
                  {user?.role === "customer" && (
                    <Link to="/orders" className="text-gray-600 hover:text-indigo-500 py-2">
                      My Orders
                    </Link>
                  )}
                  
                  <Button variant="ghost" onClick={() => logout()} className="justify-start px-0">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex space-x-2 pt-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
