
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      setIsAuthenticated(false);
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
    } else {
      try {
        // Check if session is expired
        const userData = JSON.parse(currentUser);
        const expiryDate = new Date(userData.sessionExpiry);
        
        if (expiryDate < new Date()) {
          localStorage.removeItem('currentUser');
          setIsAuthenticated(false);
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('currentUser');
        setIsAuthenticated(false);
      }
    }
  }, [toast]);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Show the protected component if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
