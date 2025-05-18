import React, { useEffect } from 'react';
import MainNavbar from './MainNavbar';
import Footer from './Footer';
import { useNavigate, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (requireAuth) {
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        navigate('/login');
      } else {
        try {
          const userData = JSON.parse(currentUser);
          if (userData.needsProfileSetup) {
            navigate('/profile-setup');
            return;
          }
          const expiryDate = new Date(userData.sessionExpiry);
          if (expiryDate < new Date()) {
            localStorage.removeItem('currentUser');
            navigate('/login');
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem('currentUser');
          navigate('/login');
        }
      }
    }
  }, [navigate, requireAuth]);

  let backgroundClass = 'page-background';
  if (location.pathname.startsWith('/dashboard')) {
    backgroundClass = 'dashboard-page-bg';
  } else if (['/about', '/health-facts'].includes(location.pathname)) {
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
