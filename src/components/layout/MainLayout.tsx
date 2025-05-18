
import React, { useEffect } from 'react';
import MainNavbar from './MainNavbar';
import Footer from './Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserData } from '@/types'; // Ensure UserData is imported

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

interface CurrentUserStored extends UserData { // To handle needsProfileSetup
  needsProfileSetup?: boolean;
  sessionExpiry?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (requireAuth) {
      const currentUserString = localStorage.getItem('currentUser');
      if (!currentUserString) {
        navigate('/login');
      } else {
        try {
          const userData: CurrentUserStored = JSON.parse(currentUserString); // Use temporary interface
          if (userData.needsProfileSetup === true) { // Explicitly check for true
            navigate('/profile-setup');
            return;
          }
          if (userData.sessionExpiry) {
            const expiryDate = new Date(userData.sessionExpiry);
            if (expiryDate < new Date()) {
              localStorage.removeItem('currentUser');
              navigate('/login');
            }
          } else { // If no sessionExpiry, consider it expired or invalid
            localStorage.removeItem('currentUser');
            navigate('/login');
          }
        } catch (error) {
          console.error("Error parsing user data in MainLayout:", error);
          localStorage.removeItem('currentUser');
          navigate('/login');
        }
      }
    }
  }, [navigate, requireAuth, location.pathname]); // Add location.pathname to re-run on navigation

  // Determine background class based on current path
  let backgroundClass = 'page-background'; // Default fallback
  if (location.pathname === '/') {
    backgroundClass = 'homepage-bg';
  } else if (location.pathname.startsWith('/dashboard')) {
    backgroundClass = 'dashboard-page-bg';
  } else if (['/login', '/signup', '/profile-setup'].includes(location.pathname)) {
    backgroundClass = 'auth-pages-bg';
  } else if (['/about', '/health-facts'].includes(location.pathname)) {
    // Assuming 'info-pages-bg' is defined and suitable, or use a generic one
    // For now, specific backgrounds for About and HealthFacts are not directly editable via their components
    // but could be handled if they use this MainLayout with a distinct path.
    // Using 'info-pages-bg' which was defined in previous CSS.
    backgroundClass = 'info-pages-bg'; 
  } else if (location.pathname === '/team') {
    backgroundClass = 'team-page-bg';
  }

  return (
    <div className={`page-container ${backgroundClass}`}>
      <MainNavbar />
      <main className="page-content-overlay flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

