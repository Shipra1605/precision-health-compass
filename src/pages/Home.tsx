
import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, BarChart2, FileText, Brain, Activity, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/layout/Logo'; // Re-check if needed here, Navbar has it. Used for hero.

const Home: React.FC = () => {
  return (
    // Background class is applied by MainLayout or specific page wrapper if not using MainLayout
    // For Home, it will be 'homepage-bg' via MainLayout's logic if path is '/'
    // If Home does not use MainLayout, then add className="page-container homepage-bg" here.
    // Assuming Home.tsx is a direct child for a Route not wrapped by MainLayout, or MainLayout handles it.
    // For now, App.tsx wraps Home directly, so it does not use MainLayout.
    // So, we need to add page-container and homepage-bg here.
    <div className="page-container homepage-bg"> 
      <Navbar />
      <main className="page-content-overlay flex flex-col items-center justify-center px-4 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl w-full text-center">
          {/* Hero Section */}
          <div className="p-6 md:p-10 rounded-xl glass-panel mb-12 md:mb-16 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3 text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-5 font-heading leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal via-brand-blue-sky to-purple-500">
                    Welcome to Your Personal AI Doctor
                  </span>
                </h1>
                <p className="text-lg text-brand-navy/80 mb-8">
                  Transforming Healthcare with AI: Your Virtual Medical Expert for personalized insights and guidance.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal-dark transition-colors text-white shadow-md hover:shadow-lg">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Create New Account
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-brand-teal text-brand-teal hover:bg-brand-teal/10 hover:text-brand-teal-dark shadow-sm hover:shadow-md">
                      <LogIn className="h-5 w-5 mr-2" />
                      Existing User Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0 flex justify-center md:w-1/3 animate-pulse-subtle">
                <Logo size="xl" textColor="text-brand-teal" wrapperClassName="p-3 bg-white/60 rounded-full shadow-2xl"/>
              </div>
            </div>
          </div>
          
          {/* Services Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-3">Our Services</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-brand-teal to-brand-blue-sky mx-auto mb-8 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* ... service cards ... */}
              {[
                { icon: Brain, title: "AI Diagnosis", text: "AI analysis of your symptoms to provide preliminary insights about potential health conditions.", borderColor: "border-blue-500", iconBg: "bg-blue-100/70", iconColor: "text-blue-600" },
                { icon: Activity, title: "Treatment Plans", text: "Personalized treatment suggestions based on your symptoms and medical profile.", borderColor: "border-teal-500", iconBg: "bg-teal-100/70", iconColor: "text-teal-600" },
                { icon: FileText, title: "Health Records", text: "Secure storage of your medical data to track patterns and provide better recommendations.", borderColor: "border-sky-500", iconBg: "bg-sky-100/70", iconColor: "text-sky-600" },
              ].map(service => (
                <div key={service.title} className={`glass-panel p-6 rounded-lg border-t-4 ${service.borderColor} hover-lift text-left`}>
                  <div className="flex justify-start mb-4"> {/* Changed to justify-start */}
                    <div className={`p-3 ${service.iconBg} rounded-lg shadow-sm`}>
                      <service.icon className={`h-7 w-7 ${service.iconColor}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-brand-navy">{service.title}</h3>
                  <p className="text-brand-navy/70 text-sm leading-relaxed">
                    {service.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Powered By Section */}
          <div className="max-w-5xl mx-auto section-background p-8 md:p-10 rounded-xl">
            <h2 className="text-2xl font-bold text-brand-navy mb-2">Powered By Advanced AI</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-teal to-purple-400 mx-auto mb-8 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* ... powered by cards ... */}
              {[
                { icon: Brain, title: "Clinical BERT", text: "Our specialized NLP model processes medical terminology to understand complex symptoms.", iconColor: "text-blue-600", cardBg: "from-blue-50 via-sky-50 to-blue-100/50" },
                { icon: BarChart2, title: "XGBoost", text: "Our decision-tree algorithm analyzes health data to identify patterns and predict optimal treatments.", iconColor: "text-teal-600", cardBg: "from-teal-50 via-green-50 to-teal-100/50" },
                { icon: Shield, title: "SHAP", text: "Our explainable AI framework shows how different factors influence our recommendations with transparency.", iconColor: "text-purple-600", cardBg: "from-purple-50 via-indigo-50 to-purple-100/50" },
              ].map(tech => (
                 <div key={tech.title} className="flex flex-col items-center p-4 hover-lift rounded-lg transition-all">
                    <div className={`w-full h-28 mb-4 bg-gradient-to-br ${tech.cardBg} rounded-lg flex items-center justify-center shadow-inner border border-white/50`}>
                      <tech.icon className={`h-12 w-12 ${tech.iconColor} opacity-80`} />
                    </div>
                    <h3 className="text-lg font-medium text-brand-navy">{tech.title}</h3>
                    <p className="text-xs text-center text-brand-navy/70 mt-2 px-2 leading-relaxed">
                      {tech.text}
                    </p>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

