
import React from 'react';
import { Stethoscope } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-teal-600" />
            <span className="text-sm font-medium text-gray-600">MediCare AI © 2025 | Project Mentor: Mr. Deen Mohammad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
