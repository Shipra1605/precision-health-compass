import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, BarChart2, FileText, Brain, Activity, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/layout/Logo';

const Home: React.FC = () => {
  return (
    <div className="page-container homepage-bg">
      <Navbar />
      
      <main className="page-content-overlay flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full text-center">
          <div className="p-6 md:p-8 rounded-xl glass-panel mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 text-left mb-8 md:mb-0 md:pr-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-heading animate-fade-in">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                    Welcome to your personal AI Doctor
                  </span>
                </h1>
                
                <p className="text-lg text-gray-700 mb-6">
                  Transforming Healthcare with AI: Your Virtual Medical Expert
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Link to="/signup">
                    <Button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 transition-colors">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create New Account
                    </Button>
                  </Link>
                  
                  <Link to="/login">
                    <Button variant="outline" className="w-full sm:w-auto border-teal-300 text-teal-700 hover:bg-teal-50 hover:text-teal-700">
                      <LogIn className="h-4 w-4 mr-2" />
                      Existing User Login
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex-shrink-0 flex justify-center md:w-1/3">
                <Logo size="xl" textColor="text-teal-600" wrapperClassName="p-4 bg-white/50 rounded-full shadow-xl"/>
              </div>
            </div>
          </div>
          
          <div className="mb-12 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-6"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-lg border-t-4 border-blue-500 hover-lift">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100/50 rounded-lg">
                    <Brain className="h-7 w-7 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">AI Diagnosis</h3>
                <p className="text-gray-600 text-sm">
                  AI analysis of your symptoms to provide preliminary insights about potential health conditions.
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-lg border-t-4 border-teal-500 hover-lift">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-teal-100/50 rounded-lg">
                    <Activity className="h-7 w-7 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Treatment Plans</h3>
                <p className="text-gray-600 text-sm">
                  Personalized treatment suggestions based on your symptoms and medical profile.
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-lg border-t-4 border-blue-500 hover-lift">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100/50 rounded-lg">
                    <FileText className="h-7 w-7 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Health Records</h3>
                <p className="text-gray-600 text-sm">
                  Secure storage of your medical data to track patterns and provide better recommendations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto section-background p-8 rounded-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Powered By</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto mb-6"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-4 hover-lift rounded-lg">
                <div className="w-full h-24 mb-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg flex items-center justify-center shadow-inner">
                  <Brain className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-base font-medium text-gray-700">Clinical BERT</h3>
                <p className="text-xs text-center text-gray-600 mt-2">
                  Our specialized NLP model processes medical terminology to understand complex symptoms.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 hover-lift rounded-lg">
                <div className="w-full h-24 mb-4 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-lg flex items-center justify-center shadow-inner">
                  <BarChart2 className="h-10 w-10 text-teal-600" />
                </div>
                <h3 className="text-base font-medium text-gray-700">XGBoost</h3>
                <p className="text-xs text-center text-gray-600 mt-2">
                  Our decision-tree algorithm analyzes health data to identify patterns and predict optimal treatments.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 hover-lift rounded-lg">
                <div className="w-full h-24 mb-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg flex items-center justify-center shadow-inner">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-base font-medium text-gray-700">SHAP</h3>
                <p className="text-xs text-center text-gray-600 mt-2">
                  Our explainable AI framework shows how different factors influence our recommendations with transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
