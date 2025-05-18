
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Logo from './Logo'; // Import the new Logo component

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center"> {/* Added items-center */}
          <div className="flex">
            <Link to="/" className="flex items-center gap-2">
              <Logo size="lg" textColor="text-gray-800" />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {!isHomePage && (
              <Link to="/">
                <Button variant="outline" size="sm" className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Homepage
                </Button>
              </Link>
            )}
            {isHomePage && (
              <>
                <Link to="/about">
                  <Button variant="ghost" size="sm">
                    About
                  </Button>
                </Link>
                <Link to="/health-facts">
                  <Button variant="ghost" size="sm">
                    Health Facts
                  </Button>
                </Link>
                <Link to="/team">
                  <Button variant="ghost" size="sm">
                    Meet the Team
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
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
