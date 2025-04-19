
import React from 'react';

const ArchitectureSlide = () => {
  return (
    <div className="w-full h-full p-16">
      <h2 className="text-3xl font-bold text-teal-800 mb-8">System Architecture</h2>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center mb-8">
        <p className="font-mono text-lg">[Frontend] → [FastAPI Backend] → [ML Model (XGBoost + BERT)] ← [SQLite Database]</p>
      </div>
      <ul className="space-y-4 text-lg text-gray-700">
        <li><span className="font-semibold">Frontend:</span> Interactive UI for symptom input, medical history uploads, and viewing recommendations.</li>
        <li><span className="font-semibold">Backend:</span> FastAPI handles routing, authentication (JWT), and ML model invocation.</li>
        <li><span className="font-semibold">ML Engine:</span> Hybrid model using ClinicalBERT for text embeddings, XGBoost for treatment classification, and SHAP for explainability.</li>
        <li><span className="font-semibold">Database:</span> Stores patient data, history, and recommendations securely.</li>
      </ul>
    </div>
  );
};

export default ArchitectureSlide;
