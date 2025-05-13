
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Stethoscope, Menu, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

const MainNavbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600 rounded-full shadow">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xl font-bold text-gray-800 font-heading">MediCare AI</span>
                  <span className="text-xs text-gray-600">Patient Dashboard</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2 border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center ml-3 mr-3 mt-3 border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
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
