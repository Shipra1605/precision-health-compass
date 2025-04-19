
import React from 'react';

const ObjectivesSlide = () => {
  return (
    <div className="w-full h-full p-16">
      <h2 className="text-3xl font-bold text-teal-800 mb-8">Objectives</h2>
      <ul className="list-disc pl-8 space-y-4 text-lg text-gray-700">
        <li>Build an AI-powered medical recommendation system based on structured and unstructured health data.</li>
        <li>Leverage ClinicalBERT embeddings and XGBoost for high-accuracy treatment predictions.</li>
        <li>Ensure transparency with SHAP-based explainable AI.</li>
        <li>Enable secure, intuitive user interaction through a frontend dashboard.</li>
        <li>Design a scalable, modular, and maintainable system architecture.</li>
      </ul>
    </div>
  );
};

export default ObjectivesSlide;
