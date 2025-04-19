
import React from 'react';

const AbstractSlide = () => {
  return (
    <div className="w-full h-full p-16">
      <h2 className="text-3xl font-bold text-teal-800 mb-8">Abstract</h2>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        MediCare AI is a hybrid machine learning-based medical recommendation system designed to provide personalized 
        treatment recommendations using patient symptoms and medical history. It combines advanced NLP (ClinicalBERT), 
        predictive analytics (XGBoost), and explainable AI (SHAP) to aid healthcare professionals in making informed, 
        data-driven decisions.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        The system includes a user-friendly frontend, a FastAPI backend, and a modular design for scalability 
        and integration.
      </p>
    </div>
  );
};

export default AbstractSlide;
