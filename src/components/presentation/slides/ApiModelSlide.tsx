
import React from 'react';

const ApiModelSlide = () => {
  return (
    <div className="w-full h-full p-16">
      <h2 className="text-3xl font-bold text-teal-800 mb-6">API Endpoints & Model Pipeline</h2>
      
      <h3 className="text-xl font-semibold text-teal-600 mb-4">API Endpoints</h3>
      <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
        <div className="font-medium">Endpoint</div>
        <div className="font-medium">Method</div>
        <div className="font-medium">Description</div>
        
        <div>/patient/register</div>
        <div>POST</div>
        <div>Register a new patient</div>
        
        <div>/patient/login</div>
        <div>POST</div>
        <div>Authenticate login</div>
        
        <div>/patient/upload</div>
        <div>POST</div>
        <div>Upload medical history</div>
        
        <div>/patient/symptoms</div>
        <div>POST</div>
        <div>Submit symptoms</div>
        
        <div>/recommendation/generate</div>
        <div>GET</div>
        <div>Generate treatment recommendation</div>
      </div>
      
      <h3 className="text-xl font-semibold text-teal-600 mb-4">Model Pipeline & Evaluation</h3>
      <ul className="list-disc pl-8 space-y-2 text-gray-700">
        <li><span className="font-medium">Text Embedding:</span> ClinicalBERT extracts semantic representations of medical text.</li>
        <li><span className="font-medium">Prediction Engine:</span> XGBoost predicts the best-suited treatment.</li>
        <li><span className="font-medium">Explainability:</span> SHAP values reveal influential symptoms or history items.</li>
        <li><span className="font-medium">Accuracy:</span> 89.2% | <span className="font-medium">Precision:</span> 0.87 | <span className="font-medium">Recall:</span> 0.85</li>
      </ul>
    </div>
  );
};

export default ApiModelSlide;
