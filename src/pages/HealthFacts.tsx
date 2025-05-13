
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Heart, Brain, Activity, Apple, Droplet, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FactProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const healthFacts: FactProps[] = [
  {
    title: "Hydration Enhances Brain Function",
    description: "Even mild dehydration—as little as 2% fluid loss—can affect your mood, energy level, and cognitive function. Research shows that staying properly hydrated improves brain performance by up to 30%, enhancing concentration, alertness, and short-term memory.",
    icon: Brain,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Blood Circulates Your Body in 60 Seconds",
    description: "Your heart pumps approximately 2,000 gallons of blood through your circulatory system each day. A single drop of blood takes only about 60 seconds to make the entire round trip through your body—from heart to body tissues and back again.",
    icon: Heart,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Lungs Contain Nearly 1,500 Miles of Airways",
    description: "If all the airways in your lungs were laid end to end, they would extend for about 1,500 miles—roughly the distance from New York to Denver. These airways contain tiny air sacs called alveoli, and you have about 600 million of them, providing an enormous surface area for gas exchange.",
    icon: Droplet, // Replacing Lungs with Droplet icon
    color: "bg-teal-100 text-teal-600"
  },
  {
    title: "Exercise Creates New Brain Cells",
    description: "Physical activity doesn't just build muscles—it actually promotes neurogenesis (the formation of new brain cells). Regular aerobic exercise increases the size of the hippocampus, the brain area involved in verbal memory and learning, by 1-2% annually, countering age-related brain shrinkage.",
    icon: Activity,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Gut Microbiome Weighs Around 4 Pounds",
    description: "The collection of bacteria in your digestive tract weighs approximately 4 pounds—about the same weight as your brain. This microbiome contains trillions of bacteria representing over 1,000 different species, and plays a crucial role in everything from digestion to immune function and even mental health.",
    icon: Apple,
    color: "bg-green-100 text-green-600"
  }
];

const preventionTips: FactProps[] = [
  {
    title: "Stay Hydrated Throughout the Day",
    description: "Drink at least 8-10 glasses of water daily. Set reminders if needed and carry a reusable water bottle. Proper hydration supports immune function, cognitive performance, and helps remove toxins from the body.",
    icon: Droplet,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Get Regular Physical Activity",
    description: "Aim for at least 150 minutes of moderate-intensity exercise per week. This reduces your risk of heart disease by up to 30%, improves mental health, and helps maintain healthy weight and blood pressure levels.",
    icon: Activity,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Prioritize Quality Sleep",
    description: "Adults should aim for 7-9 hours of quality sleep nightly. Establish a regular sleep schedule, create a restful environment, and limit screen time before bed. Good sleep significantly reduces chronic disease risk and improves cognitive function.",
    icon: Brain,
    color: "bg-teal-100 text-teal-600"
  },
  {
    title: "Practice Stress Management",
    description: "Incorporate stress-reduction techniques like mindfulness meditation, deep breathing, or yoga into your daily routine. Chronic stress can weaken your immune system and increase risk for numerous health conditions.",
    icon: Heart,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Maintain Regular Health Screenings",
    description: "Schedule preventive health checkups based on your age, gender, and risk factors. Early detection through regular screenings can identify potential health issues before they become serious problems.",
    icon: ShieldCheck,
    color: "bg-green-100 text-green-600"
  }
];

const HealthFacts: React.FC = () => {
  const [currentFact, setCurrentFact] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  const nextFact = () => {
    setCurrentFact((prev) => (prev < healthFacts.length - 1 ? prev + 1 : 0));
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev < preventionTips.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen flex flex-col page-background">
      <Navbar />
      
      <main className="flex-grow px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Health Knowledge Center</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover important health facts and prevention tips to help you make informed decisions about your wellbeing
            </p>
          </div>
          
          <Tabs defaultValue="facts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="facts">Health Facts</TabsTrigger>
              <TabsTrigger value="prevention">Prevention Tips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="facts" className="w-full">
              <div key={currentFact} className="animate-fade-in">
                <Card className="glass-panel">
                  <CardContent className="pt-6 pb-4">
                    <div className="flex flex-col items-center text-center">
                      <div className={`rounded-full p-4 ${healthFacts[currentFact].color} mb-6`}>
                        {React.createElement(healthFacts[currentFact].icon, { className: "h-8 w-8" })}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-4">{healthFacts[currentFact].title}</h3>
                      <p className="text-gray-600 mb-8">{healthFacts[currentFact].description}</p>
                      
                      <Button onClick={nextFact} className="bg-teal-600 hover:bg-teal-700">
                        Next Fact <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="text-center text-sm text-gray-500 mt-4">
                  Fact {currentFact + 1} of {healthFacts.length}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="prevention" className="w-full">
              <div key={currentTip} className="animate-fade-in">
                <Card className="glass-panel">
                  <CardContent className="pt-6 pb-4">
                    <div className="flex flex-col items-center text-center">
                      <div className={`rounded-full p-4 ${preventionTips[currentTip].color} mb-6`}>
                        {React.createElement(preventionTips[currentTip].icon, { className: "h-8 w-8" })}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-4">{preventionTips[currentTip].title}</h3>
                      <p className="text-gray-600 mb-8">{preventionTips[currentTip].description}</p>
                      
                      <Button onClick={nextTip} className="bg-teal-600 hover:bg-teal-700">
                        Next Tip <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="text-center text-sm text-gray-500 mt-4">
                  Tip {currentTip + 1} of {preventionTips.length}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="space-y-6">
              {healthFacts.map((fact, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 ${fact.color} flex-shrink-0`}>
                        {React.createElement(fact.icon, { className: "h-6 w-6" })}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">{fact.title}</h3>
                        <p className="text-gray-600 text-sm">{fact.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthFacts;
