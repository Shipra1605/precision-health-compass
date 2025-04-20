
import React from "react";

const TitleSlide = () => (
  <div className="flex flex-col items-center justify-center h-full py-20">
    <div className="mb-8 flex items-center gap-4">
      <div className="relative h-16 w-16 flex items-center justify-center bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-md">
        {/* Hero icon or logo */}
        <span className="text-4xl text-white font-bold">AI</span>
      </div>
      <span className="text-4xl font-extrabold text-teal-700">
        MediCare AI
      </span>
    </div>
    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
      Intelligent Medical Recommendation System
    </h1>
    <p className="text-lg text-gray-600 mb-6 text-center max-w-2xl">
      Project Report & Presentation
    </p>
    <span className="text-lg font-medium text-gray-500 italic">
      Prepared by: MCA Final Year – Group 35
      <br />
      Mentor: <span className="text-teal-700 font-bold">Mr. Deen Mohammad</span>
    </span>
  </div>
);

export default TitleSlide;
