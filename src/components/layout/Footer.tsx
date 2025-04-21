
import React from 'react';
import { Stethoscope } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-8 w-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">MediCare AI © 2025</span>
          </div>
          
          <div className="text-sm text-gray-500 text-center md:text-right">
            <p>Made in partial fulfillment of Master's in Computer Applications (MCA)</p>
            <p>with specialization in Machine Learning and Artificial Intelligence</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
