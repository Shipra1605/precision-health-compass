
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Stethoscope, Brain, Database, ShieldCheck, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">About MediCare AI</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-blue-500 mx-auto mb-6"></div>
          
          <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg border border-gray-100">
            <p className="text-lg font-medium text-gray-700 mb-3">
              <strong>MediCare AI harnesses cutting-edge ML and AI to deliver accurate medical recommendations in real-time.</strong>
            </p>
            <p className="text-lg font-medium text-gray-700 mb-3">
              <strong>Our dual-model approach combines ClinicalBERT for natural language understanding with XGBoost for structured data analysis.</strong>
            </p>
            <p className="text-lg font-medium text-gray-700 mb-3">
              <strong>We process both structured metrics and unstructured narratives to create comprehensive patient profiles.</strong>
            </p>
            <p className="text-lg font-medium text-gray-700 mb-3">
              <strong>SHAP values provide transparent explanations for every recommendation, ensuring trust and understanding.</strong>
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Our personalized treatment plans consider medical history, symptoms, and genetic predispositions for optimal care.</strong>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="bg-white rounded-lg shadow-md p-8 h-full hover-lift">
              <div className="flex items-center mb-6">
                <div className="rounded-full p-3 bg-blue-100 mr-4">
                  <Brain className="h-7 w-7 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">AI-Powered Analysis</h2>
              </div>
              <p className="text-gray-600">
                MediCare AI integrates advanced machine learning models including ClinicalBERT for natural language processing 
                of medical texts and XGBoost for classification of structured patient data. This dual approach enables a 
                comprehensive analysis of both medical history narratives and specific health metrics.
              </p>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-white rounded-lg shadow-md p-8 h-full hover-lift">
              <div className="flex items-center mb-6">
                <div className="rounded-full p-3 bg-blue-100 mr-4">
                  <Database className="h-7 w-7 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Comprehensive Data Processing</h2>
              </div>
              <p className="text-gray-600">
                Our system processes both structured and unstructured medical data, converting complex patient information 
                into actionable insights. The platform handles everything from laboratory test results to doctor's notes, 
                creating a holistic view of each patient's unique health profile.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Our Objectives</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="animate-fade-in hover-lift" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center mb-4 mx-auto">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Smart Treatment Recommendations</h3>
              <p className="text-gray-600 text-center text-sm">
                Assist healthcare providers with AI-driven treatment suggestions based on comprehensive patient analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-lift" style={{ animationDelay: "0.4s" }}>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center mb-4 mx-auto">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Advanced Data Processing</h3>
              <p className="text-gray-600 text-center text-sm">
                Process structured and unstructured medical data to extract valuable insights for patient care.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-lift" style={{ animationDelay: "0.5s" }}>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mb-4 mx-auto">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Secure Web Experience</h3>
              <p className="text-gray-600 text-center text-sm">
                Maintain a secure, interactive platform that prioritizes patient data privacy and protection.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-lift" style={{ animationDelay: "0.6s" }}>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Collaborative Development</h3>
              <p className="text-gray-600 text-center text-sm">
                Built collaboratively by MCA students, including Shipra Nayal and team, combining diverse expertise.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-xl p-8 shadow-sm border border-blue-100 animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Technology Stack</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-blue-700">Frontend</h3>
              <p className="text-gray-600 text-sm">React.js, Tailwind CSS, TypeScript, Vite</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-blue-700">Backend</h3>
              <p className="text-gray-600 text-sm">Node.js, Express, LocalStorage</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-blue-700">ML Models</h3>
              <p className="text-gray-600 text-sm">ClinicalBERT, XGBoost</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-blue-700">Database</h3>
              <p className="text-gray-600 text-sm">MySQL / MongoDB</p>
            </div>
          </div>
          
          <div className="mt-4 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-blue-700">AI Layer</h3>
              <p className="text-gray-600 text-sm">SHAP for explainability</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
