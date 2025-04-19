
import React from 'react';

const WorkflowSlide = () => {
  return (
    <div className="w-full h-full p-16">
      <h2 className="text-3xl font-bold text-teal-800 mb-8">System Workflow</h2>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-4/6 overflow-auto font-mono text-sm">
        <pre className="text-gray-700">
{`+----------------------+  
|      User           |  
|      (Patient)      |  
+----------------------+  
         |    
+----------------------------+  
|    Homepage (/)            |  
|  - Get Started (Signup)    |  
|  - Profile (Login)         |  
|  - About Page (Intro)      |  
|  - Services Page (XGBoost, |  
|    SHAP, Clinical BERT)    |  
+----------------------------+  
         |    
+----------------------------+  
|  If New User → Signup (/)  |  
|  If Existing User → Login  |  
+----------------------------+  
         |  
+------------------------------+  
|    Backend Authentication   |  
|  (FastAPI with JWT)         |  
|   Verify User in Database   |  
+------------------------------+  
         |   
+-------------------------------+  
|  If Valid Credentials →      |  
|     Redirect to Dashboard    |  
|  Else → Show Error Message   |  
+-------------------------------+  
         |   
+---------------------------+  
|  Patient Dashboard (/)   |  
|  - View Health Data      |  
|  - View Previous         |  
|    Recommendations       |  
|  - Upload New Medical    |  
|    Records (if needed)   |  
|  - Input Symptoms &      |  
|    Severity Level        |  
+---------------------------+  
         |   
+---------------------------------+  
|  ML Model Analysis (Backend)   |  
|  - XGBoost for Symptoms        |  
|  - Clinical BERT (Transformer) |  
|    for Medical Text Analysis   |  
|  - SHAP for Explainability     |  
+---------------------------------+  
         |   
+---------------------------------+  
|   Personalized Recommendations |  
|   - Based on uploaded records  |  
|   - AI-driven treatment plan   |  
|   - Explainability via SHAP    |  
+---------------------------------+  
         |  
+---------------------------+  
|  Display Results in UI    |  
|  (Text)                   |  
+---------------------------+`}
        </pre>
      </div>
    </div>
  );
};

export default WorkflowSlide;
