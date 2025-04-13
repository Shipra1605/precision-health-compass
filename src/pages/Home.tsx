
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, UserPlus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 bg-medical-background">
        <div className="max-w-4xl w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-medical-primary/10 flex items-center justify-center">
              <Heart className="h-12 w-12 text-medical-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-medical-primary mb-4 font-heading">
            Precision Health Compass
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Personalized treatment planning powered by machine learning, considering your unique medical history, genetic information, and current health conditions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <UserPlus className="h-5 w-5" />
                Create New Account
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <LogIn className="h-5 w-5" />
                Login
              </Button>
            </Link>
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
