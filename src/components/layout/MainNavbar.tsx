
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Info, 
  Activity, 
  Leaf, 
  Users, 
  LogOut, 
  Stethoscope,
  Menu,
  X
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const MainNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'About', path: '/about', icon: <Info className="h-4 w-4 mr-2" /> },
    { name: 'Health Facts', path: '/health-facts', icon: <Activity className="h-4 w-4 mr-2" /> },
    { name: 'Meet the Team', path: '/team', icon: <Users className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="relative h-10 w-10 flex items-center justify-center bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-md">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-teal-600 font-heading">MediCare AI</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link to={item.path}>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "flex items-center",
                          isActive(item.path) && "bg-teal-50 text-teal-700"
                        )}
                      >
                        {item.icon}
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="ml-4 flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden py-3 pb-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 text-base font-medium rounded-md",
                    isActive(item.path)
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center ml-3 mr-3 mt-3 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sign Out</span>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNavbar;
