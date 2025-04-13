
import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, BarChart2, FileText, Stethoscope, Brain, Activity, PieChart, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with teal gradient background */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-6xl w-full text-center">
          {/* Main Hero Section */}
          <div className="p-8 rounded-xl bg-white shadow-lg mb-16 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 text-left mb-8 md:mb-0 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-4 font-heading">
                  Welcome to Your Personal AI Doctor
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Get personalized medical insights powered by our student-developed AI system
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 transition-colors">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Create New Account
                    </Button>
                  </Link>
                  
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-teal-300 text-teal-600">
                      <LogIn className="h-5 w-5 mr-2" />
                      Existing User Login
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex-shrink-0 flex justify-center">
                <img 
                  src="/lovable-uploads/ada3d3a6-2579-48cf-9503-3ff02f7da658.png" 
                  alt="MediCare AI Logo" 
                  className="h-48 w-auto animate-pulse-subtle"
                />
              </div>
            </div>
          </div>
          
          {/* Services Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Diagnosis */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-teal-500">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-teal-100 rounded-lg">
                    <Brain className="h-10 w-10 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Diagnosis</h3>
                <p className="text-gray-600">
                  Our student-developed AI analyzes symptoms and medical history to provide preliminary insights to help understand potential health conditions.
                </p>
              </div>
              
              {/* Treatment Plans */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-teal-500">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-teal-100 rounded-lg">
                    <PieChart className="h-10 w-10 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Treatment Plans</h3>
                <p className="text-gray-600">
                  Receive general treatment suggestions based on your symptoms and medical history, designed to complement professional medical advice.
                </p>
              </div>
              
              {/* Health Records */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-teal-500">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-teal-100 rounded-lg">
                    <Server className="h-10 w-10 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Records</h3>
                <p className="text-gray-600">
                  Store your medical information securely and access it whenever needed, making it easier to track and manage your health journey.
                </p>
              </div>
            </div>
          </div>
          
          {/* Technologies Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Powered By</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-full h-40 mb-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded flex items-center justify-center">
                  <Brain className="h-20 w-20 text-teal-600" />
                </div>
                <h3 className="text-lg font-medium">Clinical BERT</h3>
                <p className="text-sm text-center text-gray-500 mt-2">
                  A machine learning model we're exploring that helps understand medical terms and symptoms from natural language descriptions.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-full h-40 mb-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded flex items-center justify-center">
                  <BarChart2 className="h-20 w-20 text-teal-600" />
                </div>
                <h3 className="text-lg font-medium">XGBoost</h3>
                <p className="text-sm text-center text-gray-500 mt-2">
                  A decision-tree based algorithm we're implementing that helps our project analyze health data and identify potential patterns.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-full h-40 mb-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded flex items-center justify-center">
                  <PieChart className="h-20 w-20 text-teal-600" />
                </div>
                <h3 className="text-lg font-medium">SHAP</h3>
                <p className="text-sm text-center text-gray-500 mt-2">
                  A framework we're studying that helps explain our AI's recommendations by showing which factors influenced the suggestions.
                </p>
              </div>
            </div>
            
            <div className="mb-8 p-6 bg-teal-50 rounded-lg shadow-sm">
              <p className="text-teal-800 text-center italic">
                "MediCare AI is our final year university project, designed to explore the potential of AI in healthcare while acknowledging the limitations of student-developed systems."
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 MediCare AI. All rights reserved.</p>
          <p className="mt-1 text-xs">This is a university student project. Not for actual medical use.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
