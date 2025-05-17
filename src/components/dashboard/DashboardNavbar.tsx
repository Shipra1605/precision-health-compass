
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Stethoscope, LayoutDashboard, UserCircle, Settings, LogOut, Bell } from 'lucide-react'; // Added Bell
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast'; // For logout toast

// Simplified UserData for Navbar context
interface NavbarUserData {
  fullName?: string;
  email?: string;
}

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast(); // Initialize useToast

  // Simplified user fetching for initials, assuming user data might be in localStorage
  // In a real app, this would come from a global state/context
  const [currentUser, setCurrentUser] = React.useState<NavbarUserData | null>(null);

  React.useEffect(() => {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setCurrentUser({ fullName: userData.fullName, email: userData.email });
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
    // Optionally, clear other user-specific data from localStorage
    // e.g., localStorage.removeItem(`records_${currentUser?.id}`);
    // localStorage.removeItem(`recommendations_${currentUser?.id}`);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/90 backdrop-blur-sm px-4 md:px-6 shadow-sm">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Stethoscope className="h-6 w-6 text-teal-600" />
          <span className="font-bold text-gray-800">MediCare AI</span>
        </Link>
        <Link
          to="/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        {/* Add other dashboard specific links here if needed */}
      </nav>
      {/* Mobile Menu can be added here if necessary */}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          {/* Search or other actions can go here */}
        </div>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                {/* <AvatarImage src={currentUser?.avatarUrl || undefined} alt={currentUser?.fullName || "User"} /> */}
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
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
            <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}> {/* Assuming a profile page */}
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}> {/* Assuming a settings page */}
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
