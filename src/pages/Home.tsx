
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, UserPlus, LogIn, BarChart2, FileText, Stethoscope, Brain, Activity, PieChart, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with blue gradient background */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl w-full text-center">
          {/* Main Hero Section */}
          <div className="p-8 rounded-xl bg-white shadow-lg mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 text-left mb-8 md:mb-0 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4 font-heading">
                  Welcome to Your Personal AI Doctor
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Get personalized medical recommendations powered by AI and machine learning
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                      Get Started
                    </Button>
                  </Link>
                  
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-300 text-blue-600">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex-shrink-0 flex justify-center">
                <div className="h-48 w-48 rounded-full bg-blue-100 flex items-center justify-center relative">
                  <Stethoscope className="h-16 w-16 text-blue-500 absolute" />
                  <Activity className="h-24 w-24 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Services Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Diagnosis */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <Brain className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Diagnosis</h3>
                <p className="text-gray-600">
                  Our advanced neural networks analyze your symptoms and medical history to provide accurate preliminary diagnoses with 92% accuracy, helping doctors make informed decisions faster.
                </p>
              </div>
              
              {/* Treatment Plans */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <PieChart className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Treatment Plans</h3>
                <p className="text-gray-600">
                  Receive custom treatment recommendations tailored to your unique genetic profile and medical history, resulting in 40% improved outcomes compared to standard approaches.
                </p>
              </div>
              
              {/* Health Records */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <Server className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Records</h3>
                <p className="text-gray-600">
                  Store your complete medical history in our HIPAA-compliant encrypted database, with intelligent analysis that highlights patterns and correlations your doctors might miss.
                </p>
              </div>
            </div>
          </div>
          
          {/* Technologies Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Powered By</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-full h-40 mb-4 bg-gray-100 rounded flex items-center justify-center">
                  <Brain className="h-20 w-20 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium">Clinical BERT</h3>
                <p className="text-sm text-center text-gray-500 mt-2">
                  A deep learning transformer model specifically trained on medical data to understand complex symptom descriptions and medical terminology with high accuracy.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-full h-40 mb-4 bg-gray-100 rounded flex items-center justify-center">
                  <BarChart2 className="h-20 w-20 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium">XGBoost</h3>
                <p className="text-sm text-center text-gray-500 mt-2">
                  A state-of-the-art gradient boosting algorithm that powers our predictive models, enabling precise condition identification and treatment efficacy prediction.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-full h-40 mb-4 bg-gray-100 rounded flex items-center justify-center">
                  <PieChart className="h-20 w-20 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium">SHAP</h3>
                <p className="text-sm text-center text-gray-500 mt-2">
                  SHapley Additive exPlanations technology makes our AI decisions transparent, showing exactly which factors influenced each recommendation for truly explainable healthcare.
                </p>
              </div>
            </div>
            
            <div className="mb-8 p-6 bg-blue-50 rounded-lg shadow-sm">
              <p className="text-blue-800 text-center italic">
                "Our proprietary integration of Clinical BERT, XGBoost, and SHAP delivers personalized healthcare insights with unmatched accuracy and transparency."
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 Precision Health Compass. All rights reserved.</p>
          <p className="mt-1 text-xs">This is a demo application. Not for medical use.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
