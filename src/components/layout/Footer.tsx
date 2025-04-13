
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Heart className="h-5 w-5 text-medical-primary" />
            <span className="text-sm font-medium text-gray-600">Precision Health Compass © 2025</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-gray-500 hover:text-medical-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-medical-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-medical-primary transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-4 text-center md:text-left">
          <p className="text-xs text-gray-400">This is a demo application. Not for medical use. Always consult a healthcare professional.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
