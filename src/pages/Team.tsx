import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Team = () => {
  return (
    <div className="min-h-screen flex flex-col page-background">
      <Navbar />
      
      <main className="flex-grow px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Meet Our Team</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A dedicated group of professionals committed to transforming healthcare through artificial intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team members go here */}
            {/* You can expand this section with actual team member cards */}
          </div>
          
          {/* Academic Attribution - Only on Team Page */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 italic font-medium">
              Made in partial fulfillment of Master's in Computer Applications (MCA) with specialization in Machine Learning and Artificial Intelligence
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Team;
