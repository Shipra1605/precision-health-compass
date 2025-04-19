
import React from 'react';

const ConclusionSlide = () => {
  return (
    <div className="w-full h-full p-16">
      <h2 className="text-3xl font-bold text-teal-800 mb-6">Challenges & Conclusion</h2>
      
      <h3 className="text-xl font-semibold text-teal-600 mb-4">Challenges and Solutions</h3>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="font-medium">Challenge</div>
        <div className="font-medium">Solution</div>
        
        <div>Data Privacy</div>
        <div>Encrypted storage & compliance with medical data standards</div>
        
        <div>Model Interpretability</div>
        <div>Integrated SHAP for transparency in recommendations</div>
        
        <div>Scalability</div>
        <div>Modular ML pipelines and component-based architecture</div>
      </div>
      
      <h3 className="text-xl font-semibold text-teal-600 mb-4">Conclusion & Future Enhancements</h3>
      <p className="text-gray-700 mb-4">
        MediCare AI provides an intelligent, explainable, and personalized treatment recommendation 
        system that bridges the gap between data and healthcare decisions.
      </p>
      
      <p className="text-gray-700 mb-2">Future enhancements include:</p>
      <ul className="list-disc pl-8 space-y-1 text-gray-700">
        <li>Integration with Wearable Devices</li>
        <li>Support for Multilingual Medical Records</li>
        <li>Doctor Dashboard with Live Patient Chat</li>
        <li>Expanded Dataset & Deep Learning Integration</li>
      </ul>
    </div>
  );
};

export default ConclusionSlide;
