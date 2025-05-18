
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X } from 'lucide-react'; // Using Menu and X for toggle
import { useToast } from '@/components/ui/use-toast';
import Logo from './Logo';

const MainNavbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      className: "bg-brand-teal text-white", // Example custom toast styling
    });
    navigate('/');
  };

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/30 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* Logo takes user to dashboard if logged in, or home if not. Here it's MainNavbar, so always dashboard context. */}
            {/* Link to="/dashboard" if appropriate, or just rely on it being the app's main internal navbar */}
            <Logo size="lg" textColor="text-brand-navy dark:text-brand-pearl-gray-light" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2 border-brand-teal text-brand-teal hover:bg-brand-teal/10 hover:text-brand-teal-dark"
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
              className="text-brand-navy dark:text-brand-pearl-gray-light hover:bg-foreground/10"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden py-3 pb-4 border-t border-border/30 animate-fade-in">
            <nav className="flex flex-col space-y-2 px-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 border-brand-teal text-brand-teal hover:bg-brand-teal/10 hover:text-brand-teal-dark py-2.5"
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

