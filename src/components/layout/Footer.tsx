
import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo'; // Using the new Logo

const Footer = () => {
  const location = useLocation();
  const isTeamPage = location.pathname === '/team';
  const isDashboard = location.pathname.startsWith('/dashboard');


  // Determine footer style based on page - simpler for now
  const footerBgClass = isDashboard ? "bg-background/80" : "bg-slate-100/80"; 

  return (
    <footer className={`${footerBgClass} backdrop-blur-sm border-t border-gray-200/50 py-6 shadow-sm mt-auto`}> {/* Ensure it's at bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0"> {/* Increased gap */}
            <Logo size="md" textColor="text-gray-600" /> 
            {/* The copyright is now part of the logo or implied by its presence */}
            <span className="text-sm font-medium text-gray-500">© 2025</span>
          </div>
          
          {!isTeamPage && !isDashboard && ( // Don't show tagline on team or dashboard page
            <div className="text-sm text-gray-500 text-center md:text-right">
              <p>Your trusted AI healthcare companion.</p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
