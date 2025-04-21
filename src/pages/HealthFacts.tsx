
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Activity, HeartPulse, Droplet, BedIcon, UtensilsCrossed, BarChart2 } from 'lucide-react';

// Health facts data
const healthFacts = [
  {
    id: 1,
    title: "Dehydration and Cognitive Function",
    content: "Even mild dehydration (1-2% of body weight) can impair cognitive performance, affecting attention, memory, and mood. Research shows that staying properly hydrated can improve brain function by up to 30%.",
    icon: <Droplet className="h-10 w-10 text-blue-500" />,
    color: "blue"
  },
  {
    id: 2,
    title: "Sleep and Immune System",
    content: "Getting less than 7 hours of sleep per night can make you 3 times more likely to catch a cold. During sleep, your immune system releases proteins called cytokines that help fight infection and inflammation.",
    icon: <BedIcon className="h-10 w-10 text-indigo-500" />,
    color: "indigo"
  },
  {
    id: 3,
    title: "Blood Pressure Management",
    content: "Reducing sodium intake to less than 2,300mg per day can lower blood pressure by 2-8 mm Hg. The DASH diet (rich in fruits, vegetables, and low-fat dairy) can reduce systolic blood pressure by 8-14 mm Hg.",
    icon: <HeartPulse className="h-10 w-10 text-red-500" />,
    color: "red"
  },
  {
    id: 4,
    title: "Sugar Consumption Impact",
    content: "The average American consumes about 17 teaspoons of added sugar daily, while recommendations suggest no more than 6 teaspoons for women and 9 for men. Excess sugar consumption is linked to obesity, type 2 diabetes, and heart disease.",
    icon: <UtensilsCrossed className="h-10 w-10 text-orange-500" />,
    color: "orange"
  },
  {
    id: 5,
    title: "Exercise Benefits Beyond Weight",
    content: "Just 150 minutes of moderate exercise weekly reduces all-cause mortality by 31%. Regular physical activity boosts brain health, improves sleep quality, and reduces anxiety regardless of body weight changes.",
    icon: <Activity className="h-10 w-10 text-green-500" />,
    color: "green"
  }
];

// Prevention tips
const preventionTips = [
  {
    id: 1,
    title: "Stay Hydrated",
    content: "Drink at least 8-10 glasses of water daily. Set reminders, carry a reusable water bottle, and eat water-rich fruits and vegetables like cucumber and watermelon.",
    icon: <Droplet className="h-10 w-10 text-blue-500" />,
    color: "blue"
  },
  {
    id: 2,
    title: "Prioritize Sleep",
    content: "Aim for 7-8 hours of quality sleep. Establish a regular sleep schedule, create a restful environment, and avoid screens at least 1 hour before bedtime.",
    icon: <BedIcon className="h-10 w-10 text-indigo-500" />,
    color: "indigo"
  },
  {
    id: 3, 
    title: "Monitor Blood Pressure",
    content: "Check your blood pressure regularly. Maintain a healthy weight, reduce sodium intake, limit alcohol, manage stress, and exercise regularly to keep your numbers in check.",
    icon: <HeartPulse className="h-10 w-10 text-red-500" />,
    color: "red"
  },
  {
    id: 4,
    title: "Reduce Processed Sugar",
    content: "Limit added sugar to less than 25g daily. Read food labels, choose whole foods over processed ones, and satisfy sweet cravings with fruits instead of candies or desserts.",
    icon: <UtensilsCrossed className="h-10 w-10 text-orange-500" />,
    color: "orange"
  },
  {
    id: 5,
    title: "Regular Physical Activity",
    content: "Get at least 150 minutes of moderate exercise weekly. Find activities you enjoy, break exercise into short sessions, and incorporate movement throughout your day.",
    icon: <Activity className="h-10 w-10 text-green-500" />,
    color: "green"
  }
];

const HealthFacts = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("facts");
  
  const handleNextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % healthFacts.length);
  };
  
  const currentFact = healthFacts[currentFactIndex];
  const relatedPrevention = preventionTips.find(tip => tip.id === currentFact.id);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">Health Knowledge Center</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-blue-500 mx-auto mb-8"></div>
        
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Discover important health facts and prevention tips to help you make informed decisions about your wellbeing.
        </p>
        
        <Tabs defaultValue="facts" className="max-w-4xl mx-auto" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="facts" className="text-base">Health Facts</TabsTrigger>
              <TabsTrigger value="prevention" className="text-base">Prevention Tips</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="facts" className="animate-fade-in">
            <Card className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className={`rounded-full p-6 bg-${currentFact.color}-100 hidden md:flex`}>
                    {currentFact.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`rounded-full p-4 bg-${currentFact.color}-100 mb-4 w-fit mx-auto md:hidden`}>
                      {currentFact.icon}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">{currentFact.title}</h2>
                    <p className="text-gray-600 text-lg mb-6">{currentFact.content}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Fact {currentFactIndex + 1} of {healthFacts.length}</span>
                      
                      <Button 
                        onClick={handleNextFact}
                        className={`bg-${currentFact.color}-500 hover:bg-${currentFact.color}-600`}
                      >
                        Next Fact
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prevention" className="animate-fade-in">
            {relatedPrevention && (
              <Card className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className={`rounded-full p-6 bg-${relatedPrevention.color}-100 hidden md:flex`}>
                      {relatedPrevention.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className={`rounded-full p-4 bg-${relatedPrevention.color}-100 mb-4 w-fit mx-auto md:hidden`}>
                        {relatedPrevention.icon}
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-3 text-gray-800">{relatedPrevention.title}</h2>
                      <p className="text-gray-600 text-lg mb-6">{relatedPrevention.content}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Related to: {currentFact.title}</span>
                        
                        <Button 
                          onClick={handleNextFact}
                          className={`bg-${relatedPrevention.color}-500 hover:bg-${relatedPrevention.color}-600`}
                        >
                          Next Tip
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-red-50 rounded-xl p-8 shadow-sm border border-blue-100">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Health Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center hover-lift">
              <div className="rounded-full bg-blue-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">80%</h3>
              <p className="text-gray-600 text-sm">of chronic diseases are preventable with lifestyle changes</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center hover-lift">
              <div className="rounded-full bg-red-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HeartPulse className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">150 min</h3>
              <p className="text-gray-600 text-sm">of weekly exercise recommended for optimal health</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center hover-lift">
              <div className="rounded-full bg-green-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Droplet className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2 liters</h3>
              <p className="text-gray-600 text-sm">of water daily supports optimal cognitive function</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HealthFacts;
