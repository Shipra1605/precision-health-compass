
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon, UserPlus, LogIn as LogInIcon } from 'lucide-react'; // Renamed to avoid conflict
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/30 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <Link to="/" className="flex items-center gap-2">
              <Logo size="lg" textColor="text-brand-navy dark:text-brand-pearl-gray-light" />
            </Link>
          </div>
          <div className="flex items-center gap-3"> {/* Reduced gap slightly */}
            {!isHomePage && (
              <Link to="/">
                <Button variant="outline" size="sm" className="border-brand-teal/50 text-brand-teal hover:bg-brand-teal/10 hover:text-brand-teal-dark">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  Homepage
                </Button>
              </Link>
            )}
            {isHomePage && (
              <>
                <Link to="/about">
                  <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-foreground/5">
                    About
                  </Button>
                </Link>
                <Link to="/health-facts">
                  <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-foreground/5">
                    Health Facts
                  </Button>
                </Link>
                <Link to="/team">
                  <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-foreground/5">
                    Meet the Team
                  </Button>
                </Link>
                <div className="flex items-center gap-2 ml-2"> {/* Added ml-2 for slight separation */}
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="border-brand-teal text-brand-teal hover:bg-brand-teal/10 hover:text-brand-teal-dark">
                       <LogInIcon className="h-4 w-4 mr-1.5 sm:mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-brand-teal hover:bg-brand-teal-dark text-white">
                      <UserPlus className="h-4 w-4 mr-1.5 sm:mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

