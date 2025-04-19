import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Stethoscope } from 'lucide-react';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = React.useState(1);
  const totalSlides = 9;

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={prevSlide}
              disabled={currentSlide === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm">
              Slide {currentSlide} of {totalSlides}
            </span>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextSlide}
              disabled={currentSlide === totalSlides}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg aspect-[16/9] relative overflow-hidden">
          {currentSlide === 1 && (
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
          )}
          
          {currentSlide === 2 && (
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
          )}
          
          {currentSlide === 3 && (
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
          )}
          
          {currentSlide === 4 && (
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
          )}
          
          {currentSlide === 5 && (
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
          )}
          
          {currentSlide === 6 && (
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
          )}
          
          {currentSlide === 7 && (
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
          )}
          
          {currentSlide === 8 && (
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
          )}
          
          {currentSlide === 9 && (
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
          )}
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                className={`h-2 w-2 rounded-full ${
                  currentSlide === i + 1 ? 'bg-teal-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(i + 1)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
