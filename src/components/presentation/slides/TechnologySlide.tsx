
import React from 'react';

const TechnologySlide = () => {
  return (
    <div className="w-full h-full p-16">
      <h2 className="text-3xl font-bold text-teal-800 mb-8">Technologies Used</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-4">Programming Languages</h3>
          <p className="text-lg text-gray-700">Python, JavaScript</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-4">Backend</h3>
          <p className="text-lg text-gray-700">FastAPI, SQLite/MySQL</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-4">Frontend</h3>
          <p className="text-lg text-gray-700">HTML, CSS, JavaScript (React)</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-4">Machine Learning</h3>
          <p className="text-lg text-gray-700">ClinicalBERT, XGBoost, SHAP, Pandas, Scikit-learn</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-4">Deployment/Monitoring</h3>
          <p className="text-lg text-gray-700">Grafana, Alertmanager</p>
        </div>
      </div>
    </div>
  );
};

export default TechnologySlide;
