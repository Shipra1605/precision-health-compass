
import React, { useEffect } from 'react';
import MainNavbar from './MainNavbar';
import Footer from './Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserData } from '@/types';

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

// CurrentUserStored interface is no longer needed here as UserData now includes these optional fields.

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
          const userData: UserData = JSON.parse(currentUserString); // Use UserData directly
          if (userData.needsProfileSetup === true) { 
            navigate('/profile-setup');
            return;
          }
          if (userData.sessionExpiry) {
            const expiryDate = new Date(userData.sessionExpiry);
            if (expiryDate < new Date()) {
              localStorage.removeItem('currentUser');
              navigate('/login');
            }
          } else { 
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
  }, [navigate, requireAuth, location.pathname]);

  let backgroundClass = 'page-background'; // Default fallback
  if (location.pathname === '/') {
    backgroundClass = 'homepage-bg';
  } else if (location.pathname.startsWith('/dashboard')) {
    backgroundClass = 'dashboard-page-bg';
  } else if (['/login', '/signup', '/profile-setup'].includes(location.pathname)) {
    backgroundClass = 'auth-pages-bg';
  } else if (location.pathname === '/health-facts') {
    backgroundClass = 'health-facts-bg'; // New class for Health Facts
  } else if (location.pathname === '/team') {
    backgroundClass = 'team-page-bg'; // Updated for Team Page
  } else if (location.pathname === '/about') {
    backgroundClass = 'about-page-bg'; // New class for About Page
  }
  // Note: `info-pages-bg` was a generic class, now specific pages have their own.
  // If other pages used info-pages-bg, they will now use `page-background` unless specified.

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

