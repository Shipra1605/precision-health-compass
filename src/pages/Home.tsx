
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, UserPlus, LogIn, BarChart2, FileText, LightbulbIcon } from 'lucide-react';
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
                <div className="h-48 w-48 rounded-full bg-blue-100 flex items-center justify-center">
                  <Heart className="h-24 w-24 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Services Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Diagnosis */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <BarChart2 className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Diagnosis</h3>
                <p className="text-gray-600">
                  Get preliminary diagnosis based on your symptoms and medical history
                </p>
              </div>
              
              {/* Treatment Plans */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <LightbulbIcon className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Treatment Plans</h3>
                <p className="text-gray-600">
                  Personalized treatment recommendations with genetic consideration
                </p>
              </div>
              
              {/* Health Records */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <FileText className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Records</h3>
                <p className="text-gray-600">
                  Securely store and manage your medical history in one place
                </p>
              </div>
            </div>
          </div>
          
          {/* Technologies Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Powered By</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <img 
                  src="/lovable-uploads/68d7cf08-2467-45a1-823d-8385bc89459f.png" 
                  alt="XGBoost"
                  className="h-12 mb-3 object-contain"
                />
                <h3 className="text-lg font-medium">Clinical BERT</h3>
                <p className="text-sm text-center text-gray-500">Natural language processing for medical text</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <img 
                  src="/lovable-uploads/68d7cf08-2467-45a1-823d-8385bc89459f.png" 
                  alt="BERT"
                  className="h-12 mb-3 object-contain"
                />
                <h3 className="text-lg font-medium">XGBoost</h3>
                <p className="text-sm text-center text-gray-500">Machine learning for precise predictions</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <img 
                  src="/lovable-uploads/68d7cf08-2467-45a1-823d-8385bc89459f.png" 
                  alt="SHAP"
                  className="h-12 mb-3 object-contain"
                />
                <h3 className="text-lg font-medium">SHAP</h3>
                <p className="text-sm text-center text-gray-500">Explainable AI for healthcare insights</p>
              </div>
            </div>
            
            <div className="mb-8 p-6 bg-blue-50 rounded-lg shadow-sm">
              <p className="text-blue-800 text-center italic">
                "Integrating XGBoost, Clinical BERT and SHAP for complete healthcare analysis"
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
