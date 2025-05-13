
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, LogIn, UserPlus, Stethoscope } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="relative h-10 w-10 flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600 rounded-full shadow">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xl font-bold text-gray-800 font-heading">MediCare AI</span>
                  <span className="text-xs text-gray-600">Personalized care at your fingertips</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
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
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
