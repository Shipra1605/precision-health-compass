
import React from 'react';
import MainNavbar from './MainNavbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (requireAuth) {
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        navigate('/login');
      } else {
        try {
          // Check if session is expired
          const userData = JSON.parse(currentUser);
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MainNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
