
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="relative h-10 w-10 flex items-center justify-center bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-md">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-teal-600 font-heading">MediCare AI</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm">
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
