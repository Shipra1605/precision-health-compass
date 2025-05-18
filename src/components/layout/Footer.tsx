
import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const location = useLocation();
  const isTeamPage = location.pathname === '/team';
  const isDashboard = location.pathname.startsWith('/dashboard');

  const footerBgClass = isDashboard ? "bg-background/80 dark:bg-neutral-900/80" : "bg-slate-100/80 dark:bg-neutral-800/80"; 

  return (
    <footer className={`${footerBgClass} backdrop-blur-sm border-t border-border/50 py-6 shadow-sm mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Logo size="md" textColor="text-foreground/70" /> 
            <span className="text-sm font-medium text-foreground/60">© 2025</span>
          </div>
          
          {!isTeamPage && !isDashboard && (
            <div className="text-sm text-foreground/60 text-center md:text-right">
              <p>Your trusted AI healthcare companion.</p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

