
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Logo from './Logo'; // Import the new Logo component

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
    navigate('/');
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center"> {/* Added items-center */}
          <div className="flex items-center"> {/* Ensure logo container is centered */}
            <Logo size="lg" textColor="text-gray-800" />
            {/* Removed the "Patient Dashboard" text, as the logo now implies the app context */}
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
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
