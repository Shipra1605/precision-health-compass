
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogOut } from 'lucide-react'; // Removed Bell, UserCircle, Settings
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import Logo from '../layout/Logo'; // Import the new Logo component

interface NavbarUserData {
  fullName?: string;
  email?: string;
  profileImageBase64?: string; // Added for avatar image
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
          fullName: userData.fullName, 
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
      .toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/90 backdrop-blur-sm px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
        {/* Using the Logo component here */}
        <Logo size="lg" textColor="text-gray-800" />
      </div>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ml-4"> {/* Added ml-4 for spacing */}
        <Link
          to="/dashboard"
          className="text-foreground transition-colors hover:text-foreground flex items-center gap-1"
        >
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </Link>
      </nav>
      
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          {/* Search or other actions can go here if needed in future */}
        </div>
        {/* Bell icon removed */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                {currentUser?.profileImageBase64 ? (
                  <img src={currentUser.profileImageBase64} alt={currentUser.fullName || "User"} className="h-full w-full object-cover rounded-full" />
                ) : (
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                )}
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div>{currentUser?.fullName || "My Account"}</div>
              <div className="text-xs text-muted-foreground font-normal">{currentUser?.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Profile and Settings items removed */}
            <DropdownMenuItem onClick={handleLogout}>
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
