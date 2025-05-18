import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import Logo from '../layout/Logo';

interface NavbarUserData {
  fullName?: string;
  email?: string;
  profileImageBase64?: string;
}

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = React.useState<NavbarUserData | null>(null);

  React.useEffect(() => {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setCurrentUser({ 
          fullName: userData.fullName || userData.name, 
          email: userData.email,
          profileImageBase64: userData.profileImageBase64 
        });
      } catch (e) {
        console.error("Failed to parse user from localStorage for navbar", e);
      }
    }
  }, []);

  const getUserInitials = () => {
    if (!currentUser || !currentUser.fullName) return 'U';
    return currentUser.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0,2);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      className: "bg-brand-teal text-white",
    });
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/90 backdrop-blur-md px-4 md:px-6 shadow-sm">
      <Link to="/dashboard" className="flex items-center gap-2">
        <Logo size="lg" textColor="text-brand-navy dark:text-brand-pearl-gray-light" />
      </Link>
      
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ml-4">
        <Link
          to="/dashboard"
          className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </Link>
      </nav>
      
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          {/* Search or other actions can go here */}
        </div>
        
        {/* User Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-foreground/10">
              <Avatar className="h-8 w-8">
                {currentUser?.profileImageBase64 ? (
                  <AvatarImage src={currentUser.profileImageBase64} alt={currentUser.fullName || "User"} />
                ) : (
                  <AvatarFallback className="bg-brand-teal/20 text-brand-teal-dark">{getUserInitials()}</AvatarFallback>
                )}
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="font-semibold text-foreground">{currentUser?.fullName || "My Account"}</div>
              <div className="text-xs text-muted-foreground">{currentUser?.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:!text-red-600 focus:text-red-600 hover:!bg-red-500/10 focus:bg-red-500/10 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardNavbar;
