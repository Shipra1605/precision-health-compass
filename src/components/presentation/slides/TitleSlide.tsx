
import React from 'react';
import { Stethoscope } from 'lucide-react';

const TitleSlide = () => {
  return (
    <div className="w-full h-full p-16 flex flex-col justify-center items-center text-center">
      <div className="absolute top-8 left-8 flex items-center">
        <div className="relative h-16 w-16 flex items-center justify-center bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-md">
          <Stethoscope className="h-10 w-10 text-white" />
        </div>
      </div>
      
      <h1 className="text-5xl font-bold text-teal-800 mb-6">MediCare AI</h1>
      <h2 className="text-3xl font-medium text-teal-600 mb-12">Project Report</h2>
      
      <div className="mt-16 text-left w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-2">Prepared by:</h3>
        <p className="mb-1">MCA Final Year – Group 35</p>
        <p className="mb-4">Project Mentor: Mr. Deen Mohammad</p>
      </div>
    </div>
  );
};

export default TitleSlide;
