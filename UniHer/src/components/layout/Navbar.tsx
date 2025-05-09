import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Bell, Menu, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface NavbarProps {
  toggleSidebar?: () => void;
  isLoggedIn?: boolean;
  isFixed?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isLoggedIn = false, isFixed = false }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New message from Sarah", read: false },
    { id: 2, title: "Career event tomorrow", read: false },
    { id: 3, title: "Study group invitation", read: false },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
  };

  // Determine if we're on the home page
  const isHomePage = location.pathname === '/';

  return (
    <nav className={cn(
      "bg-white border-b border-border z-30",
      isFixed ? "fixed top-0 left-0 right-0" : "sticky top-0"
    )}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-uniher-purple to-uniher-purple-dark flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="font-heading font-semibold text-xl hidden sm:block">UniHer</span>
          </Link>
        </div>
        
        {isHomePage && !isMobile && !isLoggedIn && (
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent className="z-30 bg-white">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-uniher-purple/20 to-uniher-purple/50 p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              UniHer Platform
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              The all-in-one SaaS platform for college girls to excel in academics, career, wellness, safety, networking, and lifestyle.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          to="/academics"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Academics</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Smart planner, study tools, and academic resources
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/career"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Career</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Internships, mentorship, and startup resources
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/wellness"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Wellness</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Period tracking, mental health resources, and wellness challenges
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/safety"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Safety</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Emergency contacts, safety analysis, and privacy protection
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Community</NavigationMenuTrigger>
                  <NavigationMenuContent className="z-30 bg-white">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li>
                        <Link
                          to="/mentors"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Mentors</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Connect with experienced mentors in various fields
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/students"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Student Directory</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Connect with fellow students across universities
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/events"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Events</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Find workshops, networking events, and more
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/programs"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Programs</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Join structured learning and development programs
                          </p>
                        </Link>
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
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.some(n => !n.read) && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 z-30">
                  <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h3 className="font-medium">Notifications</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-uniher-purple hover:text-uniher-purple-dark"
                    >
                      Mark all as read
                    </Button>
                  </div>
                  {notifications.length > 0 ? (
                    <div className="max-h-80 overflow-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={cn(
                          "px-4 py-3 border-b last:border-0 cursor-pointer hover:bg-gray-50",
                          !notification.read && "bg-uniher-purple/5"
                        )}>
                          <div className="flex items-start gap-2">
                            <div className={cn(
                              "w-2 h-2 rounded-full mt-2",
                              !notification.read ? "bg-uniher-purple" : "bg-gray-300"
                            )}></div>
                            <div>
                              <p className="text-sm">{notification.title}</p>
                              <p className="text-xs text-gray-500">Just now</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                  <div className="p-2 border-t text-center">
                    <Link to="/notifications" className="text-xs text-uniher-purple hover:underline">
                      View all notifications
                    </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-30 bg-white">
                  <div className="flex items-center gap-2 p-2 border-b">
                    <div className="w-8 h-8 rounded-full bg-uniher-purple-light flex items-center justify-center">
                      <span className="text-uniher-purple text-xs font-bold">JD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Jane Doe</p>
                      <p className="text-xs text-gray-500">jane.doe@university.edu</p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="cursor-pointer">Help & Support</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/" className="cursor-pointer text-red-500">Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button variant="default" asChild className="bg-uniher-purple hover:bg-uniher-purple-dark">
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile menu for home page */}
      {isHomePage && isMobile && !isLoggedIn && (
        <div className="border-t border-gray-100 px-4 py-2">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Menu
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  dropdownOpen && "transform rotate-180"
                )} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[calc(100vw-2rem)] z-30 bg-white">
              <DropdownMenuItem asChild>
                <Link to="/academics">Academics</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/career">Career</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/wellness">Wellness</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/safety">Safety</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/social">Social</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/mentors">Mentors</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/students">Students</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/events">Events</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/programs">Programs</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
