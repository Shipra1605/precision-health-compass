
import React from 'react';

const ExampleSlide = () => {
  return (
    <div className="w-full h-full p-16">
      <h2 className="text-3xl font-bold text-teal-800 mb-8">Example Input/Output</h2>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-4">Input JSON:</h3>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm overflow-auto h-64">
{`{
  "id": 1,
  "symptoms": [
    {"name": "Headache", "severity": 8},
    {"name": "Fever", "severity": 7}
  ],
  "history": ["Hypertension"]
}`}
          </pre>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-4">Output JSON:</h3>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm overflow-auto h-64">
{`{
  "top_recommendation": {
    "name": "Rest and hydration",
    "confidence": 0.85,
    "description": "Get plenty of rest and stay hydrated",
    "explanation": {
      "key_factors": [
        "Symptom severity (weight: 0.42)",
        "Past medical condition (weight: 0.38)"
      ]
    }
  },
  "alternatives": [
    {
      "name": "Over-the-counter pain relief",
      "confidence": 0.75
    }
  ]
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ExampleSlide;
