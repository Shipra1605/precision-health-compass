
import React from 'react';
import { Stethoscope } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isTeamPage = location.pathname === '/team';

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 py-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-8 w-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">MediCare AI © 2025</span>
          </div>
          
          {!isTeamPage && (
            <div className="text-sm text-gray-500">
              <p>Your trusted AI healthcare companion</p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
