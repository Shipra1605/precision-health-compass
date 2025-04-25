
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, Stethoscope, Presentation } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="relative h-10 w-10 flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 font-heading">MediCare AI</span>
                  <span className="text-xs text-gray-600">Personalized care at your fingertips</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/presentation">
              <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                <Presentation className="h-4 w-4 mr-2" />
                <span>Project Presentation</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
