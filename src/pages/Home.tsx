
import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, BarChart2, FileText, Stethoscope, Brain, Activity, PieChart, Server, Dna, Flask, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-teal-50 to-white">
        <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-teal-100/30 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-cyan-100/30 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-6xl w-full text-center">
          {/* Main Hero Section */}
          <div className="p-8 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg mb-16 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 text-left mb-8 md:mb-0 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-4 font-heading animate-fade-in">
                  Welcome to Your Personal AI Doctor
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Get personalized medical insights powered by advanced AI
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 transition-colors hover-scale">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Create New Account
                    </Button>
                  </Link>
                  
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-teal-300 text-teal-600 hover-scale">
                      <LogIn className="h-5 w-5 mr-2" />
                      Existing User Login
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex-shrink-0 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-teal-200 to-cyan-200 blur-md opacity-75 animate-pulse-subtle"></div>
                  <div className="relative">
                    <img 
                      src="/lovable-uploads/ada3d3a6-2579-48cf-9503-3ff02f7da658.png" 
                      alt="MediCare AI Logo" 
                      className="h-48 w-auto drop-shadow-md"
                    />
                    <h2 className="text-2xl font-bold text-teal-700 mt-2">MediCare AI</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services Section */}
          <div className="mb-16 relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Diagnosis */}
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-md hover-lift border-t-4 border-teal-500">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-teal-100 rounded-lg">
                    <Brain className="h-10 w-10 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Diagnosis</h3>
                <p className="text-gray-600">
                  Advanced algorithms analyze symptoms and medical data to provide quick preliminary insights about potential health conditions.
                </p>
              </div>
              
              {/* Treatment Plans */}
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-md hover-lift border-t-4 border-teal-500">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-teal-100 rounded-lg">
                    <PieChart className="h-10 w-10 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Treatment Plans</h3>
                <p className="text-gray-600">
                  Receive evidence-based treatment suggestions tailored to your symptoms and medical profile with clear explanations.
                </p>
              </div>
              
              {/* Health Records */}
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-md hover-lift border-t-4 border-teal-500">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-teal-100 rounded-lg">
                    <Server className="h-10 w-10 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Records</h3>
                <p className="text-gray-600">
                  Securely store and access your medical data in one place, making it easier to track health patterns over time.
                </p>
              </div>
            </div>
          </div>
          
          {/* Technologies Section */}
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm p-10 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Powered By</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 hover-lift rounded-lg">
                <div className="w-full h-40 mb-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg flex items-center justify-center shadow-inner">
                  <Microscope className="h-16 w-16 text-teal-600" />
                </div>
                <h3 className="text-lg font-medium">Clinical BERT</h3>
                <p className="text-sm text-center text-gray-600 mt-2">
                  A specialized language model that processes medical text to understand complex symptoms and clinical terminology.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 hover-lift rounded-lg">
                <div className="w-full h-40 mb-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg flex items-center justify-center shadow-inner">
                  <BarChart2 className="h-16 w-16 text-teal-600" />
                </div>
                <h3 className="text-lg font-medium">XGBoost</h3>
                <p className="text-sm text-center text-gray-600 mt-2">
                  A powerful decision-tree algorithm that analyzes health data to identify patterns and predict optimal treatment options.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 hover-lift rounded-lg">
                <div className="w-full h-40 mb-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg flex items-center justify-center shadow-inner">
                  <Dna className="h-16 w-16 text-teal-600" />
                </div>
                <h3 className="text-lg font-medium">SHAP</h3>
                <p className="text-sm text-center text-gray-600 mt-2">
                  An explainable AI framework that provides transparency by showing how different factors influence treatment recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 MediCare AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
